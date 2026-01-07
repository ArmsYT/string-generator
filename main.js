const path = require("path");
const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 640,
    height: 630,

    // ✅ pas redimensionnable
    resizable: false,

    // ✅ pas plein écran
    fullscreen: false,
    fullscreenable: false,

    // (optionnel) pas maximisable
    maximizable: false,

    // (optionnel) si tu veux vraiment bloquer aussi le bouton "agrandir"
    // minimizable: true, // laisse si tu veux
    // closable: true,

    icon: path.join(__dirname, "build", "icon.ico"),

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.removeMenu();
  win.loadFile(path.join(__dirname, "renderer", "index.html"));

  // ✅ sécurité: si une API essaie de forcer le plein écran
  win.on("enter-full-screen", () => win.setFullScreen(false));
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
