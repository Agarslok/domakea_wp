import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import {
  Home,
  Layers,
  BarChart3,
  Users,
  MessageCircle,
  Menu,
  X,
  CalendarCheck,
  Handshake,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  ArrowUpRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { haptic, waLink } from '@/lib/mobile';

const TABS = [
  { name: 'Inicio', path: '/', icon: Home },
  { name: 'Servicios', path: '/servicios', icon: Layers },
  { name: 'Clientes', path: '/portafolio', icon: BarChart3 },
  { name: 'Nosotros', path: '/sobre-nosotros', icon: Users },
  { name: 'Contacto', path: '/contacto', icon: MessageCircle },
];

const MENU_LINKS = [
  { name: 'Inicio', path: '/' },
  { name: 'Servicios', path: '/servicios', hint: 'Portafolio de servicios' },
  { name: 'Clientes', path: '/portafolio', hint: 'Casos de éxito' },
  { name: 'Sobre nosotros', path: '/sobre-nosotros' },
  { name: 'Contacto', path: '/contacto' },
];

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/domakea.cons/',
    icon: <Instagram className="h-5 w-5" />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/domakea/?viewAsMember=true',
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@domakea.cons',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/domakeacons?s=21',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

/* ───────────────────────── Barra superior (vidrio flotante) ───────────────────────── */

export const HERO_ROUTES = ['/', '/servicios', '/portafolio', '/sobre-nosotros', '/contacto', '/partners'];

const MobileTopBar = ({ onMenu }) => {
  const { pathname } = useLocation();
  const hasHero = HERO_ROUTES.includes(pathname);
  const [hidden, setHidden] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });

  // Se esconde al bajar y reaparece al subir (como las barras de iOS).
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > last + 6 && y > 140) setHidden(true);
      else if (y < last - 6 || y < 80) setHidden(false);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className="fixed inset-x-3 top-[calc(env(safe-area-inset-top)+0.75rem)] z-40 md:hidden"
      >
        <div className="glass relative flex h-14 items-center justify-between overflow-hidden rounded-full pl-4 pr-2">
          <Link to="/" aria-label="DOMAKEA - Inicio" onClick={() => haptic()}>
            <img src="/imagologo.png" alt="DOMAKEA" className="-ml-2 h-9 w-auto" />
          </Link>

          <div className="flex items-center gap-2">
            <a
              href={waLink('Hola DOMAKEA, quiero agendar una consulta.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => haptic()}
              className="flex h-10 items-center gap-1.5 rounded-full bg-primary px-3.5 text-[13px] font-semibold text-primary-foreground shadow-[0_4px_18px_-4px_rgba(255,195,15,0.8)] transition-transform active:scale-95"
            >
              <CalendarCheck className="h-4 w-4" />
              Agendar
            </a>
            <button
              type="button"
              onClick={() => {
                haptic();
                onMenu();
              }}
              aria-label="Abrir menú"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-inset ring-white/20 transition-transform active:scale-95"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Progreso de lectura */}
          <motion.div
            aria-hidden
            style={{ scaleX: progress }}
            className="absolute bottom-0 left-6 right-6 h-[2px] origin-left rounded-full bg-primary"
          />
        </div>
      </motion.header>

      {/* Las páginas sin hero necesitan espacio bajo la barra flotante */}
      {!hasHero && (
        <div aria-hidden className="md:hidden" style={{ height: 'calc(5rem + env(safe-area-inset-top))' }} />
      )}
    </>
  );
};

/* ───────────────────────── Barra inferior flotante (vidrio) ───────────────────────── */

