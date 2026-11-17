import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CalendarCheck, CheckCircle2, Handshake, Mail, MapPin, Phone, Plus, TrendingUp } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ServiceSheet from '@/components/mobile/ServiceSheet.jsx';
import DataField from '@/components/fx/DataField.jsx';
import SectionRail from '@/components/fx/SectionRail.jsx';
import ParallaxImage from '@/components/fx/ParallaxImage.jsx';
import CountUp from '@/components/fx/CountUp.jsx';
import Magnetic from '@/components/fx/Magnetic.jsx';
import { Reveal, ScrollFill, SplitText } from '@/components/fx/Reveal.jsx';
import ProblemFlipCard from '@/components/home/ProblemFlipCard.jsx';
import ServiceTile from '@/components/home/ServiceTile.jsx';
import Marquee from '@/components/home/Marquee.jsx';
import MethodologyPinned from '@/components/home/MethodologyPinned.jsx';
import { BENEFIT_ICONS, PIPELINE_ORDER, PROBLEM_TO_SERVICE, SECTIONS, TOOLS_BOTTOM, TOOLS_TOP } from '@/components/home/data.js';
import { useContent } from '@/contexts/useContent';
import { cn } from '@/lib/utils';
import { splitCategory, waLink } from '@/lib/mobile';

const Eyebrow = ({ children, tone = 'light' }) => (
  <p
    className={cn(
      'mono-label mb-5 flex items-center gap-3 font-medium',
      tone === 'dark' ? 'text-white/70' : tone === 'primary' ? 'text-black/65' : 'text-foreground/55'
    )}
  >
    <span className={cn('h-px w-10', tone === 'primary' ? 'bg-black/60' : 'bg-primary')} />
    {children}
  </p>
);

