import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

/** Tarjeta que se inclina en 3D siguiendo el cursor, con un brillo (glare) que lo acompaña. */
const TiltCard = ({ children, className, max = 7, glare = true, as = 'div', ...rest }) => {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgba(255,255,255,0.22), transparent 55%)`;
  const Tag = motion[as] || motion.div;

  const onMove = (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1100, transformStyle: 'preserve-3d' }}
      className={cn('group/tilt relative', className)}
      {...rest}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden
          style={{ background: glareBg }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        />
      )}
    </Tag>
  );
};

export default TiltCard;
