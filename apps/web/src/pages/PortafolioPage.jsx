import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PageHero from '@/components/fx/PageHero.jsx';
import PortfolioCaseCard from '@/components/portfolio/PortfolioCaseCard.jsx';
import { PageSectionHeader, ScrollItem } from '@/components/fx/PageMotion.jsx';
import { Reveal } from '@/components/fx/Reveal.jsx';
import { useContent } from '../contexts/useContent';

const PortafolioPage = () => {
  const { content } = useContent();

  return (
    <>
      <Helmet>
        <title>Portafolio - DOMAKEA</title>
        <meta name="description" content="Casos de éxito y proyectos realizados por DOMAKEA. Descubre cómo hemos ayudado a empresas a crecer." />
      </Helmet>

      <Header />

      <main>
        <PageHero image="/us_exito.png" eyebrow="Clientes" title="Casos de éxito" subtitle="Resultados reales de empresas que confiaron en nuestras estrategias basadas en datos" />

        <section className="relative bg-primary px-6 py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <PageSectionHeader
              eyebrow="Resultados reales"
              titleClassName="text-black"
              subtitleClassName="text-black/70"
              title="Historias que medimos"
              subtitle="Cada caso combina estrategia, datos y ejecución. Desplázate para conocer el detalle."
            />
            <div className="flex flex-col gap-6">
              {content.portfolio.map((project, index) => (
                <ScrollItem key={project.id} index={index} delayStep={0.1} className="w-full">
                  <PortfolioCaseCard project={project} index={index} layout="row" />
                </ScrollItem>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-primary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <PageSectionHeader
              title="Tu empresa puede ser el próximo caso de éxito"
              subtitle="Agenda una consulta gratuita y descubre cómo podemos ayudarte a alcanzar resultados similares."
            />
            <Reveal delay={0.12}>
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

export default PortafolioPage;