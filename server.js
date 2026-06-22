const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'todos.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function loadTodos() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
      // 이전 형식 호환
      if (data.users) return data;
      // 새로운 형식으로 변환
      return { users: { 'public': data.todos || [] } };
    }
  } catch {}
  return { users: {} };
}

function saveTodos(store) {
  store.lastSaved = new Date().toISOString();
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8');
}

function getUserKey(user, password) {
  if (password) {
    return `${user}:${password}`;
  }
  return 'public';
}

app.get('/api/todos', (req, res) => {
  const { user, password } = req.query;
  const store = loadTodos();
  const key = getUserKey(user, password);
  const todos = store.users[key] || [];
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { task, dueDate, dueTime, priority, user, password } = req.body;
  if (!task || !dueDate) return res.status(400).json({ error: 'required fields missing' });
  
  const store = loadTodos();
  const key = getUserKey(user, password);
  
  if (!store.users[key]) {
    store.users[key] = [];
  }

  const nextId = Math.max(0, ...store.users[key].map(t => t.id || 0)) + 1;
  
  const todo = {
    id: nextId,
    task: task.trim(),
    dueDate: dueDate.trim(),
    dueTime: dueTime || '09:00',
    priority: priority || 'normal',
    completed: false,
    createdAt: new Date().toLocaleString('ko-KR')
  };
  
  store.users[key].unshift(todo);
  saveTodos(store);
  res.status(201).json(todo);
});

app.patch('/api/todos/:id', (req, res) => {
  const { user, password } = req.query;
  const id = parseInt(req.params.id);
  const store = loadTodos();
  const key = getUserKey(user, password);
  
  if (!store.users[key]) return res.status(404).json({ error: 'not found' });
  
  const todo = store.users[key].find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'not found' });
  
  todo.completed = !todo.completed;
  saveTodos(store);
  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  const { user, password } = req.query;
  const id = parseInt(req.params.id);
  const store = loadTodos();
  const key = getUserKey(user, password);
  
  if (!store.users[key]) return res.status(404).json({ error: 'not found' });
  
  const before = store.users[key].length;
  store.users[key] = store.users[key].filter(t => t.id !== id);
  
  if (store.users[key].length === before) return res.status(404).json({ error: 'not found' });
  
  saveTodos(store);
  res.json({ ok: true });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✅ TO DO 앱 실행 중!`);
  console.log(`🌐 접속: http://localhost:${PORT}`);
  console.log(`💾 데이터: ${DATA_FILE}\n`);
});
