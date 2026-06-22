const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
let tray;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 1000,
    minWidth: 600,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: true,
    },
    show: false,
  });

  const startUrl = 'http://localhost:3000';
  mainWindow.loadURL(startUrl);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

function createTray() {
  try {
    const icon = nativeImage.createFromPath(path.join(__dirname, '../assets/icon.png'));
    tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
      {
        label: '📝 열기',
        click: () => {
          if (mainWindow) {
            mainWindow.show();
          } else {
            createWindow();
          }
        },
      },
      { type: 'separator' },
      {
        label: '❌ 종료',
        click: () => {
          app.quit();
        },
      },
    ]);

    tray.setContextMenu(contextMenu);
    tray.on('click', () => {
      if (mainWindow) {
        if (mainWindow.isVisible()) {
          mainWindow.hide();
        } else {
          mainWindow.show();
        }
      }
    });
  } catch (e) {
    console.log('트레이 아이콘 로드 안됨 (괜찮음):', e.message);
  }
}

app.on('ready', () => {
  createWindow();
  createTray();
});

app.on('window-all-closed', (e) => {
  e.preventDefault(); // 트레이에 최소화
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('will-quit', () => {
  // 정리 작업
});
