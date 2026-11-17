import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ScrollItem } from '@/components/fx/PageMotion.jsx';
import SpotlightCard from '@/components/fx/SpotlightCard.jsx';
import { cn } from '@/lib/utils';

/** Pilares tipo tarjetas del Home: selección + panel detalle animado. */
const AboutPillarTiles = ({ sections }) => {
  const [active, setActive] = useState(0);
  const current = sections[active] || sections[0];
  const CurrentIcon = current?.icon;

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {sections.map((section, index) => {
          const Icon = section.icon;
          const on = index === active;
          const span =
            index < 3 ? 'sm:col-span-1 xl:col-span-2' : index === 3 || index === 4 ? 'sm:col-span-1 xl:col-span-3' : 'sm:col-span-2 xl:col-span-2';
          return (
            <ScrollItem key={section.title} index={index} delayStep={0.06} className={span}>
              <SpotlightCard as="div" className={cn('h-full rounded-3xl', on && 'ring-2 ring-primary shadow-[0_0_48px_-4px_hsl(45_100%_53%/0.45)]')}>
              <motion.button
                type="button"
                onClick={() => setActive(index)}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'relative flex min-h-[220px] w-full flex-col overflow-hidden rounded-3xl bg-secondary p-6 text-left text-secondary-foreground shadow-lg shadow-black/15 md:min-h-[240px] md:p-7',
                )}
              >
                <span className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-[6.5rem] font-extrabold leading-none text-white/[0.06]">
                  0{index + 1}
                </span>
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15">
                  <Icon className="h-6 w-6 text-primary" />
                </span>
                <h3 className="font-display text-xl font-bold leading-tight tracking-tight md:text-2xl">{section.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/65">{section.content}</p>
                <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-medium text-primary">
                  Explorar
                  <ArrowUpRight className={cn('h-4 w-4 transition-transform', on && 'rotate-45')} />
                </span>
              </motion.button>
              </SpotlightCard>
            </ScrollItem>
          );
        })}
      </div>

      <div className="mt-8 min-h-[200px]">
        <AnimatePresence mode="wait" initial={false}>
          {current && (
            <motion.div
              key={current.title}
              initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-background to-background p-8 md:p-10"
            >
              <div className="mb-4 flex items-center gap-3">
                {CurrentIcon && (
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <CurrentIcon className="h-5 w-5" />
                  </span>
                )}
                <h3 className="font-display text-2xl font-bold tracking-tight">{current.title}</h3>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{current.content}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AboutPillarTiles;