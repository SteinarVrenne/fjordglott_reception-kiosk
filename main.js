"use strict";

// Import parts of electron to use
const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");
const url = require("url");

// Require our db handler to be processed by main process
require("./src/helpers/dbHandler");

// Require our worker process
// @TODO find a better way to get a worker
// const worker = require("./src/helper/main.js")

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Keep a reference for dev mode
let dev = false;

// Keep a reference for if the program should kill itself based on secret input
// @TODO maybe move keybinding to .secret?
let killSwitch = false;

// Broken:
// if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
//   dev = true
// }

if (
  process.env.NODE_ENV !== undefined &&
  process.env.NODE_ENV === "development"
) {
  dev = true;
}

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === "win32") {
  app.commandLine.appendSwitch("high-dpi-support", "true");
  app.commandLine.appendSwitch("force-device-scale-factor", "1");
}

function createWindow() {
  let windowInformation = {
    width: 1024,
    height: 768,
    // minWidth: 1024,
    // minHeight:768,

    show: false,
    fullscreen: false,
    autoHideMenuBar: false,
    frame: true,
    kiosk: false,
    resizable: true,
    movable: true,
    fullscreenable: true,
    alwaysOnTop: false,
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
    },
  };

  if (!dev) {
    windowInformation.fullscreen = true;
    windowInformation.autoHideMenuBar = true;
    windowInformation.frame = false;
    windowInformation.kiosk = true;
    windowInformation.resizable = false;
    windowInformation.movable = false;
    windowInformation.fullscreenable = true;
    windowInformation.alwaysOnTop = true;

    windowInformation.webPreferences.devTools = false;
  }

  // Create the browser window.
  mainWindow = new BrowserWindow(windowInformation);

  // and load the index.html of the app.
  let indexPath;

  if (dev && process.argv.indexOf("--noDevServer") === -1) {
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:8080",
      pathname: "index.html",
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: "file:",
      pathname: path.join(__dirname, "dist", "index.html"),
      slashes: true,
    });
  }
  console.log(indexPath);

  mainWindow.loadURL(indexPath);

  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    // Open the DevTools automatically if developing
    if (dev) {
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
      } = require("electron-devtools-installer");

      installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
        console.log("Error loading React DevTools: ", err)
      );
      mainWindow.webContents.openDevTools();
    }
  });

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // Production limiters
  //  When in prod env we want to limit the amount the user can interact with the rest of the machine.
  //  We disable closure of the app, by using the workaround below, reference: https://github.com/electron/electron/issues/9966

  mainWindow.on("close", (e) => {
    // Prevent closure off the application
    if (!killSwitch) {
      e.preventDefault();
    }
  });

  // Since alt+f4 does not work we need a emergency kill
  // @TODO move shortcut to .secret and import
  globalShortcut.register("Alt+S+T+O+P", () => {
    killSwitch = true;
    app.quit();
  });

  // Global keycommand to enter admin panel login
  // @TODO move shortcut to .secret and import
  globalShortcut.register("Alt+A+D", () => {
    mainWindow.webContents.send(
      "/adminRouting",
      "Secret command for admin login input"
    );
  });

  mainWindow.setFullScreenable(false);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
