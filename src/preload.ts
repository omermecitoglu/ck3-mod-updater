import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  on: (channel: string, fn: (...args: unknown[]) => void) => {
    ipcRenderer.on(channel, (e, ...args) => fn(...args));
  },
  kill: (channel: string) => {
    ipcRenderer.removeAllListeners(channel);
  },
  initApp: () => {
    ipcRenderer.send("app:init");
  },
  loadCharacters: () => ipcRenderer.invoke("characters:load"),
});
