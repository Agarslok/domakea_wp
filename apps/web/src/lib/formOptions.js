/**
 * Opciones compartidas para formularios nativos (contacto, partners, ARCO).
 * Fuente: plantillas Google Forms + ajustes de negocio (CCB 2026, etc.).
 */

export const JOB_ROLES = [
  'Dueño / Fundador / Socio',
  'Gerente General',
  'Director Comercial / de Ventas',
  'Director de Marketing',
  'Director de Operaciones',
  'Jefe / Coordinador de área',
  'Analista',
  'Otro',
];

export const ECONOMIC_SECTORS = [
  'Retail / Comercio al por menor',
  'Servicios profesionales y consultoría',
  'Salud y bienestar',
  'Tecnología y software',
  'Educación y formación',
  'Manufactura e industria',
  'Inmobiliario y construcción',
  'Alimentos y bebidas',
  'Logística y transporte',
  'Financiero y seguros',
  'Otro',
];

/** Contacto: ¿Cómo nos encontraste? — Charla CCB primero; luego digital y referidos. */
export const CONTACT_ATTRIBUTION = [
  { value: 'charla-ccb-2026', label: 'Charla CCB 2026 (Cámara de Comercio de Bogotá)' },
  { value: 'evento-webinar', label: 'Otro evento o webinar' },
  { value: 'referido', label: 'Referido de un conocido' },
  { value: 'google', label: 'Google / búsqueda web' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'otro', label: 'Otro' },
];

/** Partners: misma lógica de atribución (prioriza CCB si el lead viene del mismo canal). */
export const PARTNER_ATTRIBUTION = CONTACT_ATTRIBUTION;

export const CONTACT_START_WHEN = [
  { value: 'asap', label: 'Lo antes posible' },
  { value: 'next-month', label: 'En el próximo mes' },
  { value: '1-3-months', label: 'Entre 1 y 3 meses' },
  { value: '3-6-months', label: 'Entre 3 y 6 meses' },
  { value: 'unsure', label: 'Aún no lo tengo claro' },
];

/** Mismos hooks que en servicios / portafolio (ContentContext). */
export const SERVICE_INTEREST = [
  {
    value: 'doma-advisory',
    name: 'DomaAdvisory',
    tag: 'Consultoría',
    hook: 'Define la dirección estratégica del negocio.',
  },
  {
    value: 'doma-finance',
    name: 'DomaFinance',
    tag: 'Consultoría financiera',
    hook: 'Sabe si tu proyecto funciona antes de invertir.',
  },
  {
    value: 'doma-field',
    name: 'DomaField',
    tag: null,
    hook: 'Recolectamos los datos.',
  },
  {
    value: 'doma-core',
    name: 'DomaCore',
    tag: null,
    hook: 'Organizamos los datos.',
  },
  {
    value: 'doma-analytics',
    name: 'DomaAnalytics',
    tag: null,
    hook: 'Analizamos los datos.',
  },
  {
    value: 'doma-growth',
    name: 'DomaGrowth',
    tag: null,
    hook: 'Convierte los hallazgos en crecimiento comercial.',
  },
  {
    value: 'diagnostico',
    name: 'Diagnóstico gratuito',
    tag: null,
    hook: 'Aún no estoy seguro — quiero que me orienten.',
  },
];

/** Texto plano para valor seleccionado / almacenamiento legible. */
export function formatServiceInterestLabel(opt) {
  if (!opt) return '';
  if (opt.tag) return `${opt.name} / ${opt.tag} / ${opt.hook}`;
  return `${opt.name} / ${opt.hook}`;
}

/** Versión corta para el selector en pantallas pequeñas */
export function formatServiceInterestShort(opt) {
  if (!opt) return '';
  const head = opt.tag ? `${opt.name} / ${opt.tag}` : opt.name;
  return `${head} · ${opt.hook}`;
}

export function getServiceInterestByValue(value) {
  return SERVICE_INTEREST.find((s) => s.value === value);
}

export const ARCO_REQUEST_TYPES = [
  { value: 'conocer', label: 'Conocer mis datos' },
  { value: 'rectificar', label: 'Actualizar / rectificar' },
  { value: 'suprimir', label: 'Suprimir mis datos' },
  { value: 'revocar', label: 'Revocar autorización' },
  { value: 'prueba', label: 'Prueba de autorización' },
];

export const ARCO_RELATION = [
  'Soy o fui cliente',
  'Fui prospecto / recibí comunicación',
  'Soy colaborador / ex-colaborador',
  'Soy proveedor / aliado',
];