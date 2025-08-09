/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_SITE_NAME: string
  readonly VITE_SITE_DESCRIPTION: string
  readonly VITE_SITE_URL: string
  readonly VITE_CONTACT_EMAIL: string
  readonly NODE_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
