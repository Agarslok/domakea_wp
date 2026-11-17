import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollFill } from '@/components/fx/Reveal.jsx';

const StoryParagraph = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const y = useTransform(progress, range, [18, 0]);
  return (
    <motion.p style={{ opacity, y }} className="text-base leading-relaxed text-muted-foreground sm:text-lg text-justify">
      {children}
    </motion.p>
  );
};

const HISTORY_PARAGRAPHS = [
  'Nuestra empresa nació hace dos años de un sueño que finalmente se materializó. Un sueño que creció con la experiencia, con cada proyecto y con cada reto superado.',
  'Desde nuestros inicios, tuvimos claro que queríamos construir algo más que una agencia: una consultora estratégica capaz de conectar los datos con la esencia humana de los negocios.',
  'A lo largo de nuestro recorrido, hemos transformado ideas en resultados, y resultados en crecimiento. Hemos trabajado con empresas pequeñas y medianas, adaptándonos a cada realidad, demostrando que la efectividad no depende del tamaño, sino de la estrategia.',
  'Nuestro trabajo ha sido reconocido en distintos espacios profesionales y concursos, pero más allá de los logros, lo que realmente nos define es nuestra capacidad para generar impacto real.',
  'En DOMAKEA, creemos que el verdadero éxito no está en nuestro crecimiento, sino en el de quienes confían en nosotros. Cada empresa que asesoramos se convierte en una extensión de nuestro propósito: crear resultados tangibles, medibles y sostenibles.',
  'Porque si no se puede medir, no es estrategia.',
  'Y eso hacemos nosotros: creamos futuros empresariales más rentables, más medibles y, sobre todo, más humanos.',
  'No trabajamos con suposiciones, sino con decisiones que construyen resultados.',
];

const HistoryScroll = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.82', 'end 0.25'] });
  const n = HISTORY_PARAGRAPHS.length;

  return (
    <div ref={ref} className="relative space-y-12 pb-16">
      <ScrollFill
        text="Transformamos datos en decisiones estratégicas para impulsar el crecimiento de tu negocio."
        className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-foreground md:text-5xl"
      />

      <div className="space-y-6 pt-4">
        {HISTORY_PARAGRAPHS.map((paragraph, i) => {
          const start = i / n;
          const end = Math.min(1, (i + 1.35) / n);
          return (
            <StoryParagraph key={i} progress={scrollYProgress} range={[start, end]}>
              {i === 5 ? (
                <span className="font-medium text-foreground">{paragraph}</span>
              ) : i === 6 ? (
                <>
                  Como dijo Peter Drucker:{' '}
                  <span className="italic font-medium text-primary">"La mejor manera de predecir el futuro es crearlo."</span>{' '}
                  {paragraph}
                </>
              ) : (
                paragraph
              )}
            </StoryParagraph>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryScroll;