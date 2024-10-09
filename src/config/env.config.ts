
  
  // Type-safe way to access environment variables
  export function getEnvVar(key: keyof ImportMetaEnv): string {
    const envVar = import.meta.env.API_BASE_URL
    if (envVar === undefined) {
      console.log(`Environment variable ${key} is not defined`)
    }
    return envVar
  }