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
    resizable: false,
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

const AllMods: Mod[] = [];

async function modList() {
  const mods = [];
  for (const mod of AllMods) {
    mods.push(await mod.toJSON());
  }
  return mods;
}

ipcMain.handle("app:init", async () => {
  try {
    const mods = await getCollection("mods");
    for (const m of mods) {
      const mod = new Mod(m.id, m.name, m.git);
      AllMods.push(mod);
      await mod.init();
    }
    return await modList();
  } catch (err) {
    return [];
  }
});

ipcMain.handle("mods:fetch", async () => {
  try {
    for (const mod of AllMods) {
      await mod.check();
    }
    return await modList();
  } catch {
    return [];
  }
});

ipcMain.handle("mods:update", async () => {
  try {
    for (const mod of AllMods) {
      await mod.update();
    }
    return await modList();
  } catch {
    return [];
  }
});