const MobileBottomNav = () => {
  const { pathname } = useLocation();
  const isActive = (path) => (path === '/' ? pathname === '/' : pathname.startsWith(path));

  return (
    <nav
      aria-label="Navegación principal"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
    >
      <motion.ul
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 240, damping: 26, delay: 0.2 }}
        className="glass pointer-events-auto mx-auto flex max-w-md items-center rounded-full p-1.5"
      >
        {TABS.map(({ name, path, icon: Icon }) => {
          const active = isActive(path);
          return (
            <li
              key={path}
              className={cn('basis-0 transition-[flex-grow] duration-300 ease-out', active ? 'grow-[2.4]' : 'grow')}
            >
              <Link
                to={path}
                onClick={() => haptic()}
                aria-label={name}
                aria-current={active ? 'page' : undefined}
                className="relative flex h-11 items-center justify-center gap-1.5 rounded-full active:scale-95 transition-transform"
              >
                {active && (
                  <motion.span
                    layoutId="mobileTabPill"
                    className="absolute inset-0 bg-primary shadow-[0_4px_18px_-4px_rgba(255,195,15,0.75),inset_0_1px_0_rgba(255,255,255,0.5)]"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <Icon
                  className={cn(
                    'relative z-10 h-5 w-5 shrink-0 transition-colors',
                    active ? 'text-primary-foreground' : 'text-white/75'
                  )}
                />
                <span
                  className={cn(
                    'relative z-10 overflow-hidden whitespace-nowrap text-xs font-semibold text-primary-foreground transition-all duration-300',
                    active ? 'max-w-[72px] opacity-100' : 'max-w-0 opacity-0'
                  )}
                >
                  {name}
                </span>
              </Link>
            </li>
          );
        })}
      </motion.ul>
    </nav>
  );
};
/* ───────────────────────── Menú a pantalla completa ───────────────────────── */

const MobileMenu = ({ open, onClose }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const scrollY = window.scrollY;
    const { overflow, position, top, width, touchAction } = document.body.style;
    const htmlOverflowX = document.documentElement.style.overflowX;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.touchAction = 'pan-y';
    document.documentElement.style.overflowX = 'hidden';

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.position = position;
      document.body.style.top = top;
      document.body.style.width = width;
      document.body.style.touchAction = touchAction;
      document.documentElement.style.overflowX = htmlOverflowX;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          initial={{ opacity: 0, y: -48 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -36 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto overscroll-y-contain bg-secondary text-secondary-foreground touch-pan-y md:hidden"
          style={{ maxWidth: '100vw' }}
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative flex min-h-[100dvh] flex-col px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
            <div className="flex h-14 items-center justify-between">
              <img src="/imagologo.png" alt="DOMAKEA" className="-ml-2 h-9 w-auto" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar menú"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 active:scale-95 transition-transform"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-6 flex flex-col">
              {MENU_LINKS.map((link, i) => {
                const active = link.path === '/' ? pathname === '/' : pathname.startsWith(link.path);
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.45, ease: 'easeOut' }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => {
                        haptic();
                        onClose();
                      }}
                      className="group flex items-center justify-between border-b border-white/10 py-4"
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="text-xs font-semibold tabular-nums text-primary">0{i + 1}</span>
                        <span
                          className={cn(
                            'text-[2rem] font-bold leading-none tracking-tight transition-colors',
                            active ? 'text-primary' : 'text-white group-active:text-primary'
                          )}
                        >
                          {link.name}
                        </span>
                      </span>
                      <ArrowUpRight className="h-6 w-6 text-white/40 transition-transform group-active:translate-x-1 group-active:-translate-y-1" />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.45 }}
              className="mt-6"
            >
              <Link
                to="/partners"
                onClick={onClose}
                className="flex items-center gap-4 rounded-3xl bg-primary p-5 text-primary-foreground active:scale-[0.98] transition-transform"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black/10">
                  <Handshake className="h-6 w-6" />
                </span>
                <span className="flex-1">
                  <span className="block text-base font-bold leading-tight">Ser partner</span>
                  <span className="block text-sm leading-snug text-primary-foreground/75">
                    Alianzas que suman: únete a nuestro ecosistema
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-8 space-y-3 text-sm text-white/80"
            >
              <a href="mailto:domakea.cons@gmail.com" className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" /> domakea.cons@gmail.com
              </a>
              <a href="tel:+573018547895" className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" /> +57 3018547895
              </a>
              <p className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-primary" /> Bogotá, Colombia · 100% virtual
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-6 flex gap-3"
            >
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 active:bg-primary active:text-primary-foreground transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </motion.div>

            <Link
              to="/politica-privacidad"
              onClick={onClose}
              className="mt-auto flex items-center gap-2 pt-10 text-xs text-white/50"
            >
              <ShieldCheck className="h-4 w-4" />
              Política de Tratamiento de Datos Personales
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ───────────────────────── Conjunto ───────────────────────── */

const MobileNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <MobileTopBar onMenu={() => setMenuOpen(true)} />
      <MobileBottomNav />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default MobileNav;
