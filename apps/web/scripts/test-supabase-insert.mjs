import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const webRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function loadEnv() {
  const out = {};
  for (const f of ['.env', '.env.local']) {
    const p = path.join(webRoot, f);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const eq = t.indexOf('=');
      if (eq === -1) continue;
      out[t.slice(0, eq).trim()] = t.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    }
  }
  return out;
}

const env = loadEnv();
const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_ANON_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  console.error('Faltan variables en .env');
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

const row = {
  full_name: 'Test local DOMAKEA',
  job_role: 'Analista',
  company_name: 'Prueba integración',
  email: 'test-local@domakea.invalid',
  phone: '+57 3000000000',
  attribution: 'google',
  privacy_accepted_at: new Date().toISOString(),
  message: 'Fila de prueba — puedes borrarla en Table Editor',
};

const { data, error } = await supabase.from('contact_leads').insert(row).select('id, created_at').maybeSingle();

if (error) {
  console.error('✗ INSERT falló:', error.message);
  if (error.code === 'PGRST205' || /does not exist|schema cache/i.test(error.message)) {
    console.error('\n→ Ejecuta primero el SQL de supabase/migrations/20251117120000_lead_forms.sql en SQL Editor.\n');
  }
  process.exit(1);
}

console.log('✓ INSERT OK — contact_leads');
console.log('  id:', data?.id);
console.log('  created_at:', data?.created_at);
console.log('\nRevisa en Supabase → Table Editor → contact_leads\n');