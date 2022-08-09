import Mod from "./core/mod";
import path from "path";
import { BrowserWindow, app, ipcMain } from "electron";
import { getCollection } from "./core/firebase";

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    // transparent: true,
    // frame: false,
    maximizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // win.webContents.openDevTools();

  win.removeMenu();

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("app:init", async (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win) return;
  try {
    const mods = await getCollection("mods");

    const modz = [];

    for (const m of mods) {
      const mod = new Mod(m.id, m.name, m.git);
      await mod.init();
      modz.push(await mod.toJSON());
    }
    win.webContents.send("mods:load", modz);
  } catch (err) {
    console.error(err);
  }
});
