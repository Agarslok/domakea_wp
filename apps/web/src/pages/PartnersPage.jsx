import React from 'react';
import { Helmet } from 'react-helmet';
import { ArrowRight, Users, Zap, Globe, Handshake, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PageHero from '@/components/fx/PageHero.jsx';
import TiltCard from '@/components/fx/TiltCard.jsx';
import { PageSectionHeader, ScrollItem, MotionSurface } from '@/components/fx/PageMotion.jsx';
import { Reveal } from '@/components/fx/Reveal.jsx';
import PartnerLeadForm from '@/components/forms/PartnerLeadForm.jsx';

const benefits = [
  {
    icon: Zap,
    title: 'Complementariedad de Servicios',
    description:
      'Juntos ofrecemos más de lo que cada uno puede ofrecer por separado. Tus fortalezas y las nuestras, al servicio del mismo cliente.',
  },
  {
    icon: Star,
    title: 'Co-branding y Visión Compartida',
    description:
      'Posibilidad de lanzar contenidos juntos — webinars, ebooks, eventos — para llegar a las audiencias de ambos y ganar autoridad en el sector.',
  },
  {
    icon: Users,
    title: 'Ecosistema de Confianza',
    description:
      'Acceso a una red de contactos calificada. Cuando un proyecto crezca y requiera manos expertas, nuestros partners son la primera opción.',
  },
  {
    icon: Handshake,
    title: 'Modelos de Colaboración Flexibles',
    description:
      'Esquemas de comisión por referidos, co-ejecución de proyectos o White Label. Ejecutamos el trabajo bajo tu marca para que lo entregues como propio, sin fricción ni exposición.',
  },
];

const PartnersPage = () => {
  return (
    <>
      <Helmet>
        <title>Mutualismo - Partners | DOMAKEA</title>
        <meta
          name="description"
          content="Alianzas estratégicas que suman. Únete al ecosistema de partners de DOMAKEA y creemos juntos proyectos de alto impacto."
        />
      </Helmet>

      <Header />

      <main>
        <PageHero
          image="/us_partners.png"
          eyebrow="Alianzas que Suman"
          title="Trabajemos juntos"
          subtitle="Conoce nuestro Ecosistema de Partners. Creamos conexiones que impulsan grandes proyectos."
        >
          <a
            href="#formulario"
            className="inline-flex h-14 items-center gap-2 rounded-full bg-primary px-8 text-lg font-semibold text-primary-foreground shadow-[0_10px_40px_-8px_rgba(255,195,15,0.8)] transition-transform hover:scale-[1.03]"
          >
            Propón una alianza
            <ArrowRight className="h-5 w-5" />
          </a>
        </PageHero>

        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Reveal>
              <Globe className="h-14 w-14 text-primary mx-auto mb-6" />
            </Reveal>
            <PageSectionHeader
              title="¿Hacemos equipo?"
              subtitle="En DOMAKEA creemos firmemente que el crecimiento no se logra en aislamiento. El mercado actual exige hiperespecialización, y sabemos que el verdadero valor surge cuando unimos nuestras fortalezas con las de otros expertos."
            />
          </div>
        </section>

        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PageSectionHeader title="¿Cómo funciona este Mutualismo?" subtitle="Lo que ganas al ser parte de nuestro ecosistema" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <ScrollItem key={index} index={index}>
                    <TiltCard className="h-full rounded-3xl" max={4}>
                      <MotionSurface className="group h-full p-8">
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary">
                          <IconComponent className="h-7 w-7 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                        </div>
                        <h3 className="font-display text-xl font-bold mb-3">{benefit.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                      </MotionSurface>
                    </TiltCard>
                  </ScrollItem>
                );
              })}
            </div>
          </div>
        </section>

        <section id="formulario" className="scroll-mt-28 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <Reveal>
            <MotionSurface interactive={false} className="overflow-visible p-4 sm:p-6 md:p-8 shadow-lg">
              <p className="mono-label mb-2 text-muted-foreground">Ecosistema de partners</p>
              <h2 className="font-display text-2xl font-bold mb-2">Propón una alianza</h2>
              <p className="text-muted-foreground text-sm mb-8 max-w-2xl">
                Cuéntanos sobre tu empresa y cómo podemos complementarnos para crear valor compartido.
              </p>
              <PartnerLeadForm />
            </MotionSurface>
          </Reveal>
        </section>

        <section className="py-20 bg-primary text-secondary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <PageSectionHeader
              title="El crecimiento es mejor cuando es compartido"
              subtitle="Juntos llegamos más lejos. Si crees que nuestras especialidades se complementan, queremos conocerte."
              titleClassName="text-secondary"
              subtitleClassName="text-primary-foreground/80"
            />
            <Reveal delay={0.12}>
              <a href="#formulario">
                <Button
                  size="lg"
                  className="bg-secondary text-background-foreground hover:bg-background/90 hover:text-primary text-lg px-8"
                >
                  Propón una alianza
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default PartnersPage;