/// <reference types="vite/client" />

declare module 'vue3-google-oauth2' {
  import type { Plugin } from 'vue'

  interface GAuthOptions {
    clientId: string
    scope?: string
    prompt?: string
  }

  const plugin: {
    install(app: import('vue').App, options: GAuthOptions): void
  }

  export default plugin
}
