import "dotenv/config";
import Mod from "./core/mod";
import path from "path";
import settings from "electron-settings";
import { BrowserWindow, app, dialog, ipcMain } from "electron";
import { access } from "fs/promises";
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

    const modsPath = await settings.get("modsPath");
    if (!modsPath) {
      const defaultPath = "\\Documents\\Paradox Interactive\\Crusader Kings III\\mod";
      const userFolder = process.env.USERPROFILE as string;
      const defaultModsPath = userFolder + defaultPath;
      await settings.set("modsPath", defaultModsPath);
    }

    const language = await settings.get("language");
    if (!language) {
      await settings.set("language", app.getLocale().substring(0, 2));
    }

    for (const m of mods) {
      const mod = new Mod(m.id, m.name, m.git);
      AllMods.push(mod);
      await mod.init();
    }
    return await modList();
  } catch (error) {
    dialog.showErrorBox("Error", error.message);
    return [];
  }
});

ipcMain.handle("mods:path:get", async () => {
  try {
    return await settings.get("modsPath");
  } catch {
    return "";
  }
});

ipcMain.handle("mods:path:set", async (e, newPath: string) => {
  try {
    await access(newPath);
    await settings.set("modsPath", newPath);
    for (const mod of AllMods) {
      await mod.init();
    }
    return true;
  } catch (err) {
    return false;
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
      if (mod.repo) {
        await mod.update();
      } else {
        await mod.download();
      }
    }
    return await modList();
  } catch {
    return [];
  }
});

ipcMain.handle("app:language:get", async () => {
  try {
    return await settings.get("language");
  } catch {
    return "";
  }
});

ipcMain.handle("app:language:set", async (e, lang: string) => {
  try {
    await settings.set("language", lang);
    return true;
  } catch (err) {
    return false;
  }
});
