import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => ({
    usedLibs: [] as string[],
  }),
  actions: {
    setUsedLibs (usedLibs: string[]) {
      this.usedLibs = usedLibs
    },
  },
})
