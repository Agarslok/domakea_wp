import React from 'react';
import { cn } from '@/lib/utils';
import { Reveal, SplitText } from '@/components/fx/Reveal.jsx';

export const PageEyebrow = ({ children, align = 'center', className }) => (
  <Reveal y={14}>
    <p
      className={cn(
        'mono-label mb-4 flex items-center gap-3 text-foreground/55',
        align === 'center' && 'justify-center',
        className
      )}
    >
      <span className="h-px w-8 shrink-0 bg-primary" />
      {children}
      <span className="h-px w-8 shrink-0 bg-primary" />
    </p>
  </Reveal>
);

/** Encabezado de sección con título palabra por palabra (mismo lenguaje que el Home). */
export const PageSectionHeader = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
  subtitleClassName,
}) => (
  <div className={cn('mb-12 md:mb-16', align === 'center' && 'mx-auto max-w-3xl text-center', className)}>
    {eyebrow && <PageEyebrow align={align}>{eyebrow}</PageEyebrow>}
    <h2
      className={cn(
        'font-display text-3xl font-bold leading-[1.08] tracking-tight md:text-4xl lg:text-[2.75rem]',
        titleClassName
      )}
    >
      <SplitText text={title} />
    </h2>
    {subtitle && (
      <Reveal delay={0.2} className="mt-5">
        <p className={cn('text-lg leading-relaxed text-muted-foreground md:text-xl', subtitleClassName)}>{subtitle}</p>
      </Reveal>
    )}
  </div>
);

/** Bloque que entra al hacer scroll; `index` reparte los retardos. */
export const ScrollItem = ({ children, index = 0, className, y = 38, delayStep = 0.08 }) => (
  <Reveal delay={index * delayStep} y={y} className={className}>
    {children}
  </Reveal>
);

/** Recuadro redondeado con elevación al hover (servicios, partners, equipo). */
export const MotionSurface = ({ children, className, interactive = true }) => (
  <div
    className={cn(
      'rounded-3xl border border-border/60 bg-card shadow-sm',
      interactive &&
        'transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10',
      className
    )}
  >
    {children}
  </div>
);