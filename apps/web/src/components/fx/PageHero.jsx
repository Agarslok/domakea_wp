import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import DataField from '@/components/fx/DataField.jsx';
import { SplitText } from '@/components/fx/Reveal.jsx';

/**
 * Hero compartido por las páginas internas: imagen con Ken Burns + parallax,
 * campo de datos interactivo encima y titular que se revela por palabras.
 * Mantiene la misma identidad que el Home para que todo se sienta conectado.
 */
const PageHero = ({ image, eyebrow, title, subtitle, children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[58vh] overflow-hidden bg-secondary pb-24 pt-36 text-secondary-foreground md:min-h-[68vh] md:pb-32 md:pt-48"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20">
        {image && (
          <motion.img
            style={{ scale: bgScale }}
            src={image}
            alt=""
            className="h-full w-full animate-kenburns object-cover object-[center_32%] saturate-[1.12] contrast-[1.06]"
          />
        )}
        <div className="absolute inset-0 bg-secondary/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_18%,hsl(45_100%_53%/0.12),transparent_58%)]" />
      </motion.div>

      <DataField className="-z-10 opacity-[0.88]" density={0.72} />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8"
      >
        {eyebrow != null && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            aria-hidden={!eyebrow}
            className="mx-auto mb-6 flex h-10 min-w-[3.25rem] items-center justify-center rounded-full px-5"
          >
            <span className="glass-soft inline-flex items-center gap-2 rounded-full px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(255,195,15,1)]" />
              {eyebrow ? <span className="sr-only">{eyebrow}</span> : null}
            </span>
          </motion.div>
        )}
        <h1 className="font-display text-[2.4rem] font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          <SplitText text={title} inView={false} delay={0.15} />
        </h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/80 md:text-xl"
          >
            {subtitle}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default PageHero;
