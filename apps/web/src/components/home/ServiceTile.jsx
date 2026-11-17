import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import TiltCard from '@/components/fx/TiltCard.jsx';
import { haptic, splitCategory } from '@/lib/mobile';
import { cn } from '@/lib/utils';

/** Tarjeta de servicio (inclinación 3D + brillo). `highlighted` la resalta cuando se llega desde un reto. */
const ServiceTile = ({ service, index, onOpen, highlighted = false, className }) => {
  const { name, tag } = splitCategory(service.category);
  const from = service.totalPrice?.split('—')[0]?.trim();

  return (
    <TiltCard className={cn('rounded-3xl', className)} max={6}>
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          haptic(10);
          onOpen(service);
        }}
        className={cn(
          'relative flex h-full min-h-[380px] w-full flex-col overflow-hidden rounded-3xl bg-secondary p-6 text-left text-secondary-foreground shadow-xl shadow-black/15 transition-shadow duration-500 md:p-8',
          highlighted && 'shadow-[0_0_0_3px_hsl(45_100%_53%),0_0_60px_8px_hsl(45_100%_53%/0.55)]'
        )}
      >
        <span className="pointer-events-none absolute -right-3 -top-5 select-none font-display text-[8rem] font-extrabold leading-none text-white/[0.06]">
          0{index + 1}
        </span>
        {tag && (
          <span className="mono-label mb-3 w-fit rounded-full bg-primary/15 px-2.5 py-1 text-primary">{tag}</span>
        )}
        <h3 className="font-display text-[1.9rem] font-bold leading-none tracking-tight">{name}</h3>
        {service.hook && <p className="mt-2 text-sm italic text-primary">{service.hook}</p>}
        <p className="mt-4 line-clamp-6 text-sm leading-relaxed text-white/70">{service.shortDescription}</p>

        <div className="mt-auto flex items-end justify-between pt-6">
          <div>
            {from && (
              <>
                <p className="mono-label text-white/45">Desde</p>
                <p className="font-display text-base font-bold text-white">
                  {from} <span className="text-[10px] font-normal text-white/50">COP</span>
                </p>
              </>
            )}
          </div>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover/tilt:rotate-45">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
      </motion.button>
    </TiltCard>
  );
};

export default ServiceTile;
