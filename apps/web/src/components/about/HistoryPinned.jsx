import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';

const HISTORY_STEPS = [
  {
    text: 'Transformamos datos en decisiones estratégicas para impulsar el crecimiento de tu negocio.',
    lead: true,
  },
  { text: 'Nuestra empresa nació hace dos años de un sueño que finalmente se materializó. Un sueño que creció con la experiencia, con cada proyecto y con cada reto superado.' },
  { text: 'Desde nuestros inicios, tuvimos claro que queríamos construir algo más que una agencia: una consultora estratégica capaz de conectar los datos con la esencia humana de los negocios.' },
  { text: 'A lo largo de nuestro recorrido, hemos transformado ideas en resultados, y resultados en crecimiento. Hemos trabajado con empresas pequeñas y medianas, adaptándonos a cada realidad, demostrando que la efectividad no depende del tamaño, sino de la estrategia.' },
  { text: 'Nuestro trabajo ha sido reconocido en distintos espacios profesionales y concursos, pero más allá de los logros, lo que realmente nos define es nuestra capacidad para generar impacto real.' },
  { text: 'En DOMAKEA, creemos que el verdadero éxito no está en nuestro crecimiento, sino en el de quienes confían en nosotros. Cada empresa que asesoramos se convierte en una extensión de nuestro propósito: crear resultados tangibles, medibles y sostenibles.' },
  { text: 'Porque si no se puede medir, no es estrategia.', emphasis: true },
  {
    text: 'Como dijo Peter Drucker: "La mejor manera de predecir el futuro es crearlo." Y eso hacemos nosotros: creamos futuros empresariales más rentables, más medibles y, sobre todo, más humanos.',
    quote: true,
  },
  { text: 'No trabajamos con suposiciones, sino con decisiones que construyen resultados.' },
];

const HistoryPinned = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const [step, setStep] = useState(0);
  const last = HISTORY_STEPS.length - 1;

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(last, Math.max(0, Math.floor(v * HISTORY_STEPS.length * 0.998)));
    setStep((prev) => (prev === next ? prev : next));
  });

  const item = HISTORY_STEPS[step];

  return (
    <section
      ref={sectionRef}
      style={{ height: `${HISTORY_STEPS.length * 85}vh` }}
      className="relative -mx-4 sm:mx-0"
      aria-label="Nuestra historia narrada al desplazarse"
    >
      <div className="sticky top-24 flex min-h-[62vh] items-center md:top-28 md:min-h-[58vh]">
        <div className="w-full">
          <p className="mono-label mb-5 text-foreground/50">
            Fragmento {step + 1} de {HISTORY_STEPS.length}
          </p>
          <div className="relative min-h-[220px] md:min-h-[280px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <p
                  className={
                    item.lead
                      ? 'font-display text-3xl font-bold leading-[1.12] tracking-tight text-foreground md:text-5xl'
                      : item.emphasis
                        ? 'font-display text-2xl font-bold text-foreground md:text-3xl'
                        : item.quote
                          ? 'text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl'
                          : 'text-base leading-relaxed text-muted-foreground sm:text-lg text-justify md:text-xl'
                  }
                >
                  {item.quote ? (
                    <>
                      Como dijo Peter Drucker:{' '}
                      <span className="font-medium italic text-primary">"La mejor manera de predecir el futuro es crearlo."</span>{' '}
                      Y eso hacemos nosotros: creamos futuros empresariales más rentables, más medibles y, sobre todo, más humanos.
                    </>
                  ) : (
                    item.text
                  )}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex gap-1.5">
            {HISTORY_STEPS.map((_, i) => (
              <span
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= step ? 'bg-primary' : 'bg-border'}`}
              />
            ))}
          </div>
          <p className="mono-label mt-4 text-foreground/45">Desplaza para seguir la historia</p>
        </div>
      </div>
    </section>
  );
};

export default HistoryPinned;