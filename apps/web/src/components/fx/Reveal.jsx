import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1];

/** Aparece desde abajo con desenfoque que se enfoca (estilo editorial). */
export const Reveal = ({ children, delay = 0, y = 32, className, as = 'div', once = true, ...rest }) => {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-70px' }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/** Titular que se revela palabra por palabra con máscara. `inView=false` lo anima al montar. */
export const SplitText = ({ text, className, delay = 0, as = 'span', inView = true, stagger = 0.045 }) => {
  const Tag = motion[as] || motion.span;
  const words = String(text).split(' ');
  const mode = inView ? { whileInView: 'show', viewport: { once: true, margin: '-60px' } } : { animate: 'show' };

  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...mode}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '115%', rotate: 4 },
              show: { y: 0, rotate: 0, transition: { duration: 0.8, ease: EASE } },
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

const FillWord = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {word}
    </motion.span>
  );
};

/** Texto que se "llena" palabra por palabra mientras haces scroll (estilo oci). */
export const ScrollFill = ({ text, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.82', 'end 0.45'] });
  const words = String(text).split(' ');
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 1.6 / words.length);
        return <FillWord key={i} word={word} progress={scrollYProgress} range={[start, end]} />;
      })}
    </p>
  );
};
