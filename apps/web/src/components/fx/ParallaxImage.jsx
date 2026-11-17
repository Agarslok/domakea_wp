import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Imagen con movimiento:
 *  · parallax al hacer scroll
 *  · zoom suave al pasar el cursor
 *  · (opcional) Ken Burns continuo
 */
const ParallaxImage = ({ src, alt = '', className, imgClassName, strength = 10, kenburns = false, children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={cn('group relative overflow-hidden', className)}>
      <motion.div style={{ y, scale: 1.25 }} className="absolute inset-0">
        <div className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-110">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={cn('h-full w-full object-cover', kenburns && 'animate-kenburns', imgClassName)}
          />
        </div>
      </motion.div>
      {children}
    </div>
  );
};

export default ParallaxImage;
