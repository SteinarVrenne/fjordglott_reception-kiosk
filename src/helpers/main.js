const { app, BrowserWindow, globalShortcut } = require("electron");

let workerWindow;

function launchWindow() {
  workerWindow = new BrowserWindow({
    show: true,
    webPreferences: { nodeIntegration: true },
  });

  workerWindow.loadFile("./src/helper/helper.html")

  workerWindow.webContents.openDevTools();  
}

app.on("ready", launchWindow);
