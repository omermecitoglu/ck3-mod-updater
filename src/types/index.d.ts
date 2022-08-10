export { };

declare global {
  interface Window {
    electronAPI: {
      on: (channel: string, fn: (...args: unknown) => void) => void,
      kill: (channel: string) => void,
      initApp: () => void,
      check: () => Promise<Mod[]>,
      update: () => Promise<Mod[]>,
    },
  }
}
