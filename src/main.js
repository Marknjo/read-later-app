// Modules to control application life and create native browser window
const { app, shell, BrowserWindow, ipcMain } = require('electron')
const windowStateKeeper = require('electron-window-state')
const { join } = require('path')
const { electronApp, optimizer } = require('@electron-toolkit/utils')

const readPageMeta = require('./main/get-page-meta')
const appMenu = require('./main/menu')
const { isDev } = require('./main/utils')

let win

/**
 *
 * @param {Electron.IpcMainInvokeEvent} event
 * @param {any} args
 * @returns
 */
function setItemHandler(_event, url) {
  return new Promise((resolve, reject) => {
    readPageMeta(url, (response) => {
      if (response.status === 'success') {
        resolve(response.data)
      } else {
        reject(response.error)
      }
    })
  })
}

function prepReader(parentWin) {
  parentWin.webContents.setWindowOpenHandler(() => {
    return {
      action: 'allow',
      overrideBrowserWindowOptions: {
        maxWidth: 2000,
        maxHeight: 2000,
        width: 1200,
        height: 800,
        center: true,
        frame: true,
        fullscreenable: false,
        closable: true,
        backgroundColor: '#DEDEDE',
        webPreferences: {
          preload: join(__dirname, 'preload.js'),
          sandbox: false
        }
      }
    }
  })
}

function createWindow() {
  let winState = windowStateKeeper({
    defaultWidth: 500,
    defaultHeight: 650
  })

  // Create the browser window.
  win = new BrowserWindow({
    x: winState.x,
    y: winState.y,
    width: winState.width,
    height: winState.height,
    minHeight: 300,
    minWidth: 350,
    modal: true,
    maxWidth: 550,
    maxHeight: 1000,
    ...(process.platform === 'linux'
      ? {
          icon: join(__dirname, '../resources/icon.png')
        }
      : {}),
    webPreferences: {
      nodeIntegration: false,
      sandbox: false,
      devTools: true,
      preload: join(__dirname, 'main', 'preload.js')
    }
  })

  win.on('ready-to-show', () => {
    win.show()
  })

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // and load the index.html of the app.
  win.loadFile(join(__dirname, 'index.html'))

  winState.manage(win)

  isDev && win.webContents.openDevTools()

  // create app menu
  appMenu(win.webContents)

  ///
  prepReader(win)

  /// on window close clear window reference
  win.on('close', () => {
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Ipc handler
  ipcMain.handle('item:set-url', setItemHandler)

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.