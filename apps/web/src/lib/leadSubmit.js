import { getSupabase, isSupabaseConfigured } from '@/lib/supabaseClient';

const PENDING_KEY = 'domakea_pending_leads';

function readPending() {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writePending(items) {
  localStorage.setItem(PENDING_KEY, JSON.stringify(items));
}

/**
 * Guarda el envío en Supabase o en cola local hasta que existan variables VITE_SUPABASE_*.
 */
export async function submitLead(table, row) {
  const payload = {
    ...row,
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    source_path: typeof window !== 'undefined' ? window.location.pathname : null,
    privacy_accepted_at: new Date().toISOString(),
  };

  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from(table).insert(payload);
    if (error) throw error;
    return { mode: 'supabase' };
  }

  const queue = readPending();
  queue.push({ table, payload, queued_at: new Date().toISOString() });
  writePending(queue);

  if (!isSupabaseConfigured()) {
    console.info(
      '[DOMAKEA] Lead guardado en cola local. Configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY para enviar a la base de datos.',
    );
  }

  return { mode: 'queued' };
}

/** Reintenta enviar leads en cola cuando Supabase ya está configurado. */
export async function flushPendingLeads() {
  if (!isSupabaseConfigured()) return { flushed: 0 };
  const supabase = getSupabase();
  if (!supabase) return { flushed: 0 };

  const queue = readPending();
  if (!queue.length) return { flushed: 0 };

  const remaining = [];
  let flushed = 0;

  for (const item of queue) {
    const { error } = await supabase.from(item.table).insert(item.payload);
    if (error) remaining.push(item);
    else flushed += 1;
  }

  writePending(remaining);
  return { flushed, remaining: remaining.length };
}