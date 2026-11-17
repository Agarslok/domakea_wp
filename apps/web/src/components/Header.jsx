import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarCheck } from 'lucide-react';
import MobileNav, { HERO_ROUTES } from '@/components/mobile/MobileNav.jsx';
import Magnetic from '@/components/fx/Magnetic.jsx';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Portafolio', path: '/servicios' },
  { name: 'Clientes', path: '/portafolio' },
  { name: 'Sobre Nosotros', path: '/sobre-nosotros' },
  { name: 'Contacto', path: '/contacto' },
];

const WHATSAPP = 'https://api.whatsapp.com/send/?phone=3018547895&text&type=phone_number&app_absent=0';

const Header = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Brillo especular del vidrio que sigue al cursor
  const onPointerMove = (e) => {
    const rect = barRef.current?.getBoundingClientRect();
    if (!rect) return;
    barRef.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    barRef.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const hasHero = HERO_ROUTES.includes(pathname);
  const highlight = hovered ?? (NAV_LINKS.some((l) => l.path === pathname) ? pathname : null);

  return (
    <>
      {/* Navegación móvil: barra flotante de vidrio + barra inferior tipo app + menú a pantalla completa */}
      <MobileNav />

      {/* Header desktop: píldora flotante de vidrio líquido */}
      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 hidden justify-center px-4 md:flex">
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1, maxWidth: scrolled ? 900 : 1120 }}
          transition={{ y: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }, maxWidth: { duration: 0.5, ease: 'easeOut' } }}
          className="pointer-events-auto w-full"
        >
          <div
            ref={barRef}
            onPointerMove={onPointerMove}
            onPointerLeave={() => setHovered(null)}
            className="glass relative flex h-16 items-center justify-between overflow-hidden rounded-full pl-6 pr-2.5"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.2), transparent 62%)',
              }}
            />

            <Link to="/" className="relative z-10 flex items-center" aria-label="DOMAKEA - Inicio">
              <img src="/imagologo.png" alt="DOMAKEA" className="-ml-2 h-10 w-auto" />
            </Link>

            <nav className="relative z-10 flex items-center gap-1" aria-label="Navegación principal">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onMouseEnter={() => setHovered(link.path)}
                    className={`relative whitespace-nowrap rounded-full px-3 py-2 text-sm lg:px-4 font-medium transition-colors duration-200 ${
                      active ? 'text-primary' : 'text-white/85 hover:text-white'
                    }`}
                  >
                    {highlight === link.path && (
                      <motion.span
                        layoutId="navGlass"
                        className="absolute inset-0 rounded-full bg-white/[0.13] ring-1 ring-inset ring-white/20"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="relative z-10">
              <Magnetic strength={0.25}>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 items-center gap-2 whitespace-nowrap rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_6px_24px_-6px_rgba(255,195,15,0.8)] transition-transform hover:scale-[1.03]"
                >
                  <CalendarCheck className="h-4 w-4" />
                  <span className="hidden lg:inline">Agendar Consulta</span>
                  <span className="sr-only lg:hidden">Agendar Consulta</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Las páginas sin hero (p. ej. política de privacidad) necesitan espacio bajo la barra flotante */}
      {!hasHero && <div aria-hidden className="hidden h-28 md:block" />}
    </>
  );
};

export default Header;
