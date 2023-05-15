const { join } = require("path");
const { BrowserWindow, app } = require("electron");
const windowStateKeeper = require("electron-window-state");

let win;

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
    webPreferences: {
      nodeIntegration: false,
      devTools: false,
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
