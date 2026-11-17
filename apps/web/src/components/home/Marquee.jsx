import React from 'react';
import { cn } from '@/lib/utils';

/** Fila infinita de logos (se pausa al pasar el cursor). */
const Marquee = ({ items, reverse = false, size = 'md' }) => (
  <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] motion-reduce:overflow-x-auto">
    <div
      className={cn(
        'flex w-max motion-reduce:animate-none group-hover:[animation-play-state:paused]',
        reverse ? 'animate-marquee-reverse' : 'animate-marquee'
      )}
    >
      {[...items, ...items].map((tool, i) => (
        <div
          key={`${tool.name}-${i}`}
          className={cn(
            'mr-3 flex shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-border/60 bg-background p-3 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg',
            size === 'lg' ? 'h-32 w-36' : 'h-28 w-28'
          )}
        >
          <img src={tool.icon} alt={tool.name} loading="lazy" className="h-11 w-11 object-contain" />
          <span className="text-center text-[11px] font-medium leading-tight text-foreground/75">{tool.name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default Marquee;
