export { };

declare global {
  interface Window {
    electronAPI: {
      on: (channel: string, fn: (...args: unknown) => void) => void,
      kill: (channel: string) => void,
      init: () => Promise<ModTemplate[]>,
      check: () => Promise<ModTemplate[]>,
      update: () => Promise<ModTemplate[]>,
      getModsPath: () => Promise<string>,
      setModsPath: (path: string) => Promise<boolean>,
      getLanguage: () => Promise<string>,
      setLanguage: (path: string) => Promise<boolean>,
    },
  }
}
