export { };

declare global {
  interface Window {
    electronAPI: {
      on: (channel: string, fn: (...args: unknown) => void) => void,
      kill: (channel: string) => void,
      initApp: () => void,
      loadMods: () => Promise<Mod[]>,
    },
  }
}
