/**
 * Verifica variables .env y conectividad con Supabase.
 * Uso: desde apps/web → npm run supabase:check
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, '..');

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const out = {};
  for (const line of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

function mergeEnv() {
  const files = ['.env', '.env.local'];
  let merged = { ...process.env };
  for (const f of files) {
    merged = { ...merged, ...loadEnvFile(path.join(webRoot, f)) };
  }
  return merged;
}

const env = mergeEnv();
const url = (env.VITE_SUPABASE_URL || '').trim();
const key = (env.VITE_SUPABASE_ANON_KEY || env.VITE_SUPABASE_PUBLISHABLE_KEY || '').trim();

console.log('DOMAKEA — verificación Supabase\n');

if (!url || url.includes('TU_PROYECTO')) {
  console.error('✗ VITE_SUPABASE_URL: falta o sigue con placeholder.');
  console.error('  Crea apps/web/.env a partir de .env.example\n');
  process.exit(1);
}

if (!key || key.startsWith('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...')) {
  console.error('✗ VITE_SUPABASE_ANON_KEY (o VITE_SUPABASE_PUBLISHABLE_KEY): falta o es placeholder.');
  process.exit(1);
}

console.log('✓ Variables presentes');
console.log(`  URL: ${url}`);

try {
  const res = await fetch(`${url}/rest/v1/`, {
    method: 'HEAD',
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  if (res.ok || [401, 404].includes(res.status)) {
    console.log(`✓ API accesible (HTTP ${res.status})`);
    console.log('\nSiguiente paso: ejecuta el SQL en supabase/migrations/20251117120000_lead_forms.sql');
    console.log('Luego envía un formulario en /contacto y revisa la tabla contact_leads en Supabase.\n');
    process.exit(0);
  }
  console.error(`✗ API respondió HTTP ${res.status}. Revisa la clave publishable/anon.`);
  process.exit(1);
} catch (e) {
  console.error('✗ Error de red:', e.message);
  process.exit(1);
}