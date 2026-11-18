/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Project URL: Supabase → Settings → API → Project URL */
  readonly VITE_SUPABASE_URL: string;
  /**
   * Clave pública (anon legacy o publishable).
   * Supabase → Settings → API → Project API keys → anon / publishable
   */
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}