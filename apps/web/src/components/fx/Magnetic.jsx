import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/** Envuelve un botón/enlace: se "imanta" hacia el cursor al acercarse (solo con ratón). */
const Magnetic = ({ children, strength = 0.32, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={className ?? 'inline-block'}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
