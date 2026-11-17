import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

/** Efecto linterna al pasar el cursor — sin inclinación 3D. */
const SpotlightCard = ({ children, className, as = 'div', ...rest }) => {
  const ref = useRef(null);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glow = useSpring(0, { stiffness: 220, damping: 26 });
  const glareBg = useMotionTemplate`radial-gradient(520px circle at ${gx}% ${gy}%, rgba(255,255,255,0.36), rgba(255,255,255,0.14) 24%, rgba(255,195,15,0.1) 42%, transparent 68%)`;
  const Tag = motion[as] || motion.div;

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    gx.set(px * 100);
    gy.set(py * 100);
    glow.set(1);
  };
  const reset = () => {
    glow.set(0);
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn('group/spot relative overflow-hidden', className)}
      {...rest}
    >
      {children}
      <motion.span
        aria-hidden
        style={{ background: glareBg, opacity: glow }}
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
      />
    </Tag>
  );
};

export default SpotlightCard;