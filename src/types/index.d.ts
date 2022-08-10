export { };

declare global {
  interface Window {
    electronAPI: {
      on: (channel: string, fn: (...args: unknown) => void) => void,
      kill: (channel: string) => void,
      init: () => Promise<Mod[]>,
      check: () => Promise<Mod[]>,
      update: () => Promise<Mod[]>,
    },
  }
}
