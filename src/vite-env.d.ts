/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly API_BASE_URL: string
    
    // Add more env variables here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }