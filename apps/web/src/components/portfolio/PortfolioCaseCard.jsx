import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import DarkTileShell from '@/components/fx/DarkTileShell.jsx';

/** Caso de éxito — misma piel que servicios del Home; fila completa opcional. */
const PortfolioCaseCard = ({ project, index, layout = 'stack' }) => {
  const clientParts = project.client?.split('·') || [];
  const tag = clientParts[0]?.trim();
  const hook = clientParts.slice(1).join('·').trim();
  const isRow = layout === 'row';

  const metrics = (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {project.results.map((result) => (
        <div key={result.metric} className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur-sm">
          <div className="font-display text-xl font-bold text-primary md:text-2xl">{result.value}</div>
          <div className="mt-1 text-[11px] leading-snug text-white/60">{result.metric}</div>
        </div>
      ))}
    </div>
  );

  const testimonial = (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm italic text-white/75 md:text-base">"{project.testimonial}"</p>
      <p className="mono-label mt-2 text-white/45">— {project.testimonialAuthor}</p>
    </div>
  );

  if (isRow) {
    return (
      <DarkTileShell index={index} className="w-full">
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
          <div className="relative min-h-[240px] overflow-hidden lg:min-h-[320px]">
            <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/25 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-secondary/40" />
            <div className="absolute inset-x-0 bottom-0 p-6 lg:hidden">
              <h3 className="font-display text-2xl font-bold text-white">{project.title}</h3>
            </div>
          </div>
          <div className="flex flex-col p-6 md:p-8 lg:p-10">
            {tag && (
              <span className="mono-label mb-3 w-fit rounded-full bg-primary/15 px-2.5 py-1 text-primary">{tag}</span>
            )}
            <h3 className="hidden font-display text-2xl font-bold tracking-tight text-white md:text-3xl lg:block">{project.title}</h3>
            {hook && <p className="mt-2 text-sm italic text-primary">{hook}</p>}
            <p className="mt-4 text-base leading-relaxed text-white/70">{project.description}</p>
            <div className="mt-6 space-y-6">
              {metrics}
              {testimonial}
            </div>
            <div className="mt-6 flex justify-end">
              <span
                aria-hidden
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover/spot:rotate-45"
              >
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>
          </div>
        </div>
      </DarkTileShell>
    );
  }

  return (
    <DarkTileShell index={index} innerClassName="flex min-h-[420px] flex-col p-6 md:min-h-[460px] md:p-8">
      <div className="relative mb-5 h-44 overflow-hidden rounded-2xl ring-1 ring-white/10 md:h-52">
        <img src={project.image} alt={project.title} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent" />
      </div>
      {tag && <span className="mono-label mb-3 w-fit rounded-full bg-primary/15 px-2.5 py-1 text-primary">{tag}</span>}
      <h3 className="font-display text-[1.65rem] font-bold leading-tight tracking-tight md:text-[1.9rem]">{project.title}</h3>
      {hook && <p className="mt-2 text-sm italic text-primary">{hook}</p>}
      <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-white/70 md:line-clamp-5">{project.description}</p>
      <div className="mt-5">{metrics}</div>
      <div className="mt-auto flex items-end justify-between gap-4 pt-6">
        <div className="min-w-0 flex-1">{testimonial}</div>
        <span
          aria-hidden
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover/spot:rotate-45"
        >
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>
    </DarkTileShell>
  );
};

export default PortfolioCaseCard;