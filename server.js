const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'todos.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function loadTodos() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
  } catch {}
  return { todos: [], nextId: 1 };
}

function saveTodos(store) {
  store.lastSaved = new Date().toISOString();
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8');
}

app.get('/api/todos', (_req, res) => {
  res.json(loadTodos().todos);
});

app.post('/api/todos', (req, res) => {
  const { task, dueDate, priority } = req.body;
  if (!task || !dueDate) return res.status(400).json({ error: 'task and dueDate are required' });
  const store = loadTodos();
  const todo = { 
    id: store.nextId++, 
    task: task.trim(), 
    dueDate: dueDate.trim(),
    priority: priority || 'normal',
    completed: false,
    createdAt: new Date().toLocaleString('ko-KR')
  };
  store.todos.unshift(todo);
  saveTodos(store);
  res.status(201).json(todo);
});

app.patch('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const store = loadTodos();
  const todo = store.todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'not found' });
  todo.completed = !todo.completed;
  saveTodos(store);
  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const store = loadTodos();
  const before = store.todos.length;
  store.todos = store.todos.filter(t => t.id !== id);
  if (store.todos.length === before) return res.status(404).json({ error: 'not found' });
  saveTodos(store);
  res.json({ ok: true });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ TO DO 서버 실행: http://localhost:${PORT}`);
});
