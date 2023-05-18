const { app, BrowserWindow } = require("electron");

/** @type {BrowserWindow}  offscreenWindow  */
let offscreenWindow;

app.disableHardwareAcceleration();

/**
 *
 * @param {BrowserWindow} win
 */
const captureLoadedPageImage = (win, cb, url) => {
  const title = win.getTitle();

  win.webContents.capturePage().then((image) => {
    let screenshot = image.toDataURL();

    /// Resolve success
    cb({ data: { title, screenshot, url }, status: "success" });

    win.close();
    win = null;
  });
};

/**
 * Get's a page metadata given url
 * @param {string} url
 * @param {function} callback
 */
module.exports = async (url, callback) => {
  try {
    offscreenWindow = new BrowserWindow({
      width: 1500,
      height: 1500,
      show: false,
      webPreferences: {
        offscreen: true,
      },
    });

    await offscreenWindow.loadURL(url);

    let isCaptured = false;

    /// capture the page when window has finished loading
    offscreenWindow.webContents.on("did-finish-load", () => {
      isCaptured = true;
      captureLoadedPageImage(offscreenWindow, callback, url);
    });

    /// wait 1.5 secs to capture a page if did-finish events is not called
    setImmediate(() => {
      setTimeout(() => {
        isCaptured || captureLoadedPageImage(offscreenWindow, callback, url);
      }, 1500);
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
