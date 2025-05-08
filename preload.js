// preload.js
const { contextBridge, ipcRenderer } = require('electron');

let windowId = null; // Will be set by main process

contextBridge.exposeInMainWorld('electronAPI', {
    sendMessage: (text) => ipcRenderer.send('send-message', text),
    onReceiveMessage: (callback) => ipcRenderer.on('receive-message', (_event, messageData) => callback(messageData)),
    setWindowId: (id) => { // Expose a function to set the ID from main
        windowId = id;
    },
    getWindowId: () => windowId // Expose a function to get the ID
});

// Receive the window ID from the main process
ipcRenderer.on('set-window-id', (_event, id) => {
    if (window.electronAPI && typeof window.electronAPI.setWindowId === 'function') {
        window.electronAPI.setWindowId(id);
    }
});