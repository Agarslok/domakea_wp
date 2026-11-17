import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowUpRight, CheckCircle2, Hand } from 'lucide-react';
import { haptic, splitCategory } from '@/lib/mobile';
import { cn } from '@/lib/utils';

const face = { backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' };

/** Tarjeta que se voltea en 3D: problema → solución DOMAKEA → servicio recomendado. */
const ProblemFlipCard = ({ item, index, total, service, onOpenService, className, heightClass = 'h-[330px]' }) => {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => {
    haptic(10);
    setFlipped((f) => !f);
  };

  return (
    <div className={className} style={{ perspective: 1200 }}>
      <motion.div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={flipped ? 'Ver el problema' : 'Ver la solución'}
        onClick={toggle}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle()}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 130, damping: 17 }}
        style={{ transformStyle: 'preserve-3d' }}
        className={cn('relative cursor-pointer select-none', heightClass)}
      >
        {/* Cara frontal: problema */}
        <div
          style={face}
          className="absolute inset-0 flex flex-col justify-between rounded-3xl border border-destructive/30 bg-destructive/10 p-6 md:p-8"
        >
          <div className="flex items-center justify-between">
            <span className="mono-label flex items-center gap-2 font-semibold text-destructive">
              <AlertCircle className="h-5 w-5" /> Problema
            </span>
            <span className="mono-label tabular-nums text-foreground/40">
              0{index + 1}/0{total}
            </span>
          </div>
          <p className="font-display text-[1.4rem] font-bold leading-tight tracking-tight text-foreground md:text-[1.6rem]">
            {item.problem}
          </p>
          <span className="flex items-center gap-2 text-sm font-medium text-foreground/60">
            <Hand className="h-4 w-4 animate-pulse" /> Toca para ver la solución
          </span>
        </div>

        {/* Cara trasera: solución */}
        <div
          aria-hidden={!flipped}
          style={{ ...face, transform: 'rotateY(180deg)' }}
          className="absolute inset-0 flex flex-col justify-between rounded-3xl bg-primary p-6 text-primary-foreground shadow-xl shadow-primary/25 md:p-8"
        >
          <div className="flex items-center justify-between">
            <span className="mono-label flex items-center gap-2 font-semibold">
              <CheckCircle2 className="h-5 w-5" /> Solución DOMAKEA
            </span>
            <span className="mono-label tabular-nums text-black/40">
              0{index + 1}/0{total}
            </span>
          </div>
          <p className="font-display text-[1.15rem] font-semibold leading-snug md:text-[1.25rem]">{item.solution}</p>
          {service ? (
            <button
              type="button"
              tabIndex={flipped ? 0 : -1}
              onClick={(e) => {
                e.stopPropagation();
                haptic(12);
                onOpenService(service);
              }}
              className="flex h-11 items-center justify-between rounded-full bg-black px-5 text-sm font-semibold text-white transition-transform active:scale-[0.97]"
            >
              Ver {splitCategory(service.category).name}
              <ArrowUpRight className="h-4 w-4 text-primary" />
            </button>
          ) : (
            <span className="text-sm font-medium text-black/60">Toca para volver</span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProblemFlipCard;
