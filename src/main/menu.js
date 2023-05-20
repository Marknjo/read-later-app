// Modules
const { Menu, shell, MenuItem } = require("electron");

/**
 *
 * @param {import("electron").WebContents} appWin
 */
module.exports = (appWin) => {
  // menu template
  /**
   * @type {[MenuItem]} template
   */
  let template = [
    {
      label: "Items",
      submenu: [
        {
          label: "Add New",
          accelerator: "CmdOrCtrl+O",
          click: () => {
            appWin.send("menu:show-add-item");
          },
        },
        {
          label: "Read Item",
          accelerator: "CmdOrCtrl+Enter",
          click: () => {
            appWin.send("menu:read-reader-item");
          },
        },
        {
          label: "Delete Item",
          accelerator: "CmdOrCtrl+Backspace",
          click: () => {
            appWin.send("menu:delete-item");
          },
        },
        {
          label: "Open in Browser",
          accelerator: "CmdOrCtrl+shift+Enter",
          click: () => {
            appWin.send("menu:open-in-browser");
          },
        },
        {
          label: "Search Items",
          accelerator: "CmdOrCtrl+F",
          click: () => {
            appWin.send("menu:search");
          },
        },
      ],
    },
    {
      role: "editMenu",
    },
    {
      role: "windowMenu",
    },
    {
      role: "help",
      submenu: [
        {
          label: "Learn more",
          click: () => {
            shell.openExternal("https://github.com/Marknjo/read-later-app");
          },
        },
      ],
    },
  ];

  // Create Mac app menu
  if (process.platform === "darwin") {
    template.unshift({ role: "appMenu" });
  }

  // build menu
  let menu = Menu.buildFromTemplate(template);

  // Set as main app menu
  Menu.setApplicationMenu(menu);
};
