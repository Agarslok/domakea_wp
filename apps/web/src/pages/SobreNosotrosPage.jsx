import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Heart, Eye, Lightbulb, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PageHero from '@/components/fx/PageHero.jsx';
import TiltCard from '@/components/fx/TiltCard.jsx';
import { PageSectionHeader, ScrollItem, MotionSurface } from '@/components/fx/PageMotion.jsx';
import { Reveal } from '@/components/fx/Reveal.jsx';
import TeamSpotlight from '@/components/about/TeamSpotlight.jsx';
import AboutPillarTiles from '@/components/about/AboutPillarTiles.jsx';
import HistoryExperience from '@/components/about/HistoryExperience.jsx';
import { useContent } from '../contexts/useContent';

const SobreNosotrosPage = () => {
  const { content } = useContent();

  const sections = [
    { icon: Target, title: 'Quiénes somos', content: content.about.quienesSomos },
    { icon: Zap, title: 'Qué hacemos', content: content.about.queHacemos },
    { icon: Heart, title: 'Por qué lo hacemos', content: content.about.porQueLoHacemos },
    { icon: Eye, title: 'Nuestra visión', content: content.about.vision },
    { icon: Lightbulb, title: 'Nuestra metodología', content: content.about.metodologia },
  ];

  return (
    <>
      <Helmet>
        <title>Sobre Nosotros - DOMAKEA</title>
        <meta
          name="description"
          content="Conoce a DOMAKEA, consultora especializada en transformación digital y crecimiento empresarial basado en datos."
        />
      </Helmet>

      <Header />

      <main>
        <PageHero
          image="/us_us.png"
          eyebrow="DOMAKEA"
          title="Sobre nosotros"
          subtitle="No somos una agencia. Somos el equipo analítico que tu empresa necesita"
        />

        <div className="px-4 pb-4 pt-12 sm:px-6 lg:px-8">
          <PageSectionHeader
            title="Nuestra historia"
            subtitle="En móvil, desliza a los lados entre pasos; en escritorio, usa el scroll."
          />
        </div>
        <HistoryExperience />

        <section className="py-20 bg-primary">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <PageSectionHeader
              titleClassName="text-black"
              subtitleClassName="text-black/70"
              title="Conoce nuestro equipo"
              subtitle="Las personas detrás de cada estrategia y resultado"
            />
            <TeamSpotlight team={content.team} />
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PageSectionHeader
              eyebrow="Cómo pensamos"
              title="Nuestros servicios, en contexto"
              subtitle="Explora cada bloque como en el home: selecciona una tarjeta y profundiza en el detalle."
            />
            <AboutPillarTiles sections={sections} />
          </div>
        </section>

        <section className="py-20 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PageSectionHeader
              titleClassName="text-muted"
              title="Nuestros valores"
              subtitle="Los principios que guían cada decisión y acción en DOMAKEA"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Integridad', description: 'Actuamos con transparencia y honestidad en cada proyecto' },
                { title: 'Excelencia', description: 'Buscamos la calidad superior en cada entrega y resultado' },
                {
                  title: 'Innovación',
                  description: 'Adoptamos metodologías de vanguardia para mantenerte siempre un paso adelante.',
                },
                { title: 'Compromiso', description: 'Nos dedicamos completamente al éxito de nuestros clientes' },
              ].map((value, index) => (
                <ScrollItem key={value.title} index={index}>
                  <TiltCard className="h-full rounded-3xl" max={4}>
                    <MotionSurface className="group h-full bg-card p-6 hover:bg-primary hover:text-primary-foreground">
                      <h3 className="font-display text-xl font-semibold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed group-hover:text-primary-foreground/85">{value.description}</p>
                    </MotionSurface>
                  </TiltCard>
                </ScrollItem>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-primary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <PageSectionHeader
              title="Trabajemos juntos"
              subtitle="Descubre cómo nuestro equipo puede ayudarte a alcanzar tus objetivos empresariales."
            />
            <Reveal delay={0.12}>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8">
                <Link to="https://api.whatsapp.com/send/?phone=3018547895&text&type=phone_number&app_absent=0">
                  Agendar Consulta
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

export default SobreNosotrosPage;