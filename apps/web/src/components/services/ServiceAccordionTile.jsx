import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import DarkTileShell from '@/components/fx/DarkTileShell.jsx';
import { splitCategory } from '@/lib/mobile';

const ServiceAccordionTile = ({ service, index, open, onToggle, layout = 'row' }) => {
  const { name, tag } = splitCategory(service.category);
  const from = service.totalPrice?.split('—')[0]?.trim();
  const isRow = layout === 'row';

  return (
    <DarkTileShell index={index} className="w-full">
      <button
        type="button"
        onClick={onToggle}
        className="relative w-full p-6 text-left md:p-8"
      >
        {isRow ? (
          <div className="flex w-full items-start justify-between gap-4 md:gap-6">
            <div className="min-w-0 flex-1">
              {tag && (
                <span className="mono-label mb-3 inline-flex rounded-full bg-primary/15 px-2.5 py-1 text-primary">{tag}</span>
              )}
              <h3 className="font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">{name}</h3>
              {service.hook && <p className="mt-2 text-sm italic text-primary md:text-base">{service.hook}</p>}
              <p className="mt-3 text-base leading-relaxed text-white/70">{service.shortDescription}</p>
              {from && !open && (
                <p className="mono-label mt-4 text-white/45">
                  Desde <span className="font-display text-base font-bold text-white">{from}</span> COP
                </p>
              )}
            </div>
            <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5">
              {open ? <ChevronUp className="h-5 w-5 text-primary" /> : <ChevronDown className="h-5 w-5 text-white/70" />}
            </span>
          </div>
        ) : (
          <div className="flex flex-col">
            {tag && <span className="mono-label mb-3 w-fit rounded-full bg-primary/15 px-2.5 py-1 text-primary">{tag}</span>}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-[1.65rem] font-bold leading-tight tracking-tight md:text-[1.9rem]">{name}</h3>
                {service.hook && <p className="mt-2 text-sm italic text-primary">{service.hook}</p>}
                <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-white/70">{service.shortDescription}</p>
                {from && !open && (
                  <p className="mono-label mt-4 text-white/45">
                    Desde <span className="font-display text-base font-bold text-white">{from}</span> COP
                  </p>
                )}
              </div>
              <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5">
                {open ? <ChevronUp className="h-5 w-5 text-primary" /> : <ChevronDown className="h-5 w-5 text-white/70" />}
              </span>
            </div>
          </div>
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 px-6 pb-8 md:px-8">
              <p className="mt-6 mb-8 leading-relaxed text-white/75">{service.description}</p>

              <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div>
                  <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Beneficios
                  </h4>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="mt-1 text-primary">●</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Casos de uso
                  </h4>
                  <ul className="space-y-2">
                    {service.useCases.map((useCase, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="mt-1 text-primary">●</span>
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {service.subservices?.length > 0 && (
                <div className="mb-8">
                  <h4 className="mb-4 text-lg font-semibold text-white">Servicios incluidos</h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {service.subservices.map((sub) => (
                      <div key={sub.id} className="relative rounded-xl border border-white/10 bg-white/5 px-4 py-4">
                        {sub.included && (
                          <span className="absolute right-3 top-3 rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
                            Incluido
                          </span>
                        )}
                        <p className="mb-1 pr-16 text-sm font-semibold text-white">{sub.name}</p>
                        <p className="text-xs leading-relaxed text-white/65">{sub.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {service.agencyNote && (
                <div className="mb-8 overflow-hidden rounded-2xl border-2 border-primary/80 bg-black/25">
                  <div className="px-6 py-5">
                    <div className="mb-3 flex items-center gap-2">
                      <Zap className="h-5 w-5 shrink-0 text-primary" />
                      <h4 className="text-base font-bold uppercase tracking-wide text-primary">{service.agencyNote.title}</h4>
                    </div>
                    <p className="text-sm leading-relaxed text-white/80">{service.agencyNote.body}</p>
                  </div>
                </div>
              )}

              {service.totalPrice && (
                <div className="overflow-hidden rounded-2xl bg-primary">
                  <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="mono-label mb-1 text-primary-foreground/80">Inversión del proyecto</p>
                      <p className="font-display text-2xl font-bold text-primary-foreground">
                        <span className="text-sm font-normal opacity-80">Desde </span>
                        {service.totalPrice}
                        <span className="text-sm font-normal opacity-80"> COP</span>
                      </p>
                    </div>
                    {service.retainer && (
                      <div className="border-t border-primary-foreground/25 pt-3 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                        <p className="mono-label mb-1 text-primary-foreground/80">Retainer mensual</p>
                        <p className="text-lg font-semibold text-primary-foreground">{service.retainer}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <p className="mt-5 text-center text-sm text-white/60">
                ¿Te interesa este servicio?{' '}
                <a
                  href="https://api.whatsapp.com/send/?phone=3018547895&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  Conversemos →
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DarkTileShell>
  );
};

export default ServiceAccordionTile;