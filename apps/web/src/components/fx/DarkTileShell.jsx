import React from 'react';
import SpotlightCard from '@/components/fx/SpotlightCard.jsx';
import { cn } from '@/lib/utils';

/** Contenedor oscuro del Home (servicios) + linterna, sin tilt. */
const DarkTileShell = ({ children, index, className, innerClassName }) => (
  <SpotlightCard className={cn('rounded-3xl', className)}>
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl bg-secondary text-secondary-foreground shadow-xl shadow-black/15',
        'transition-[background-color,box-shadow] duration-500',
        'group-hover/spot:bg-[hsl(240_13%_21%)] group-hover/spot:shadow-[0_26px_72px_-18px_rgba(0,0,0,0.55)]',
        innerClassName
      )}
    >
      {index != null && (
        <span
          aria-hidden
          className="pointer-events-none absolute -right-3 -top-5 select-none font-display text-[8rem] font-extrabold leading-none text-white/[0.06]"
        >
          0{index + 1}
        </span>
      )}
      {children}
    </div>
  </SpotlightCard>
);

export default DarkTileShell;