const { app, BrowserWindow } = require("electron");

/** @type {BrowserWindow}  offscreenWindow  */
let offscreenWindow;

app.disableHardwareAcceleration();

/**
 * Get's a page metadata given url
 * @param {string} url
 * @param {function} callback
 */
module.exports = async (url, callback) => {
  try {
    offscreenWindow = new BrowserWindow({
      width: 1000,
      height: 1000,
      show: false,
      webPreferences: {
        offscreen: true,
      },
    });

    await offscreenWindow.loadURL(url);

    offscreenWindow.webContents.on("did-finish-load", () => {
      let title = offscreenWindow.getTitle();

      offscreenWindow.webContents.capturePage().then((image) => {
        let screenshot = image.toDataURL();

        /// Resolve success
        callback({ data: { title, screenshot, url }, status: "success" });

        offscreenWindow.close();
        offscreenWindow = null;
      });
    });
  } catch (error) {
    /// Resolve with error
    callback({
      error,
      status: "error",
    });
    offscreenWindow.close();
    offscreenWindow = null;
  }
};
