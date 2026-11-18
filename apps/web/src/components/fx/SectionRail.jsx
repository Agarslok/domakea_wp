import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { haptic } from '@/lib/mobile';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * Riel de secciones: hilo vertical que conecta todas las partes del Home.
 * Desktop: siempre visible, con etiqueta al pasar el cursor.
 * Móvil: oculto (solo desktop).
 */
const SectionRail = ({ sections }) => {
  const desktop = useMediaQuery('(min-width: 768px)');
  const [active, setActive] = useState(sections[0]?.id);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    if (!desktop) return undefined;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [desktop, sections]);

  if (!desktop) return null;

  const go = (id) => {
    haptic();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const first = sections[0]?.id;
  const hidden = active === first;
  const activeIndex = Math.max(0, sections.findIndex((s) => s.id === active));

  return (
    <motion.nav
      aria-label="Secciones del inicio"
      initial={false}
      animate={{ opacity: hidden ? 0 : 1, x: hidden ? 14 : 0 }}
      transition={{ duration: 0.3 }}
      className={cn('fixed right-2 top-1/2 z-30 -translate-y-1/2 md:right-5', hidden && 'pointer-events-none')}
    >
      <ul className="glass relative flex flex-col items-center gap-1.5 rounded-full px-1.5 py-3">
        {/* hilo de progreso */}
        <span aria-hidden className="absolute bottom-3 top-3 w-px bg-white/15" />
        <motion.span
          aria-hidden
          className="absolute top-3 w-px origin-top bg-primary"
          initial={false}
          animate={{ height: `calc((100% - 1.5rem) * ${sections.length > 1 ? activeIndex / (sections.length - 1) : 0})` }}
          transition={{ type: 'spring', stiffness: 120, damping: 22 }}
        />
        {sections.map((s) => (
          <li key={s.id} className="relative">
            <button
              type="button"
              onClick={() => go(s.id)}
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}
              aria-label={s.label}
              aria-current={active === s.id ? 'true' : undefined}
              className="relative flex h-5 w-4 items-center justify-center"
            >
              <span
                className={cn(
                  'block rounded-full transition-all duration-300',
                  active === s.id ? 'h-3.5 w-1.5 bg-primary shadow-[0_0_12px_rgba(255,195,15,0.9)]' : 'h-1.5 w-1.5 bg-white/50'
                )}
              />
            </button>
            {desktop && hovered === s.id && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass mono-label pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1.5 text-white"
              >
                {s.label}
              </motion.span>
            )}
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default SectionRail;
