// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer, shell } = require('electron')
const { electronAPI } = require('@electron-toolkit/preload')

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInIsolatedWorld

    contextBridge.exposeInMainWorld('electronAPI', {
      setItemUrl: (itemUrl) => ipcRenderer.invoke('item:set-url', itemUrl),
      showAddItemModal: (cb) => ipcRenderer.on('menu:show-add-item', cb),
      readSelectedItem: (cb) => ipcRenderer.on('menu:read-reader-item', cb),
      deleteSelectedItem: (cb) => ipcRenderer.on('menu:delete-item', cb),
      searchItems: (cb) => ipcRenderer.on('menu:search', cb),
      openSelectedInBrowser: (cb) => {
        ipcRenderer.on('menu:open-in-browser', () => {
          const url = cb()
          shell.openExternal(url)
        })
      },
      contextMenuHandler: () => ipcRenderer.send('show-context-menu')
    })
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
