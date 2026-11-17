import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Zap, Globe, Handshake, Star, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PageHero from '@/components/fx/PageHero.jsx';
import TiltCard from '@/components/fx/TiltCard.jsx';
import { PageSectionHeader, ScrollItem, MotionSurface } from '@/components/fx/PageMotion.jsx';
import { Reveal } from '@/components/fx/Reveal.jsx';

const benefits = [
  {
    icon: Zap,
    title: 'Complementariedad de Servicios',
    description: 'Juntos ofrecemos más de lo que cada uno puede ofrecer por separado. Tus fortalezas y las nuestras, al servicio del mismo cliente.',
  },
  {
    icon: Star,
    title: 'Co-branding y Visión Compartida',
    description: 'Posibilidad de lanzar contenidos juntos — webinars, ebooks, eventos — para llegar a las audiencias de ambos y ganar autoridad en el sector.',
  },
  {
    icon: Users,
    title: 'Ecosistema de Confianza',
    description: 'Acceso a una red de contactos calificada. Cuando un proyecto crezca y requiera manos expertas, nuestros partners son la primera opción.',
  },
  {
    icon: Handshake,
    title: 'Modelos de Colaboración Flexibles',
    description: 'Esquemas de comisión por referidos, co-ejecución de proyectos o White Label. Ejecutamos el trabajo bajo tu marca para que lo entregues como propio, sin fricción ni exposición.',
  },
];

const PartnersPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    website: '',
    superpower: '',
    collaboration: '',
    markets: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: '¡Propuesta recibida!',
      description: 'Revisaremos tu propuesta y nos pondremos en contacto pronto.',
    });
    setFormData({ name: '', company: '', website: '', superpower: '', collaboration: '', markets: '' });
    setIsSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>Mutualismo - Partners | DOMAKEA</title>
        <meta name="description" content="Alianzas estratégicas que suman. Únete al ecosistema de partners de DOMAKEA y creemos juntos proyectos de alto impacto." />
      </Helmet>

      <Header />

      <main>
        {/* Hero */}
        <PageHero image="/us_partners.png" eyebrow="Alianzas que Suman" title="Trabajemos juntos" subtitle="Conoce nuestro Ecosistema de Partners. Creamos conexiones que impulsan grandes proyectos.">
          <a
            href="#formulario"
            className="inline-flex h-14 items-center gap-2 rounded-full bg-primary px-8 text-lg font-semibold text-primary-foreground shadow-[0_10px_40px_-8px_rgba(255,195,15,0.8)] transition-transform hover:scale-[1.03]"
          >
            Propón una alianza
            <ArrowRight className="h-5 w-5" />
          </a>
        </PageHero>

        {/* Intro */}
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

        {/* Beneficios */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PageSectionHeader
              title="¿Cómo funciona este Mutualismo?"
              subtitle="Lo que ganas al ser parte de nuestro ecosistema"
            />

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

        {/* Formulario */}
        <div id="formulario" className="scroll-mt-28 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
          <Reveal>
          <MotionSurface interactive={false} className="p-8 shadow-lg">
                            <h2 className="font-display text-2xl font-bold mb-6">Dejanos tu información, nuestro equipo te contactará</h2>
                            
                                            <div>
                          <div className="bg-card rounded-2xl overflow-hidden shadow-lg flex justify-center">
                            <iframe
                              src="https://docs.google.com/forms/d/e/1FAIpQLSefM5Ca6zKAfDXPUvxZGkM4anj83CXpw9t52TQVLKp-dNghfw/viewform?usp=dialog"
                              width="100%"
                              height="2360"
                              frameBorder="0"
                              marginHeight="0"
                              marginWidth="0"
                            >
                              Cargando…
                            </iframe>
                          </div>
                        </div>
          </MotionSurface>
          </Reveal>
                          </div>
    

        {/* CTA final */}
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
                <Button size="lg" className="bg-secondary text-background-foreground hover:bg-background/90 hover:text-primary text-lg px-8">
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