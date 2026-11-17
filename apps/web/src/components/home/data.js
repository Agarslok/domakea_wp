import { BarChart3, CheckCircle2, Headphones, LineChart, Target, TrendingUp, Users, Zap } from 'lucide-react';

export const SECTIONS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'retos', label: 'Retos' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'porque', label: 'Por qué DOMAKEA' },
  { id: 'herramientas', label: 'Herramientas' },
  { id: 'metodologia', label: 'Metodología' },
  { id: 'casos', label: 'Casos de éxito' },
  { id: 'contacto', label: 'Contacto' },
];

export const METHODOLOGY = [
  { number: 1, title: 'Diagnóstico', description: 'Análisis profundo de tu situación actual, mercado y competencia' },
  { number: 2, title: 'Estrategia', description: 'Diseño de plan personalizado basado en datos y objetivos específicos' },
  { number: 3, title: 'Implementación', description: 'Ejecución ágil con seguimiento continuo y ajustes en tiempo real (asociados)' },
  { number: 4, title: 'Medición', description: 'Monitoreo de KPIs y métricas clave para evaluar resultados' },
  { number: 5, title: 'Optimización', description: 'Mejora continua basada en aprendizajes y nuevas oportunidades' },
];

const TOOLS_ALL = [
  { name: 'Google Analytics', icon: '/google-analytics-logo.png' },
  { name: 'Power BI', icon: '/Microsoft-Power-BI-Logo.png' },
  { name: 'Meta Ads', icon: '/meta-logo.png' },
  { name: 'Google Ads', icon: '/google-ads-logo.jpg' },
  { name: 'HubSpot', icon: '/hubspot-logo.png' },
  { name: 'Tableau', icon: '/Tableau-logo.png' },
  { name: 'R Studio', icon: '/r-logo.png' },
  { name: 'Looker Studio', icon: '/looker-studio-logo.png' },
  { name: 'Python', icon: '/python-logo.png' },
  { name: 'Mailchimp', icon: '/mailchimp-logo.webp' },
  { name: 'Notion', icon: '/Notion-logo.png' },
  { name: 'Slack', icon: '/slack-logo.png' },
  { name: 'Legiscomex', icon: '/legiscomex.jpg' },
  { name: 'EMIS', icon: '/emis.png' },
];

const TOOLS_SPLIT = Math.ceil(TOOLS_ALL.length / 2);
export const TOOLS = TOOLS_ALL;
export const TOOLS_TOP = TOOLS_ALL.slice(0, TOOLS_SPLIT);
export const TOOLS_BOTTOM = TOOLS_ALL.slice(TOOLS_SPLIT);

export const BENEFIT_ICONS = { TrendingUp, Target, BarChart3, Users, Headphones, LineChart, Zap, CheckCircle2 };

/** Qué servicio recomendar para cada problema del Home (id de problema -> id de servicio). */
export const PROBLEM_TO_SERVICE = { 1: 3, 2: 5, 3: 5 };

/** Mensaje corto del servicio en la "ruta del dato" del hero. */
export const PIPELINE_ORDER = [2, 3, 4, 5];
