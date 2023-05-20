const { contextBridge, ipcRenderer, shell } = require("electron");

contextBridge.exposeInIsolatedWorld;

contextBridge.exposeInMainWorld("electronAPI", {
  setItemUrl: (itemUrl) => ipcRenderer.invoke("item:set-url", itemUrl),
  showAddItemModal: (cb) => ipcRenderer.on("menu:show-add-item", cb),
  readSelectedItem: (cb) => ipcRenderer.on("menu:read-reader-item", cb),
  deleteSelectedItem: (cb) => ipcRenderer.on("menu:delete-item", cb),
  searchItems: (cb) => ipcRenderer.on("menu:search", cb),
  openSelectedInBrowser: (cb) => {
    ipcRenderer.on("menu:open-in-browser", () => {
      const url = cb();
      shell.openExternal(url);
    });
  },
  contextMenuHandler: () => ipcRenderer.send("show-context-menu"),
});
