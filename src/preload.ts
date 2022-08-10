import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  on: (channel: string, fn: (...args: unknown[]) => void) => {
    ipcRenderer.on(channel, (e, ...args) => fn(...args));
  },
  kill: (channel: string) => {
    ipcRenderer.removeAllListeners(channel);
  },
  init: () => ipcRenderer.invoke("app:init"),
  check: () => ipcRenderer.invoke("mods:fetch"),
  update: () => ipcRenderer.invoke("mods:update"),
  getModsPath: () => ipcRenderer.invoke("mods:path:get"),
  setModsPath: (path: string) => ipcRenderer.invoke("mods:path:set", path),
  getLanguage: () => ipcRenderer.invoke("app:language:get"),
  setLanguage: (lang: string) => ipcRenderer.invoke("app:language:set", lang),
});
