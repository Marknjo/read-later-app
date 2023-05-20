const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  setItemUrl: (itemUrl) => ipcRenderer.invoke("item:set-url", itemUrl),
});
