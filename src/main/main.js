const { join } = require("path");
const { readFile } = require("fs/promises");
const { BrowserWindow, app, ipcMain } = require("electron");
const windowStateKeeper = require("electron-window-state");
const readPageMeta = require("./get-page-meta");

/// RESUME on PAGE: 1305

let win;

/**
 *
 * @param {Electron.IpcMainInvokeEvent} event
 * @param {any} args
 * @returns
 */
function setItemHandler(_event, url) {
  return new Promise((resolve, reject) => {
    readPageMeta(url, (response) => {
      if (response.status === "success") {
        resolve(response.data);
      } else {
        reject(response.error);
      }
    });
  });
}

function prepReader(parentWin) {
  parentWin.webContents.setWindowOpenHandler(({ url }) => {
    // console.log({ url: url === "about:blank", url });
    return {
      action: "allow",
      overrideBrowserWindowOptions: {
        maxWidth: 2000,
        maxHeight: 2000,
        width: 1200,
        height: 800,
        center: true,
        frame: true,
        fullscreenable: false,
        closable: true,
        backgroundColor: "#DEDEDE",
        webPreferences: {
          preload: join(__dirname, "preload.js"),
        },
      },
    };
  });
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
  ///
  prepReader(win);

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
