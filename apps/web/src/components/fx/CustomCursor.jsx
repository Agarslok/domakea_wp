import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Halo que sigue al cursor (solo desktop con ratón). No oculta el cursor nativo:
 * crece sobre enlaces y botones y cambia a amarillo sólido.
 */
const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (min-width: 1024px)');
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target instanceof Element ? e.target.closest('a, button, [role="button"], input, textarea, select, label') : null;
      setHover(!!target);
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', dn);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', dn);
      window.removeEventListener('pointerup', up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{ scale: down ? 0.7 : hover ? 1.9 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`h-9 w-9 rounded-full border transition-colors duration-200 ${
          hover ? 'border-primary bg-primary/25' : 'border-primary/70 bg-transparent'
        }`}
      />
    </motion.div>
  );
};

export default CustomCursor;
