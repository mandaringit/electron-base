const { app, BrowserWindow, Tray, Menu, nativeImage } = require("electron");
const path = require("node:path");

let tray = null;

const createTray = () => {
  const icon = path.join(__dirname, "/ic_driver_charac.png");
  const trayIcon = nativeImage.createFromPath(icon);
  tray = new Tray(trayIcon.resize({ width: 16 }));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show App",
      click: () => {
        createWindow();
      },
    },
    {
      label: "Quit",
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
};
const createWindow = () => {
  if (!tray) {
    createTray();
  }

  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL("http://localhost:3000/monitor");
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
  } else {
    console.log("hide dock");
    app.dock.hide();
  }
});
