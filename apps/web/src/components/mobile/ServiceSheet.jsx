import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { haptic, splitCategory, waLink } from '@/lib/mobile';

/**
 * Bottom sheet con TODA la información de un servicio (la misma de la página
 * Servicios) organizada en pestañas para no obligar a hacer scroll infinito.
 */
const ServiceSheet = ({ service, open, onOpenChange }) => {
  const [tab, setTab] = useState('resumen');

  useEffect(() => {
    if (open) setTab('resumen');
  }, [open, service?.id]);

  const tabs = useMemo(() => {
    if (!service) return [];
    return [
      { id: 'resumen', label: 'Resumen' },
      { id: 'beneficios', label: 'Beneficios', show: service.benefits?.length },
      { id: 'casos', label: 'Casos de uso', show: service.useCases?.length },
      { id: 'incluye', label: 'Incluye', show: service.subservices?.length },
    ].filter((t) => t.show === undefined || t.show);
  }, [service]);

  if (!service) return null;

  const { name, tag } = splitCategory(service.category);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} shouldScaleBackground={false}>
      <DrawerContent className="h-[88dvh] max-h-[88dvh] rounded-t-[28px] md:mx-auto md:max-w-3xl border-0 bg-secondary text-secondary-foreground">
        <div className="px-5 pb-3 pt-2">
          {tag && (
            <span className="mb-2 inline-block rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
              {tag}
            </span>
          )}
          <DrawerTitle className="text-3xl font-bold leading-tight">{name}</DrawerTitle>
          {service.hook && (
            <DrawerDescription className="mt-1 text-sm italic text-primary">{service.hook}</DrawerDescription>
          )}
        </div>

        {/* Pestañas */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-3" data-vaul-no-drag>
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                haptic();
                setTab(t.id);
              }}
              className={cn(
                'shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors',
                tab === t.id ? 'bg-primary text-primary-foreground' : 'bg-white/10 text-white/80'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {tab === 'resumen' && (
                <div className="space-y-5">
                  <p className="text-[15px] leading-relaxed text-white/80">{service.description}</p>
                  {service.shortDescription && service.shortDescription !== service.description && (
                    <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-white/70">
                      {service.shortDescription}
                    </p>
                  )}
                  {service.agencyNote && (
                    <div className="rounded-2xl border-2 border-primary p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Zap className="h-4 w-4 shrink-0 text-primary" />
                        <h4 className="text-xs font-bold uppercase tracking-wide text-primary">
                          {service.agencyNote.title}
                        </h4>
                      </div>
                      <p className="text-sm leading-relaxed text-white/85">{service.agencyNote.body}</p>
                    </div>
                  )}
                </div>
              )}

              {tab === 'beneficios' && (
                <ul className="space-y-3">
                  {service.benefits.map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-start gap-3 rounded-2xl bg-white/5 p-3.5"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm leading-relaxed text-white/85">{b}</span>
                    </motion.li>
                  ))}
                </ul>
              )}

              {tab === 'casos' && (
                <ul className="space-y-3">
                  {service.useCases.map((u, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-start gap-3 rounded-2xl bg-white/5 p-3.5"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-white/85">{u}</span>
                    </motion.li>
                  ))}
                </ul>
              )}

              {tab === 'incluye' && (
                <div className="space-y-3">
                  {service.subservices.map((s, i) => (
                    <motion.div
                      key={s.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="relative rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      {s.included && (
                        <span className="absolute right-3 top-3 rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary">
                          Incluido
                        </span>
                      )}
                      <p className="pr-16 text-sm font-semibold">{s.name}</p>
                      <p className="mt-1 text-xs leading-relaxed text-white/65">{s.description}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pie fijo: inversión + CTA */}
        <div className="border-t border-white/10 bg-secondary px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
          {service.totalPrice && (
            <div className="mb-3">
              <p className="text-[10px] uppercase tracking-wider text-white/50">Inversión del proyecto · desde</p>
              <p className="text-xl font-bold leading-tight text-primary">
                {service.totalPrice}
                <span className="ml-1 text-xs font-normal text-white/60">COP</span>
              </p>
              {service.retainer && (
                <p className="mt-0.5 text-xs text-white/65">
                  Retainer mensual: <span className="font-semibold text-white/90">{service.retainer}</span>
                </p>
              )}
            </div>
          )}
          <a
            href={waLink(`Hola DOMAKEA, me interesa ${name}. ¿Podemos conversar?`)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => haptic(12)}
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-primary text-[15px] font-semibold text-primary-foreground active:scale-[0.98] transition-transform"
          >
            Conversemos sobre {name}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ServiceSheet;
