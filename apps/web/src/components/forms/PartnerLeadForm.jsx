import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Handshake, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { partnerLeadSchema } from '@/lib/formSchemas';
import { submitLead, flushPendingLeads } from '@/lib/leadSubmit';
import { FormStepper } from '@/components/forms/FormStepper';
import {
  AttributionField,
  JobRoleField,
  PrivacyConsentField,
  RhfInput,
  RhfTextarea,
  SectorField,
} from '@/components/forms/LeadFormFields';
import FormSubmitSuccess from '@/components/forms/FormSubmitSuccess.jsx';
import { scrollToFirstFormError } from '@/components/forms/scrollToFormError';

const STEPS = ['Quién eres', 'Tu empresa', 'La alianza'];
const STEP_FIELDS = [
  ['full_name', 'job_role', 'job_role_other'],
  ['email', 'phone', 'company_name', 'website', 'economic_sector', 'sector_other', 'company_focus'],
  ['partnership_pitch', 'attribution', 'attribution_other', 'privacy_accepted'],
];

const defaultValues = {
  full_name: '',
  job_role: '',
  job_role_other: '',
  email: '',
  phone: '',
  company_name: '',
  website: '',
  economic_sector: '',
  sector_other: '',
  company_focus: '',
  partnership_pitch: '',
  attribution: '',
  attribution_other: '',
  privacy_accepted: false,
};

function normalizeWebsite(url) {
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/linkedin\.com/i.test(trimmed)) return `https://${trimmed.replace(/^\/\//, '')}`;
  return `https://${trimmed}`;
}

function mapPartnerRow(values) {
  const { privacy_accepted: _p, ...rest } = values;
  return {
    ...rest,
    website: normalizeWebsite(rest.website),
    phone: rest.phone?.trim() || null,
    job_role_other: rest.job_role_other || null,
    economic_sector: rest.economic_sector || null,
    sector_other: rest.sector_other || null,
    attribution_other: rest.attribution_other || null,
  };
}

export default function PartnerLeadForm() {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    resolver: zodResolver(partnerLeadSchema),
    defaultValues,
    mode: 'onTouched',
  });

  const { control, handleSubmit, trigger, watch, setValue, reset } = form;

  const goNext = async () => {
    const ok = await trigger(STEP_FIELDS[step]);
    if (ok) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = handleSubmit(
    async (values) => {
      setSubmitting(true);
      try {
        await submitLead('partner_leads', mapPartnerRow(values));
        await flushPendingLeads();
        setSubmitted(true);
      } catch (err) {
        console.error(err);
        toast({
          variant: 'destructive',
          title: 'No pudimos enviar el formulario',
          description: 'Revisa tu conexión o intenta de nuevo en unos minutos.',
        });
      } finally {
        setSubmitting(false);
      }
    },
    (errors) => {
      scrollToFirstFormError(errors);
    },
  );

  const startOver = () => {
    reset(defaultValues);
    setStep(0);
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <FormSubmitSuccess
        title="¡Propuesta enviada!"
        description="Recibimos tu propuesta de alianza. La revisaremos y nos pondremos en contacto contigo."
        actionLabel="Enviar otra propuesta"
        onReset={startOver}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="min-w-0 space-y-6" noValidate>
      <FormStepper steps={STEPS} currentIndex={step} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.22 }}
          className="grid min-w-0 gap-5 sm:grid-cols-2"
        >
          {step === 0 && (
            <>
              <div className="sm:col-span-2">
                <RhfInput control={control} name="full_name" label="Nombre y apellido" required autoComplete="name" />
              </div>
              <div className="sm:col-span-2">
                <JobRoleField control={control} watch={watch} setValue={setValue} />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <RhfInput control={control} name="email" label="Correo electrónico" required type="email" autoComplete="email" />
              <RhfInput
                control={control}
                name="phone"
                label="WhatsApp / teléfono"
                hint="Opcional"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
              />
              <RhfInput control={control} name="company_name" label="Nombre de la empresa" required autoComplete="organization" />
              <RhfInput
                control={control}
                name="website"
                label="Sitio web o LinkedIn"
                required
                placeholder="https://tuempresa.com o linkedin.com/in/..."
                autoComplete="url"
              />
              <div className="sm:col-span-2">
                <SectorField control={control} watch={watch} setValue={setValue} optional />
              </div>
              <div className="sm:col-span-2">
                <RhfTextarea
                  control={control}
                  name="company_focus"
                  label="¿A qué se dedica tu empresa?"
                  required
                  placeholder="Servicios, mercado, tamaño de equipo, clientes tipo…"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="sm:col-span-2">
                <RhfTextarea
                  control={control}
                  name="partnership_pitch"
                  label="¿Qué ofreces que DOMAKEA no tiene, y qué necesitas de nosotros?"
                  required
                  className="min-h-[140px]"
                  placeholder="Complementariedad de servicios, modelo de comisión, co-ejecución, white label, mercados que quieres abrir…"
                />
              </div>
              <div className="sm:col-span-2">
                <AttributionField control={control} watch={watch} setValue={setValue} />
              </div>
              <div className="sm:col-span-2">
                <PrivacyConsentField control={control} />
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
        {step > 0 ? (
          <Button type="button" variant="outline" onClick={goBack} className="h-12 rounded-full px-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Atrás
          </Button>
        ) : (
          <span />
        )}

        {step < STEPS.length - 1 ? (
          <Button type="button" onClick={goNext} className="h-12 rounded-full px-8">
            Continuar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit" disabled={submitting} className="h-12 rounded-full px-8 shadow-[0_10px_40px_-8px_rgba(255,195,15,0.65)]">
            {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Handshake className="mr-2 h-4 w-4" />}
            Enviar propuesta de alianza
          </Button>
        )}
      </div>
    </form>
  );
}