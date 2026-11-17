import React, { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Mail, Github, Linkedin, Sparkles } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { ScrollItem, MotionSurface } from '@/components/fx/PageMotion.jsx';
import { cn } from '@/lib/utils';

const getLinks = (member) => {
  const links = [];
  if (member.linkedin) {
    links.push({ href: member.linkedin, label: 'LinkedIn', icon: Linkedin });
  }
  if (member.github) {
    links.push({ href: member.github, label: 'GitHub', icon: Github });
  }
  if (member.email) {
    links.push({
      href: member.emailInactive ? undefined : `mailto:${member.email}`,
      label: 'Correo',
      icon: Mail,
      inactive: Boolean(member.emailInactive),
    });
  }
  return links;
};

const TeamSpotlight = ({ team }) => {
  const [open, setOpen] = useState(false);
  const [member, setMember] = useState(null);

  const openMember = (m) => {
    setMember(m);
    setOpen(true);
  };

  return (
    <LayoutGroup id="team-profiles">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {team.map((m, index) => (
          <ScrollItem key={m.id} index={index}>
            <MotionSurface className="group cursor-pointer p-8" interactive>
              <button
                type="button"
                onClick={() => openMember(m)}
                className="flex w-full flex-col items-center text-center outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
              >
                <div className="mb-6 h-32 w-32 overflow-hidden rounded-full ring-4 ring-primary/25 transition-all duration-300 group-hover:ring-primary/60">
                  <motion.img
                    layoutId={`team-photo-${m.id}`}
                    transition={{ type: 'spring', stiffness: 280, damping: 32 }}
                    src={m.photo}
                    alt={m.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-display text-xl font-bold text-black">{m.name}</h3>
                <span className="mt-1 text-sm font-medium text-black/75">{m.role}</span>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{m.description}</p>
                <span className="mono-label mt-5 inline-flex items-center gap-1.5 text-black/55 group-hover:text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Ver perfil
                </span>
              </button>
            </MotionSurface>
          </ScrollItem>
        ))}
      </div>

      <p className="mono-label mt-8 text-center text-black/55">
        ↳ Toca un perfil para ampliar la información
      </p>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-secondary/50 backdrop-blur-md transition-opacity duration-500 data-[state=open]:opacity-100 data-[state=closed]:opacity-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,52rem)] -translate-x-1/2 -translate-y-1/2 outline-none">
            <AnimatePresence mode="wait">
              {member && (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.86, filter: 'blur(14px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.94, filter: 'blur(10px)' }}
                  transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                  className="glass overflow-hidden rounded-[1.75rem] border border-white/20 shadow-2xl"
                >
                  <div className="grid md:grid-cols-[42%_58%]">
                    <div className="relative min-h-[220px] bg-secondary md:min-h-[340px]">
                      <motion.img
                        layoutId={`team-photo-${member.id}`}
                        transition={{ type: 'spring', stiffness: 280, damping: 32 }}
                        src={member.photo}
                        alt={member.name}
                        className="absolute inset-0 h-full w-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-secondary/20" />
                    </div>
                    <div className="p-6 text-secondary-foreground md:p-8">
                      <Dialog.Title className="font-display text-2xl font-bold tracking-tight">{member.name}</Dialog.Title>
                      <p className="mono-label mt-2 text-primary">{member.role}</p>
                      <Dialog.Description className="mt-5 text-base leading-relaxed text-white/78">
                        {member.description}
                      </Dialog.Description>
                      <div className="mt-8 flex flex-wrap gap-3">
                        {getLinks(member).map((link) => {
                          const Icon = link.icon;
                          const pillClass =
                            'inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 text-sm font-medium text-white transition-colors';

                          if (link.inactive) {
                            return (
                              <span
                                key={link.label}
                                role="presentation"
                                aria-hidden={false}
                                className={cn(pillClass, 'cursor-default opacity-55 pointer-events-none')}
                              >
                                <Icon className="h-4 w-4" />
                                {link.label}
                              </span>
                            );
                          }

                          return (
                            <a
                              key={link.label}
                              href={link.href}
                              target={link.label === 'Correo' ? undefined : '_blank'}
                              rel="noopener noreferrer"
                              className={cn(
                                pillClass,
                                'hover:border-primary hover:bg-primary hover:text-primary-foreground'
                              )}
                            >
                              <Icon className="h-4 w-4" />
                              {link.label}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <Dialog.Close
                    className={cn(
                      'absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full',
                      'border border-white/25 bg-black/30 text-white transition-colors hover:bg-primary hover:text-primary-foreground'
                    )}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Cerrar</span>
                  </Dialog.Close>
                </motion.div>
              )}
            </AnimatePresence>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </LayoutGroup>
  );
};

export default TeamSpotlight;