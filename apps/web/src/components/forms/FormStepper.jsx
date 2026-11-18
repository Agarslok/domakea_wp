import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function FormStepper({ steps, currentIndex }) {
  return (
    <div className="mb-6 sm:mb-8">
      <p className="mono-label mb-3 text-center text-[11px] text-muted-foreground sm:hidden" aria-live="polite">
        Paso {currentIndex + 1} de {steps.length}: {steps[currentIndex]}
      </p>
      <div className="flex items-center justify-between gap-2">
        {steps.map((label, index) => {
          const done = index < currentIndex;
          const active = index === currentIndex;
          return (
            <motion.div
              key={label}
              className="flex min-w-0 flex-1 flex-col items-center gap-2"
              initial={false}
              animate={{ opacity: active || done ? 1 : 0.45 }}
            >
              <motion.div
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors',
                  done && 'border-primary bg-primary text-primary-foreground',
                  active && !done && 'border-primary bg-primary/15 text-primary',
                  !active && !done && 'border-border bg-muted text-muted-foreground',
                )}
                layout
              >
                {done ? '✓' : index + 1}
              </motion.div>
              <span
                className={cn(
                  'mono-label hidden text-center text-[10px] uppercase tracking-wider sm:block',
                  active ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {label}
              </span>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={false}
          animate={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}