// electron-chat-app/main.js
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 500,
        height: 750,
        webPreferences: {
            // preload: path.join(__dirname, 'preload.js'), // Optional now, can remove if not used
            contextIsolation: true, // Good practice
            nodeIntegration: false, // Crucial for security if loading external content or using webviews
                                    // For Socket.IO client in renderer, this is fine.
        }
    });

    mainWindow.loadFile('index.html');
    // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    const menu = Menu.buildFromTemplate([
        {
            label: app.name,
            submenu: [
                { role: 'quit' }
            ]
        },
        {
            label: 'File',
            submenu: [
                {
                    label: 'New Window',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => createWindow()
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' }
            ]
        }
    ]);
    Menu.setApplicationMenu(menu);
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});