const SectionTitle = ({ eyebrow, title, subtitle, tone = 'light', align = 'left', className }) => (
  <div className={cn('mb-14 max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
    <Reveal>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
    </Reveal>
    <h2
      className={cn(
        'font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-[3.4rem]',
        tone === 'dark' ? 'text-white' : tone === 'primary' ? 'text-black' : 'text-foreground'
      )}
    >
      <SplitText text={title} />
    </h2>
    {subtitle && (
      <Reveal delay={0.25}>
        <p
          className={cn(
            'mt-5 text-lg leading-relaxed md:text-xl',
            tone === 'dark' ? 'text-white/70' : tone === 'primary' ? 'text-black/70' : 'text-muted-foreground'
          )}
        >
          {subtitle}
        </p>
      </Reveal>
    )}
  </div>
);

/* ───────────── Hero: campo de datos + "ruta del dato" ───────────── */

const DataRoute = ({ services, onPick }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
    className="hidden lg:block"
  >
    <div className="animate-float">
      <div className="glass relative rounded-[2rem] p-7">
        <p className="mono-label mb-6 flex items-center gap-2 text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(255,195,15,1)]" />
          La ruta del dato
        </p>

        <div className="relative">
          {/* hilo con flujo */}
          <span aria-hidden className="absolute bottom-6 left-[19px] top-6 w-px overflow-hidden bg-white/15">
            <span className="absolute left-0 top-0 h-10 w-px animate-flow bg-gradient-to-b from-transparent via-primary to-transparent" />
          </span>

          <ul className="space-y-1.5">
            {services.map((s, i) => {
              const { name } = splitCategory(s.category);
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => onPick(s)}
                    className="group relative flex w-full items-center gap-4 rounded-2xl p-2.5 text-left transition-colors hover:bg-white/10"
                  >
                    <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary font-display text-sm font-bold text-primary ring-1 ring-primary/60 transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                      {i + 1}
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-base font-bold text-white">{name}</span>
                      <span className="block text-[13px] leading-snug text-white/65">{s.hook}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-white/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  </motion.div>
);

const Hero = ({ hero, services, onPick }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="inicio" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-36">
      <motion.div style={{ y, opacity }} className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mono-label glass-soft mb-7 inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-white/85"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Transformamos datos en decisiones estratégicas
          </motion.p>

          <h1>
            <SplitText
              text={hero.title1}
              inView={false}
              delay={0.2}
              className="block font-display text-2xl font-semibold text-primary md:text-3xl"
            />
            <SplitText
              text={hero.title2}
              inView={false}
              delay={0.4}
              className="mt-3 block font-display text-5xl font-bold leading-[1.02] tracking-tight text-white lg:text-[4.1rem]"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.25 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Link
                to="/contacto"
                className="flex h-14 items-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_10px_40px_-8px_rgba(255,195,15,0.8)] transition-transform hover:scale-[1.03]"
              >
                Agendar Consulta
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                to="/servicios"
                className="glass flex h-14 items-center rounded-full px-7 text-base font-medium text-white transition-colors hover:bg-white/15"
              >
                Ver Portafolio
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                to="/partners"
                className="glass flex h-14 items-center rounded-full px-7 text-base font-medium text-white transition-colors hover:bg-white/15"
              >
                Ser Partner
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <DataRoute services={services} onPick={onPick} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 md:flex"
      >
        <span className="mono-label">Desliza</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/20">
          <span className="absolute left-0 top-0 h-4 w-px animate-flow bg-primary" />
        </span>
      </motion.div>
    </section>
  );
};

/* ───────────── Manifiesto (texto que se llena al hacer scroll) ───────────── */

const Manifesto = ({ subtitle }) => (
  <section className="relative px-6 pb-36 pt-16 lg:px-8">
    <div className="mx-auto max-w-6xl">
      <Reveal>
        <Eyebrow tone="dark">DOMAKEA</Eyebrow>
      </Reveal>
      <ScrollFill
        text="Transformamos datos en decisiones estratégicas para impulsar el crecimiento de tu negocio."
        className="font-display text-4xl font-bold leading-[1.12] tracking-tight text-white md:text-6xl lg:text-[4.4rem]"
      />
      <Reveal delay={0.1}>
        <p className="mt-10 max-w-2xl border-l-2 border-primary pl-5 text-lg leading-relaxed text-white/65">{subtitle}</p>
      </Reveal>
    </div>
  </section>
);

/* ───────────── Retos ───────────── */

const Challenges = ({ problems, services, onGoToService }) => (
  <section id="retos" className="relative bg-background px-6 py-28 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <SectionTitle
        eyebrow="Diagnóstico rápido"
        title="¿Te identificas con alguno de estos problemas?"
        subtitle="No estás solo. Los hemos resuelto antes y podemos resolverlos contigo."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {problems.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.12}>
            <ProblemFlipCard
              item={item}
              index={i}
              total={problems.length}
              service={services.find((s) => s.id === PROBLEM_TO_SERVICE[item.id])}
              onOpenService={onGoToService}
              heightClass="h-[360px]"
            />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────── Servicios ───────────── */

const Services = ({ services, onOpen, highlightId }) => (
  <section id="servicios" className="relative bg-primary px-6 py-28 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <SectionTitle
        tone="primary"
        eyebrow="Qué hacemos"
        title="Nuestros servicios"
        subtitle="Soluciones integrales para impulsar el crecimiento de tu empresa. Elige una tarjeta para ver el detalle."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
        {services.map((s, i) => (
          <Reveal
            key={s.id}
            delay={(i % 3) * 0.1}
            className={cn(i < 3 ? 'lg:col-span-2' : 'lg:col-span-3', i === services.length - 1 && 'md:col-span-2 lg:col-span-3')}
          >
            <ServiceTile service={s} index={i} onOpen={onOpen} highlighted={highlightId === s.id} className="h-full" />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12 text-center">
        <Magnetic>
          <Link
            to="/servicios"
            className="inline-flex h-14 items-center gap-2 rounded-full bg-secondary px-8 font-semibold text-secondary-foreground transition-transform hover:scale-[1.03]"
          >
            Ver todos los servicios
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Magnetic>
      </Reveal>
    </div>
  </section>
);

/* ───────────── Por qué DOMAKEA ───────────── */

const Benefits = ({ benefits }) => {
  const list = benefits.slice(0, 6);
  const [open, setOpen] = useState(0);
  const current = list[open] || list[0];
  const CurrentIcon = current ? BENEFIT_ICONS[current.icon] || CheckCircle2 : CheckCircle2;

  return (
    <section id="porque" className="relative bg-background px-6 py-28 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionTitle
            eyebrow="Nuestro enfoque"
            title="Por qué elegir DOMAKEA"
            subtitle="Nuestro enfoque diferenciador para tu éxito empresarial"
            className="mb-10"
          />
          <ul className="divide-y divide-border border-y border-border">
            {list.map((b, i) => {
              const on = i === open;
              return (
                <li key={b.id}>
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    onMouseEnter={() => setOpen(i)}
                    aria-expanded={on}
                    className="flex w-full items-center gap-5 py-5 text-left"
                  >
                    <span className={cn('mono-label w-8 transition-colors', on ? 'text-primary' : 'text-foreground/35')}>
                      0{i + 1}
                    </span>
                    <span
                      className={cn(
                        'flex-1 font-display text-xl font-bold tracking-tight transition-all duration-300 md:text-2xl',
                        on ? 'translate-x-1 text-foreground' : 'text-foreground/45'
                      )}
                    >
                      {b.title}
                    </span>
                    <span
                      className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300',
                        on ? 'rotate-45 border-primary bg-primary text-primary-foreground' : 'border-border text-foreground/50'
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pl-[3.25rem] pr-12 text-base leading-relaxed text-muted-foreground">{b.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <ParallaxImage src="/us_us.png" alt="Equipo DOMAKEA" className="h-[560px] rounded-[2rem]" strength={9}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-5 bottom-5">
              <AnimatePresence mode="wait" initial={false}>
                {current && (
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                    transition={{ duration: 0.3 }}
                    className="glass flex items-start gap-4 rounded-3xl p-5 text-white"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                      <CurrentIcon className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="font-display text-lg font-bold leading-tight">{current.title}</p>
                      <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-white/75">{current.description}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ParallaxImage>
        </Reveal>
      </div>
    </section>
  );
};

/* ───────────── Herramientas ───────────── */

const Tools = () => (
  <section id="herramientas" className="relative overflow-hidden bg-muted py-24">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <SectionTitle
        eyebrow="Stack"
        title="Herramientas que dominamos"
        subtitle="Tecnología de punta para entregar resultados medibles"
        align="center"
      />
    </div>
    <div className="space-y-3">
      <Marquee items={TOOLS_TOP} size="lg" />
      <Marquee items={TOOLS_BOTTOM} reverse size="lg" />
    </div>
  </section>
);

/* ───────────── Casos de éxito ───────────── */

const Cases = ({ portfolio }) => (
  <section id="casos" className="relative bg-background px-6 py-28 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionTitle
          eyebrow="Resultados reales"
          title="Casos de éxito"
          subtitle="Resultados reales de empresas que confiaron en nuestras estrategias basadas en datos"
        />
        <Reveal className="mb-14">
          <Link
            to="/portafolio"
            className="group inline-flex items-center gap-2 font-semibold text-foreground"
          >
            Ver todos los casos
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:rotate-45">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </Link>
        </Reveal>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {portfolio.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.1}>
            <Link to="/portafolio" className="group block">
              <ParallaxImage src={p.image} alt={p.title} className="h-[440px] rounded-3xl" strength={8}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="font-display text-xl font-bold leading-tight">{p.title}</h3>
                  <p className="mt-1 text-xs text-white/70">{p.client}</p>
                  <div className="mt-4 grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <div className="space-y-2 border-t border-white/20 pt-4">
                        {p.results.map((r, k) => (
                          <div key={k} className="flex items-baseline justify-between gap-3">
                            <span className="text-xs text-white/70">{r.metric}</span>
                            <span className="font-display text-lg font-bold text-primary">{r.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute right-4 top-4 rounded-2xl bg-primary px-3 py-2 text-primary-foreground shadow-lg">
                  <div className="font-display text-2xl font-extrabold leading-none">
                    <CountUp value={p.results[0].value} />
                  </div>
                  <div className="mt-1 max-w-[120px] text-[10px] font-medium leading-tight">{p.results[0].metric}</div>
                </div>
              </ParallaxImage>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────── CTA final ───────────── */

const FinalCta = () => (
  <section id="contacto" className="relative overflow-hidden bg-secondary px-6 py-36 text-center lg:px-8">
    <DataField density={0.7} />
    <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 blur-3xl" />
    <div className="relative mx-auto max-w-4xl">
      <Reveal>
        <span className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-[0_0_60px_rgba(255,195,15,0.55)]">
          <TrendingUp className="h-10 w-10" />
        </span>
      </Reveal>
      <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
        <SplitText text="Impulsa el crecimiento de tu negocio con nosotros" />
      </h2>
      <Reveal delay={0.2}>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
          Agenda una consulta gratuita y descubre cómo podemos ayudarte a alcanzar tus objetivos empresariales con
          estrategias basadas en datos reales.
        </p>
      </Reveal>
      <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Magnetic>
          <a
            href={waLink('Hola DOMAKEA, quiero agendar una consulta gratuita.')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-16 items-center gap-3 rounded-full bg-primary px-10 text-lg font-semibold text-primary-foreground shadow-[0_12px_50px_-8px_rgba(255,195,15,0.85)] transition-transform hover:scale-[1.04]"
          >
            <CalendarCheck className="h-5 w-5" />
            Agendar Consulta Gratuita
          </a>
        </Magnetic>
        <Magnetic>
          <Link to="/partners" className="glass flex h-16 items-center gap-2 rounded-full px-8 text-base font-medium text-white hover:bg-white/15">
            <Handshake className="h-5 w-5 text-primary" />
            Quiero ser partner
          </Link>
        </Magnetic>
      </Reveal>
      <Reveal delay={0.4} className="mt-12 flex flex-wrap items-center justify-center gap-3 text-sm text-white/80">
        <a href="mailto:domakea.cons@gmail.com" className="glass-soft flex items-center gap-2 rounded-full px-5 py-2.5 hover:bg-white/15">
          <Mail className="h-4 w-4 text-primary" /> domakea.cons@gmail.com
        </a>
        <a href="tel:+573018547895" className="glass-soft flex items-center gap-2 rounded-full px-5 py-2.5 hover:bg-white/15">
          <Phone className="h-4 w-4 text-primary" /> +57 3018547895
        </a>
        <span className="glass-soft flex items-center gap-2 rounded-full px-5 py-2.5">
          <MapPin className="h-4 w-4 text-primary" /> Bogotá, Colombia
        </span>
      </Reveal>
    </div>
  </section>
);

/* ───────────── Página ───────────── */

const DesktopHome = () => {
  const { content } = useContent();
  const [sheet, setSheet] = useState({ service: null, open: false });
  const [highlightId, setHighlightId] = useState(null);

  const openService = (service) => setSheet({ service, open: true });

  // Desde un reto o desde la "ruta del dato": viaja a Servicios y resalta la tarjeta correspondiente.
  const goToService = (service) => {
    document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setHighlightId(service.id);
    window.setTimeout(() => setHighlightId(null), 3600);
  };

  const pipeline = PIPELINE_ORDER.map((id) => content.services.find((s) => s.id === id)).filter(Boolean);

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
        {/* Hero + manifiesto comparten el mismo campo de datos: el hilo no se corta entre secciones */}
        <div className="relative isolate overflow-hidden bg-[hsl(240_13%_9%)]">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_35%,hsl(240_13%_21%),hsl(240_13%_9%)_70%)]" />
          <div className="absolute -bottom-40 -left-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-primary/15 blur-3xl" />
          <DataField className="-z-10" />
          <Hero hero={content.hero} services={pipeline} onPick={goToService} />
          <Manifesto subtitle={content.hero.subtitle} />
        </div>

        <Challenges problems={content.problems} services={content.services} onGoToService={goToService} />
        <Services services={content.services} onOpen={openService} highlightId={highlightId} />
        <Benefits benefits={content.benefits} />
        <Tools />
        <MethodologyPinned SectionTitle={SectionTitle} />
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

export default DesktopHome;
