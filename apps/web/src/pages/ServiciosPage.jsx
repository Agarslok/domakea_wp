import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PageHero from '@/components/fx/PageHero.jsx';
import ServiceAccordionTile from '@/components/services/ServiceAccordionTile.jsx';
import { PageSectionHeader, ScrollItem } from '@/components/fx/PageMotion.jsx';
import { Reveal } from '@/components/fx/Reveal.jsx';
import DarkTileShell from '@/components/fx/DarkTileShell.jsx';
import { useContent } from '../contexts/useContent';

const ServiciosPage = () => {
  const { content } = useContent();
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <>
      <Helmet>
        <title>Servicios - DOMAKEA</title>
        <meta name="description" content="Descubre nuestros servicios de análisis de datos, marketing estratégico, desarrollo de negocios y optimización comercial." />
      </Helmet>

      <Header />

      <main>
        {/* Hero */}
        <PageHero image="/us_services.png" eyebrow="Portafolio de servicios" title="Servicios profesionales" subtitle="Soluciones integrales diseñadas para impulsar el crecimiento de tu empresa con estrategias basadas en datos" />

        {/* Diagnóstico + servicios (misma franja amarilla, tarjetas a ancho completo) */}
        <section className="relative bg-primary px-6 pb-28 pt-14 lg:px-8 lg:pt-16">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-14 md:mb-16">
              <DarkTileShell
                innerClassName="ring-2 ring-primary shadow-[0_0_0_1px_hsl(45_100%_53%/0.35),0_28px_80px_-20px_rgba(0,0,0,0.55)]"
              >
                <div className="relative overflow-hidden px-6 py-9 sm:px-10 sm:py-10 md:flex md:items-center md:gap-8 md:text-left">
                  <span className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-primary/25 blur-3xl" />
                  <div className="relative mb-6 flex shrink-0 flex-col items-center gap-3 md:mb-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_8px_32px_-8px_rgba(255,195,15,0.9)]">
                      <Zap className="h-8 w-8" />
                    </div>
                    <span className="mono-label rounded-full bg-primary px-3 py-1 text-[0.65rem] font-bold text-primary-foreground">
                      Gratis · Sin compromiso
                    </span>
                  </div>
                  <div className="relative text-center md:text-left">
                    <p className="mono-label mb-2 text-primary">Punto de partida</p>
                    <h3 className="font-display text-xl font-bold leading-snug text-white sm:text-2xl md:text-[1.65rem]">
                      Antes de cualquier servicio, hacemos un diagnóstico gratuito y sin compromiso
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/72 sm:text-base">
                      Cada proyecto inicia con un análisis del momento real de su negocio. Así definimos exactamente qué
                      necesita, diseñando una estrategia a la medida, asegurando un despliegue táctico preciso y libre de
                      soluciones genéricas.
                    </p>
                  </div>
                </div>
              </DarkTileShell>
            </Reveal>

            <PageSectionHeader
              eyebrow="Qué hacemos"
              titleClassName="text-black"
              subtitleClassName="text-black/70"
              title="Nuestros servicios"
              subtitle="Toca cada tarjeta para ver beneficios, casos de uso e inversión."
            />
            <div className="flex flex-col gap-6">
              {content.services.map((service, index) => (
                <ScrollItem key={service.id} index={index} delayStep={0.08} className="w-full">
                  <ServiceAccordionTile
                    service={service}
                    index={index}
                    open={expandedCategory === service.id}
                    onToggle={() => toggleCategory(service.id)}
                    layout="row"
                  />
                </ScrollItem>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-20 bg-muted">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <PageSectionHeader
              title="¿Listo para transformar tu negocio?"
              subtitle="Agenda una consulta gratuita y descubre cómo nuestros servicios pueden ayudarte a alcanzar tus objetivos."
            />
            <Reveal delay={0.15}>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8">
                <Link to="https://api.whatsapp.com/send/?phone=3018547895&text&type=phone_number&app_absent=0">
                  Agendar Consulta Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ServiciosPage;
