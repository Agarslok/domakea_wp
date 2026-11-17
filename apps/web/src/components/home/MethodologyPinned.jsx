import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { METHODOLOGY } from '@/components/home/data.js';
import { cn } from '@/lib/utils';

const MethodologyPinned = ({ SectionTitle }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const [step, setStep] = useState(0);
  const last = METHODOLOGY.length - 1;

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(last, Math.max(0, Math.floor(v * METHODOLOGY.length * 0.998)));
    setStep((prev) => (prev === next ? prev : next));
  });

  const item = METHODOLOGY[step];

  return (
    <section
      id="metodologia"
      ref={sectionRef}
      style={{ height: `${METHODOLOGY.length * 100}vh` }}
      className="relative bg-secondary"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-6 lg:px-8">
        <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionTitle
              tone="dark"
              eyebrow="Cómo trabajamos"
              title="Nuestra metodología"
              subtitle="Desplaza con el mouse: avanzamos paso a paso sin perder el hilo del proceso."
              className="mb-0"
            />
            <div className="mt-10 hidden lg:flex items-center gap-2">
              {METHODOLOGY.map((m, i) => (
                <span
                  key={m.number}
                  className={cn(
                    'h-1.5 flex-1 rounded-full transition-colors duration-500',
                    i <= step ? 'bg-primary' : 'bg-white/15'
                  )}
                />
              ))}
            </div>
            <p className="mono-label mt-4 hidden text-white/45 lg:block">
              Paso {step + 1} de {METHODOLOGY.length}
            </p>
          </div>

          <div className="relative lg:col-span-7">
            <div className="relative min-h-[280px] md:min-h-[320px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 36, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -28, filter: 'blur(8px)' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary font-display text-xl font-bold text-primary-foreground shadow-[0_0_40px_6px_rgba(255,195,15,0.45)]">
                    {item.number}
                  </span>
                  <h3 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">{item.title}</h3>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">{item.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 lg:hidden">
              {METHODOLOGY.map((m, i) => (
                <span
                  key={m.number}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-medium',
                    i === step ? 'bg-primary text-primary-foreground' : 'bg-white/10 text-white/50'
                  )}
                >
                  {m.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologyPinned;