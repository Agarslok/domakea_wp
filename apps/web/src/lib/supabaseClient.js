import { createClient } from '@supabase/supabase-js';
import {
  getSupabasePublicKey,
  getSupabaseUrl,
  isSupabaseConfigured,
  supabaseSetupHint,
} from '@/lib/supabaseEnv';

export { isSupabaseConfigured, supabaseSetupHint };

/** @type {import('@supabase/supabase-js').SupabaseClient | null} */
let client = null;

export function getSupabase() {
  if (!isSupabaseConfigured()) {
    if (import.meta.env.DEV) {
      const hint = supabaseSetupHint();
      if (hint) console.info('[DOMAKEA Supabase]', hint);
    }
    return null;
  }
  if (!client) {
    client = createClient(getSupabaseUrl(), getSupabasePublicKey(), {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
  }
  return client;
}

/**
 * Comprueba que la API responde (sin leer filas: las tablas de leads solo permiten INSERT).
 * @returns {Promise<{ ok: boolean, message: string }>}
 */
export async function verifySupabaseConnection() {
  if (!isSupabaseConfigured()) {
    return { ok: false, message: supabaseSetupHint() || 'Supabase no configurado.' };
  }

  const url = getSupabaseUrl();
  const key = getSupabasePublicKey();

  try {
    const res = await fetch(`${url}/rest/v1/`, {
      method: 'HEAD',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    });

    if (res.ok || res.status === 404 || res.status === 401) {
      // API reachable; 401 on root is fine — we only need network + project URL
      return { ok: true, message: 'Conexión con Supabase correcta.' };
    }
    return { ok: false, message: `Supabase respondió HTTP ${res.status}. Revisa URL y clave.` };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : 'No se pudo contactar Supabase.',
    };
  }
}