const { join } = require("path");
const { BrowserWindow, app, ipcMain } = require("electron");
const windowStateKeeper = require("electron-window-state");

let win;

/**
 *
 * @param {Electron.IpcMainInvokeEvent} event
 * @param {any} args
 * @returns
 */
function setItemHandler(event, args) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(args);
    }, 2000)
  );
}

const createWindow = () => {
  let winState = windowStateKeeper({
    defaultWidth: 500,
    defaultHeight: 650,
  });

  win = new BrowserWindow({
    x: winState.x,
    y: winState.y,
    width: winState.width,
    height: winState.height,
    minHeight: 300,
    minWidth: 350,
    // maxWidth: 650,
    webPreferences: {
      nodeIntegration: false,
      devTools: true,
      preload: join(__dirname, "preload.js"),
    },
  });

  /// Get html
  win.loadFile(join(__dirname, "../", "renderer", "index.html"));

  winState.manage(win);

  win.webContents.openDevTools();

  /// on window close clear window reference
  win.on("close", () => {
    win = null;
  });
};

app.whenReady().then(() => {
  ipcMain.handle("item:set-url", setItemHandler);

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
