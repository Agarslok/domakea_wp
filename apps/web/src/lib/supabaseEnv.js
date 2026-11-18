/**
 * Única fuente de verdad para variables VITE_* de Supabase en el front.
 * Solo claves públicas (anon / publishable). Nunca uses service_role en el cliente.
 */

const PLACEHOLDERS = ['TU_PROYECTO', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'];

function clean(value) {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (PLACEHOLDERS.some((p) => trimmed.includes(p))) return '';
  return trimmed;
}

export function getSupabaseUrl() {
  return clean(import.meta.env.VITE_SUPABASE_URL);
}

export function getSupabasePublicKey() {
  return clean(
    import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  );
}

/** @returns {'ready' | 'missing_url' | 'missing_key' | 'missing_both'} */
export function getSupabaseEnvStatus() {
  const url = getSupabaseUrl();
  const key = getSupabasePublicKey();
  if (url && key) return 'ready';
  if (!url && !key) return 'missing_both';
  if (!url) return 'missing_url';
  return 'missing_key';
}

export function isSupabaseConfigured() {
  return getSupabaseEnvStatus() === 'ready';
}

export function supabaseSetupHint() {
  const status = getSupabaseEnvStatus();
  switch (status) {
    case 'ready':
      return null;
    case 'missing_url':
      return 'Falta VITE_SUPABASE_URL en apps/web/.env (Supabase → Settings → API → Project URL).';
    case 'missing_key':
      return 'Falta VITE_SUPABASE_ANON_KEY o VITE_SUPABASE_PUBLISHABLE_KEY en apps/web/.env.';
    default:
      return 'Crea apps/web/.env desde .env.example y pega URL + clave pública de Supabase.';
  }
}