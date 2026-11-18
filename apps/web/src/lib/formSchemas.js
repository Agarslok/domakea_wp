import { z } from 'zod';

const phoneRegex = /^[\d\s+()-]{7,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const attribution = z.string().min(1, 'Selecciona cómo nos encontraste');
const jobRole = z.string().min(1, 'Selecciona tu cargo');
const privacyAccepted = z.boolean().refine((v) => v === true, {
  message: 'Debes aceptar la política de datos personales para enviar',
});

export const contactLeadSchema = z.object({
  full_name: z.string().trim().min(2, 'Escribe tu nombre completo'),
  job_role: jobRole,
  job_role_other: z.string().trim().optional(),
  company_name: z.string().trim().min(2, 'Nombre de la empresa'),
  email: z.string().trim().regex(emailRegex, 'Correo corporativo válido'),
  phone: z.string().trim().regex(phoneRegex, 'Teléfono o WhatsApp válido'),
  economic_sector: z.string().optional(),
  sector_other: z.string().trim().optional(),
  service_interest: z.string().optional(),
  start_when: z.string().optional(),
  attribution,
  attribution_other: z.string().trim().optional(),
  message: z.string().trim().max(2000).optional(),
  privacy_accepted: privacyAccepted,
}).superRefine((data, ctx) => {
  if (data.job_role === 'Otro' && !data.job_role_other?.trim()) {
    ctx.addIssue({ code: 'custom', path: ['job_role_other'], message: 'Especifica tu cargo' });
  }
  if (data.economic_sector === 'Otro' && !data.sector_other?.trim()) {
    ctx.addIssue({ code: 'custom', path: ['sector_other'], message: 'Especifica el sector' });
  }
  if (data.attribution === 'otro' && !data.attribution_other?.trim()) {
    ctx.addIssue({ code: 'custom', path: ['attribution_other'], message: 'Cuéntanos cómo nos encontraste' });
  }
});

export const partnerLeadSchema = z.object({
  full_name: z.string().trim().min(2, 'Escribe tu nombre completo'),
  job_role: jobRole,
  job_role_other: z.string().trim().optional(),
  email: z.string().trim().regex(emailRegex, 'Correo electrónico válido'),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || phoneRegex.test(v), { message: 'Teléfono válido' }),
  company_name: z.string().trim().min(2, 'Nombre de la empresa'),
  website: z
    .string()
    .trim()
    .min(4, 'Sitio web o perfil de LinkedIn')
    .refine((v) => /^https?:\/\//i.test(v) || /linkedin\.com/i.test(v) || /\./.test(v), {
      message: 'URL o enlace de LinkedIn',
    }),
  economic_sector: z.string().optional(),
  sector_other: z.string().trim().optional(),
  company_focus: z.string().trim().min(10, 'Describe a qué se dedica tu empresa'),
  partnership_pitch: z
    .string()
    .trim()
    .min(20, 'Cuéntanos qué ofreces y qué necesitas de DOMAKEA'),
  attribution,
  attribution_other: z.string().trim().optional(),
  privacy_accepted: privacyAccepted,
}).superRefine((data, ctx) => {
  if (data.job_role === 'Otro' && !data.job_role_other?.trim()) {
    ctx.addIssue({ code: 'custom', path: ['job_role_other'], message: 'Especifica tu cargo' });
  }
  if (data.economic_sector === 'Otro' && !data.sector_other?.trim()) {
    ctx.addIssue({ code: 'custom', path: ['sector_other'], message: 'Especifica el sector' });
  }
  if (data.attribution === 'otro' && !data.attribution_other?.trim()) {
    ctx.addIssue({ code: 'custom', path: ['attribution_other'], message: 'Cuéntanos cómo nos encontraste' });
  }
});