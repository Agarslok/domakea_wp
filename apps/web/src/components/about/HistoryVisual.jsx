import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

const HistoryVisual = ({ image, theme, compact = false, interactive = true }) => {
  const ref = useRef(null);
  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const hover = useSpring(0, { stiffness: 220, damping: 26 });

  const rotateY = useTransform(px, [0, 100], [-5, 5]);
  const rotateX = useTransform(py, [0, 100], [5, -5]);
  const imgX = useTransform(px, [0, 100], [-6, 6]);
  const imgY = useTransform(py, [0, 100], [-6, 6]);
  const imgScale = useTransform(hover, [0, 1], [1, 1.05]);
  const glareBg = useMotionTemplate`radial-gradient(480px circle at ${px}% ${py}%, rgba(255,255,255,0.28), transparent 58%)`;

  const onMove = (e) => {
    if (!interactive) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    px.set(x * 100);
    py.set(y * 100);
    hover.set(1);
  };

  const onLeave = () => {
    hover.set(0);
    px.set(50);
    py.set(50);
  };

  if (!image?.src) return null;

  return (
    <motion.div
      ref={ref}
      onPointerMove={interactive ? onMove : undefined}
      onPointerLeave={interactive ? onLeave : undefined}
      style={
        interactive
          ? {
              rotateX,
              rotateY,
              x: image.offsetX ?? 0,
              transformPerspective: 1100,
              transformStyle: 'preserve-3d',
            }
          : {
              x: compact ? (image.offsetXMobile ?? image.offsetX ?? 0) : (image.offsetX ?? 0),
            }
      }
      className={cn(
        'relative mx-auto w-full cursor-default overflow-hidden shadow-2xl',
        compact
          ? cn(
              'max-w-[min(100%,18.5rem)] rounded-2xl ring-2',
              image.tall ? 'aspect-[4/5] max-h-[28vh]' : 'aspect-[5/4] max-h-[26vh]'
            )
          : 'rounded-[1.75rem] ring-4',
        !compact && (image.tall ? 'aspect-[4/5] max-w-md lg:max-w-lg' : 'aspect-[4/5] max-w-sm md:max-w-md'),
        theme === 'gold'
          ? compact
            ? 'ring-black/15'
            : 'ring-black/15'
          : theme === 'dark'
            ? compact
              ? 'ring-primary/25'
              : 'ring-primary/30'
            : compact
              ? 'ring-primary/20'
              : 'ring-primary/25'
      )}
    >
      <motion.img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        style={{
          objectPosition:
            compact && image.objectPositionMobile
              ? image.objectPositionMobile
              : image.objectPosition || 'center center',
          x: imgX,
          y: imgY,
          scale: imgScale,
        }}
        className="h-full w-full object-cover will-change-transform"
      />
      <motion.span
        aria-hidden
        style={{ background: glareBg, opacity: hover }}
        className="pointer-events-none absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      {image.caption && (
        <span className="absolute bottom-4 left-4 rounded-full bg-black/45 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
          {image.caption}
        </span>
      )}
    </motion.div>
  );
};

export default HistoryVisual;