/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_IS_BETA?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
