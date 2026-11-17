import React, { useCallback, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Handshake,
  Mail,
  MapPin,
  Phone,
  TrendingUp,
} from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ServiceSheet from '@/components/mobile/ServiceSheet.jsx';
import DataField from '@/components/fx/DataField.jsx';
import SectionRail from '@/components/fx/SectionRail.jsx';
import ParallaxImage from '@/components/fx/ParallaxImage.jsx';
import CountUp from '@/components/fx/CountUp.jsx';
import { Reveal, SplitText } from '@/components/fx/Reveal.jsx';
import ProblemFlipCard from '@/components/home/ProblemFlipCard.jsx';
import ServiceTile from '@/components/home/ServiceTile.jsx';
import Marquee from '@/components/home/Marquee.jsx';
import { BENEFIT_ICONS, METHODOLOGY, PROBLEM_TO_SERVICE, SECTIONS, TOOLS_BOTTOM, TOOLS_TOP } from '@/components/home/data.js';
import { useContent } from '@/contexts/useContent';
import { cn } from '@/lib/utils';
import { haptic, waLink } from '@/lib/mobile';

/* ═════════════════════════ Utilidades de UI ═════════════════════════ */

const SectionHeader = ({ eyebrow, title, subtitle, tone = 'light' }) => {
  const tones = {
    light: { eyebrow: 'text-foreground/55', title: 'text-foreground', sub: 'text-muted-foreground' },
    dark: { eyebrow: 'text-white/60', title: 'text-white', sub: 'text-white/70' },
    primary: { eyebrow: 'text-black/60', title: 'text-black', sub: 'text-black/70' },
  }[tone];

  return (
    <div className="mb-8 px-5">
      {eyebrow && (
        <Reveal>
          <p className={cn('mono-label mb-3 flex items-center gap-3 font-medium', tones.eyebrow)}>
            <span className={cn('h-px w-8', tone === 'primary' ? 'bg-black/60' : 'bg-primary')} />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <h2 className={cn('font-display text-[1.75rem] font-bold leading-[1.1] tracking-tight', tones.title)}>
        <SplitText text={title} />
      </h2>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className={cn('mt-3 text-[15px] leading-relaxed', tones.sub)}>{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
};

/** Carrusel horizontal con scroll-snap nativo + puntos de paginación. */
const SnapCarousel = ({ children, tone = 'light' }) => {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const items = React.Children.toArray(children);

  const getStep = () => {
    const el = ref.current;
    const first = el?.children[0];
    if (!el || !first) return 1;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return first.offsetWidth + gap;
  };

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / getStep());
    setActive(Math.max(0, Math.min(items.length - 1, idx)));
  };

  const goTo = (i) => {
    haptic();
    ref.current?.scrollTo({ left: i * getStep(), behavior: 'smooth' });
  };

  const dotOn = tone === 'primary' ? 'bg-black' : 'bg-primary';
  const dotOff = tone === 'primary' ? 'bg-black/25' : tone === 'dark' ? 'bg-white/25' : 'bg-foreground/20';

  return (
    <div>
      <div
        ref={ref}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2"
      >
        {items}
      </div>
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir a la tarjeta ${i + 1}`}
            onClick={() => goTo(i)}
            className={cn('h-1.5 rounded-full transition-all duration-300', i === active ? `w-6 ${dotOn}` : `w-1.5 ${dotOff}`)}
          />
        ))}
      </div>
    </div>
  );
};

/* ═════════════════════════ 1 · Hero (campo de datos que sigue tu dedo) ═════════════════════════ */

const Hero = ({ hero }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-[hsl(240_13%_9%)] text-white"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_30%,hsl(240_13%_21%),hsl(240_13%_9%)_72%)]" />
      <div className="absolute -bottom-24 -left-24 -z-10 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
      <DataField className="-z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-black/70 to-transparent" />

      <motion.div style={{ opacity: contentOpacity, y: contentY }} className="relative z-10 w-full px-5 pb-32 pt-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mono-label glass-soft mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-white/85"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Datos → Decisiones
        </motion.p>

        <h1 className="text-balance">
          <SplitText
            text={hero.title1}
            inView={false}
            delay={0.2}
            className="block font-display text-xl font-semibold text-primary"
          />
          <SplitText
            text={hero.title2}
            inView={false}
            delay={0.35}
            className="mt-2 block font-display text-[1.75rem] font-bold leading-[1.1] tracking-tight"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="mt-4 text-[15px] leading-relaxed text-white/80"
        >
          {hero.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mono-label mt-4 text-primary/80"
        >
          ↳ Mueve el dedo: conecta los datos
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-6 space-y-3"
        >
          <Link
            to="/contacto"
            onClick={() => haptic(12)}
            className="flex h-14 items-center justify-center gap-2 rounded-full bg-primary text-base font-semibold text-primary-foreground shadow-[0_10px_40px_-8px_rgba(255,195,15,0.8)] transition-transform active:scale-[0.97]"
          >
            Agendar consulta
            <ArrowRight className="h-5 w-5" />
          </Link>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/servicios"
              onClick={() => haptic()}
              className="glass flex h-12 items-center justify-center rounded-full text-sm font-medium transition-transform active:scale-[0.97]"
            >
              Ver portafolio
            </Link>
            <Link
              to="/partners"
              onClick={() => haptic()}
              className="glass flex h-12 items-center justify-center rounded-full text-sm font-medium transition-transform active:scale-[0.97]"
            >
              Ser partner
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ═════════════════════════ 2 · Retos ═════════════════════════ */

const Challenges = ({ problems, services, onOpenService }) => (
  <section id="retos" className="scroll-mt-14 bg-background py-16">
    <SectionHeader
      eyebrow="Diagnóstico rápido"
      title="¿Te identificas con alguno de estos problemas?"
      subtitle="No estás solo. Los hemos resuelto antes y podemos resolverlos contigo."
    />
    <SnapCarousel>
      {problems.map((item, i) => (
        <ProblemFlipCard
          key={item.id}
          item={item}
          index={i}
          total={problems.length}
          service={services.find((s) => s.id === PROBLEM_TO_SERVICE[item.id])}
          onOpenService={onOpenService}
          className="w-[84%] shrink-0 snap-start"
        />
      ))}
    </SnapCarousel>
  </section>
);

/* ═════════════════════════ 3 · Servicios ═════════════════════════ */

const Services = ({ services, onOpen }) => (
  <section id="servicios" className="scroll-mt-14 bg-primary py-16">
    <SectionHeader
      tone="primary"
      eyebrow="Qué hacemos"
      title="Nuestros servicios"
      subtitle="Soluciones integrales para impulsar el crecimiento de tu empresa. Toca una tarjeta para ver el detalle."
    />
    <SnapCarousel tone="primary">
      {services.map((s, i) => (
        <ServiceTile key={s.id} service={s} index={i} onOpen={onOpen} className="w-[82%] shrink-0 snap-start" />
      ))}
    </SnapCarousel>
    <div className="mt-8 px-5">
      <Link
        to="/servicios"
        onClick={() => haptic()}
        className="flex h-12 items-center justify-center gap-2 rounded-full bg-secondary text-sm font-semibold text-secondary-foreground transition-transform active:scale-[0.97]"
      >
        Ver todos los servicios
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </section>
);

/* ═════════════════════════ 4 · Por qué DOMAKEA ═════════════════════════ */

const Benefits = ({ benefits }) => {
  const [selected, setSelected] = useState(0);
  const list = benefits.slice(0, 6);
  const current = list[selected] || list[0];
  const CurrentIcon = current ? BENEFIT_ICONS[current.icon] || CheckCircle2 : CheckCircle2;

  return (
    <section id="porque" className="scroll-mt-14 bg-background py-16">
      <SectionHeader
        eyebrow="Nuestro enfoque"
        title="Por qué elegir DOMAKEA"
        subtitle="Nuestro enfoque diferenciador para tu éxito empresarial"
      />
      <div className="px-5">
        <Reveal className="mb-5">
          <div className="relative">
            <div className="absolute -inset-1 rounded-[1.35rem] bg-primary/25 blur-sm" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] ring-2 ring-primary/25">
              <img src="/us_us.png" alt="Equipo DOMAKEA" className="h-full w-full object-cover object-[center_22%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
              <span className="absolute bottom-3 left-3 text-sm font-medium text-white">Equipo DOMAKEA</span>
            </div>
          </div>
        </Reveal>
        <div className="grid grid-cols-3 gap-2.5">
          {list.map((b, i) => {
            const Icon = BENEFIT_ICONS[b.icon] || CheckCircle2;
            const on = i === selected;
            return (
              <motion.button
                key={b.id}
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  haptic();
                  setSelected(i);
                }}
                aria-pressed={on}
                className={cn(
                  'flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border p-2 text-center transition-colors duration-300',
                  on
                    ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'border-border bg-muted/60 text-foreground'
                )}
              >
                <Icon className={cn('h-7 w-7', on ? 'text-primary-foreground' : 'text-primary')} />
                <span className="line-clamp-3 text-[11px] font-semibold leading-tight">{b.title}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-4 min-h-[210px] rounded-3xl bg-secondary p-6 text-secondary-foreground">
          <AnimatePresence mode="wait" initial={false}>
            {current && (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15">
                    <CurrentIcon className="h-6 w-6 text-primary" />
                  </span>
                  <h3 className="font-display text-lg font-bold leading-tight">{current.title}</h3>
                </div>
                <p className="text-[15px] leading-relaxed text-white/75">{current.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

/* ═════════════════════════ 5 · Herramientas ═════════════════════════ */

const Tools = () => (
  <section id="herramientas" className="scroll-mt-14 overflow-hidden bg-muted py-16">
    <SectionHeader
      eyebrow="Stack"
      title="Herramientas que dominamos"
      subtitle="Tecnología de punta para entregar resultados medibles"
    />
    <div className="space-y-3">
      <Marquee items={TOOLS_TOP} />
      <Marquee items={TOOLS_BOTTOM} reverse />
    </div>
  </section>
);

/* ═════════════════════════ 6 · Metodología ═════════════════════════ */

const Methodology = () => {
  const [[step, dir], setStep] = useState([0, 1]);
  const last = METHODOLOGY.length - 1;

  const go = useCallback(
    (next) => {
      const clamped = Math.max(0, Math.min(last, next));
      setStep(([cur]) => {
        if (clamped === cur) return [cur, 1];
        haptic();
        return [clamped, clamped > cur ? 1 : -1];
      });
    },
    [last]
  );

  const item = METHODOLOGY[step];

  return (
    <section id="metodologia" className="relative scroll-mt-14 overflow-hidden bg-secondary py-16 text-secondary-foreground">
      <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
      <SectionHeader
        tone="dark"
        eyebrow="Cómo trabajamos"
        title="Nuestra metodología"
        subtitle="Un proceso probado para garantizar resultados sostenibles. Desliza o toca cada paso."
      />

      <div className="relative px-5">
        <div className="relative mb-6 flex items-center justify-between">
          <div className="absolute left-4 right-4 top-1/2 h-0.5 -translate-y-1/2 bg-white/15" />
          <motion.div
            className="absolute left-4 top-1/2 h-0.5 -translate-y-1/2 bg-primary shadow-[0_0_10px_rgba(255,195,15,0.9)]"
            initial={false}
            animate={{ width: `calc((100% - 2rem) * ${step / last})` }}
            transition={{ type: 'spring', stiffness: 160, damping: 24 }}
          />
          {METHODOLOGY.map((m, i) => (
            <button
              key={m.number}
              type="button"
              onClick={() => go(i)}
              aria-label={`Paso ${m.number}: ${m.title}`}
              aria-current={i === step ? 'step' : undefined}
              className={cn(
                'relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300',
                i < step && 'bg-primary text-primary-foreground',
                i === step && 'scale-125 bg-primary text-primary-foreground ring-4 ring-primary/30',
                i > step && 'bg-secondary text-white/60 ring-1 ring-white/25'
              )}
            >
              {i < step ? <CheckCircle2 className="h-4 w-4" /> : m.number}
            </button>
          ))}
        </div>

        <div className="relative min-h-[250px] overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={(_, { offset, velocity }) => {
                if (offset.x < -60 || velocity.x < -450) go(step + 1);
                else if (offset.x > 60 || velocity.x > 450) go(step - 1);
              }}
              initial={{ opacity: 0, x: dir * 70 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -70 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="glass-soft relative flex min-h-[250px] cursor-grab flex-col justify-end overflow-hidden rounded-3xl p-6 active:cursor-grabbing"
            >
              <span className="pointer-events-none absolute right-5 top-3 select-none font-display text-[7rem] font-extrabold leading-none text-primary/15">
                {item.number}
              </span>
              <p className="mono-label mb-2 text-primary">
                Paso {item.number} de {METHODOLOGY.length}
              </p>
              <h3 className="font-display text-3xl font-bold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/75">{item.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => go(step - 1)}
            disabled={step === 0}
            aria-label="Paso anterior"
            className="glass flex h-12 w-12 items-center justify-center rounded-full transition-opacity active:scale-95 disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => (step === last ? go(0) : go(step + 1))}
            className="flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform active:scale-95"
          >
            {step === last ? 'Volver a empezar' : `Siguiente: ${METHODOLOGY[step + 1].title}`}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

/* ═════════════════════════ 7 · Casos de éxito ═════════════════════════ */

const CaseCard = ({ project }) => {
  const [open, setOpen] = useState(false);

  return (
    <article className="w-[86%] shrink-0 snap-start overflow-hidden rounded-3xl border border-border bg-card shadow-lg shadow-black/5">
      <ParallaxImage src={project.image} alt={project.title} kenburns className="h-44" strength={6}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <h3 className="font-display text-lg font-bold leading-tight">{project.title}</h3>
          <p className="text-xs text-white/75">{project.client}</p>
        </div>
      </ParallaxImage>

      <div className="p-4">
        <div className="grid grid-cols-3 gap-2">
          {project.results.map((r, i) => (
            <div key={i} className="rounded-2xl border border-primary/25 bg-primary/10 p-2.5 text-center">
              <div className="font-display text-xl font-extrabold leading-none text-foreground">
                <CountUp value={r.value} />
              </div>
              <div className="mt-1.5 text-[10px] leading-tight text-foreground/65">{r.metric}</div>
            </div>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="mt-4 text-sm leading-relaxed text-foreground/80">{project.description}</p>
              <blockquote className="mt-4 rounded-2xl border-l-4 border-primary bg-muted p-4">
                <p className="text-sm italic leading-relaxed text-foreground/80">“{project.testimonial}”</p>
                <footer className="mt-2 text-xs font-medium text-muted-foreground">— {project.testimonialAuthor}</footer>
              </blockquote>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => {
            haptic();
            setOpen((o) => !o);
          }}
          aria-expanded={open}
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-full bg-secondary py-2.5 text-[13px] font-semibold text-secondary-foreground transition-transform active:scale-[0.98]"
        >
          {open ? 'Ocultar detalle' : 'Ver el caso completo'}
          <ChevronRight className={cn('h-4 w-4 transition-transform', open && '-rotate-90')} />
        </button>
      </div>
    </article>
  );
};

const Cases = ({ portfolio }) => (
  <section id="casos" className="scroll-mt-14 bg-background py-16">
    <SectionHeader
      eyebrow="Resultados reales"
      title="Casos de éxito"
      subtitle="Resultados reales de empresas que confiaron en nuestras estrategias basadas en datos"
    />
    <SnapCarousel>
      {portfolio.map((p) => (
        <CaseCard key={p.id} project={p} />
      ))}
    </SnapCarousel>
    <div className="mt-8 px-5">
      <Link
        to="/portafolio"
        onClick={() => haptic()}
        className="flex h-12 items-center justify-center gap-2 rounded-full border border-foreground/15 text-sm font-semibold transition-transform active:scale-[0.97]"
      >
        Ver todos los casos
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  </section>
);

/* ═════════════════════════ 8 · CTA final ═════════════════════════ */

const FinalCta = () => (
  <section
    id="contacto"
    className="relative isolate scroll-mt-14 overflow-hidden bg-secondary px-5 py-20 text-center text-secondary-foreground"
  >
    <DataField className="-z-10" density={0.8} />
    <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-3xl" />
    <div className="relative">
      <Reveal>
        <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_0_50px_rgba(255,195,15,0.5)]">
          <TrendingUp className="h-8 w-8" />
        </span>
      </Reveal>
      <h2 className="font-display text-[1.8rem] font-bold leading-[1.1] tracking-tight">
        <SplitText text="Impulsa el crecimiento de tu negocio con nosotros" />
      </h2>
      <Reveal delay={0.2}>
        <p className="mt-4 text-[15px] leading-relaxed text-white/75">
          Agenda una consulta gratuita y descubre cómo podemos ayudarte a alcanzar tus objetivos empresariales con
          estrategias basadas en datos reales.
        </p>
      </Reveal>

      <div className="mt-8 space-y-3">
        <a
          href={waLink('Hola DOMAKEA, quiero agendar una consulta gratuita.')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => haptic(14)}
          className="flex h-14 items-center justify-center gap-2 rounded-full bg-primary text-base font-semibold text-primary-foreground shadow-[0_10px_40px_-8px_rgba(255,195,15,0.8)] transition-transform active:scale-[0.97]"
        >
          Agendar Consulta Gratuita
          <ArrowRight className="h-5 w-5" />
        </a>
        <Link
          to="/partners"
          onClick={() => haptic()}
          className="glass flex h-12 items-center justify-center gap-2 rounded-full text-sm font-medium transition-transform active:scale-[0.97]"
        >
          <Handshake className="h-4 w-4 text-primary" />
          Quiero ser partner
        </Link>
      </div>

      <div className="mt-8 grid gap-2 text-left text-sm">
        <a href="mailto:domakea.cons@gmail.com" className="glass-soft flex items-center gap-3 rounded-2xl p-3.5">
          <Mail className="h-4 w-4 shrink-0 text-primary" /> domakea.cons@gmail.com
        </a>
        <a href="tel:+573018547895" className="glass-soft flex items-center gap-3 rounded-2xl p-3.5">
          <Phone className="h-4 w-4 shrink-0 text-primary" /> +57 3018547895
        </a>
        <p className="glass-soft flex items-center gap-3 rounded-2xl p-3.5">
          <MapPin className="h-4 w-4 shrink-0 text-primary" /> Bogotá, Colombia
        </p>
      </div>
    </div>
  </section>
);

/* ═════════════════════════ Página ═════════════════════════ */

const MobileHome = () => {
  const { content } = useContent();
  const [sheet, setSheet] = useState({ service: null, open: false });

  const openService = (service) => setSheet({ service, open: true });

  return (
    <>
      <Helmet>
        <title>DOMAKEA - Transformamos datos en decisiones estratégicas</title>
        <meta
          name="description"
          content="Consultora especializada en análisis de datos, marketing estratégico y desarrollo comercial. Ayudamos a empresas a crecer con estrategias basadas en datos."
        />
      </Helmet>

      <Header />
      <SectionRail sections={SECTIONS} />

      <main>
        <Hero hero={content.hero} />
        <Challenges problems={content.problems} services={content.services} onOpenService={openService} />
        <Services services={content.services} onOpen={openService} />
        <Benefits benefits={content.benefits} />
        <Tools />
        <Methodology />
        <Cases portfolio={content.portfolio} />
        <FinalCta />
      </main>

      <Footer />

      <ServiceSheet
        service={sheet.service}
        open={sheet.open}
        onOpenChange={(open) => setSheet((s) => ({ ...s, open }))}
      />
    </>
  );
};

export default MobileHome;
