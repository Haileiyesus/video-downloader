// preload.js (Electron Preload Script)

const { contextBridge, ipcRenderer } = require("electron");

// Expose the folder picker function to the renderer process
contextBridge.exposeInMainWorld("electron", {
  selectFolder: () => ipcRenderer.invoke("dialog:selectFolder"),
});
