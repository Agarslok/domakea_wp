import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ServiceCard from '@/components/ServiceCard.jsx';
import BenefitCard from '@/components/BenefitCard.jsx';
import TestimonialCard from '@/components/TestimonialCard.jsx';
import TimelineStep from '@/components/TimelineStep.jsx';
import ProblemSolutionCard from '@/components/ProblemSolutionCard.jsx';
import { useContent } from '../contexts/useContent';

const HomePage = () => {
  const { content } = useContent();

  const mainServices = [
    {
      name: 'DomaField',
      description: 'Diseñamos e implementamos el sistema de captura de datos que tu empresa necesita para dejar de operar con información incompleta o dispersa, garantizando el manejo responsable de la información conforme a la normativa de protección de datos vigente.',
    },
    {
      name: 'DomaAnalytics',
      description: 'Convertimos el historial de datos de tu empresa en modelos predictivos e inteligencia accionable para activar alertas tempranas que mitiguen riesgos y detecten oportunidades a tiempo.',
    },
    {
      name: 'DomaCore',
      description: 'Implementamos y estructuramos el CRM de tu empresa para que toda la información comercial fluya desde un único lugar confiable para facilitar la toma de decisiones.',
    },
    {
      name: 'DomaGrowth',
      description: 'Evaluamos tus canales de captación, el rendimiento de tu inversión publicitaria y los puntos de fuga en el embudo de conversión.',
    },
  ];

  const methodology = [
    {
      number: 1,
      title: 'Diagnóstico',
      description: 'Análisis profundo de tu situación actual, mercado y competencia',
    },
    {
      number: 2,
      title: 'Estrategia',
      description: 'Diseño de plan personalizado basado en datos y objetivos específicos',
    },
    {
      number: 3,
      title: 'Implementación',
      description: 'Ejecución ágil con seguimiento continuo y ajustes en tiempo real (asociados)',
    },
    {
      number: 4,
      title: 'Medición',
      description: 'Monitoreo de KPIs y métricas clave para evaluar resultados',
    },
    {
      number: 5,
      title: 'Optimización',
      description: 'Mejora continua basada en aprendizajes y nuevas oportunidades',
    },


  ];

const tools = [
  { name: 'Google Analytics', icon: '/google-analytics-logo.png' },
  { name: 'Power BI', icon: '/Microsoft-Power-BI-Logo.png' },
  { name: 'Meta Ads', icon: '/meta-logo.png' },
  { name: 'Google Ads', icon: '/google-ads-logo.jpg' },
  { name: 'HubSpot', icon: '/hubspot-logo.png' },
  { name: 'Tableau', icon: '/Tableau-logo.png' },
  { name: 'R Studio', icon: '/r-logo.png' },
  { name: 'Looker Studio', icon: '/looker-studio-logo.png' },
  { name: 'Python', icon: '/python-logo.png' },
  { name: 'Mailchimp', icon: '/mailchimp-logo.webp' },
  { name: 'Notion', icon: '/Notion-logo.png' },
  { name: 'Slack', icon: '/slack-logo.png' },
  { name: 'Legiscomex', icon: '/legiscomex.jpg' },
  { name: 'EMIS', icon: '/emis.png' }
];

const ToolsCarousel = () => {
  const [current, setCurrent] = React.useState(0);
  const itemsPerView = 4;
  
  const total = tools.length;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % total);
    }, 3000);
    const getItemsPerView = () => {
      if (typeof window === 'undefined') return 4;
      if (window.innerWidth < 640) return 2;
      if (window.innerWidth < 768) return 3;
      return 4;
    };

    const itemsPerView = getItemsPerView();
    return () => clearInterval(timer);
  }, []);

  const getVisible = () => {
    const visible = [];
    for (let i = 0; i < itemsPerView; i++) {
      visible.push(tools[(current + i) % total]);
    }
    return visible;
  };

  const prev = () => setCurrent(prev => (prev - 1 + total) % total);
  const next = () => setCurrent(prev => (prev + 1) % total);

  return (
    <div className="relative flex items-center gap-4">
      <button
        onClick={prev}
        className="flex-shrink-0 p-2 rounded-full bg-background border border-border hover:border-primary hover:text-primary transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>

      <div className="flex-1 overflow-hidden">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {getVisible().map((tool, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 p-4 bg-background rounded-2xl border border-border/50 hover:border-primary hover:shadow-md transition-all duration-300 cursor-default"
            >
                            <img
                src={tool.icon}
                alt={tool.name}
                className="w-12 h-12 object-contain"
              />
              <span className="text-sm font-medium text-center text-foreground/80">{tool.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <button
        onClick={next}
        className="flex-shrink-0 p-2 rounded-full bg-background border border-border hover:border-primary hover:text-primary transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
    </div>
  );
};
  
  return (
    <>
      <Helmet>
        <title>DOMAKEA - Transformamos datos en decisiones estratégicas</title>
        <meta name="description" content="Consultora especializada en análisis de datos, marketing estratégico y desarrollo comercial. Ayudamos a empresas a crecer con estrategias basadas en datos." />
      </Helmet>

      <Header />

      <main>
        <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
          <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/video_home.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/50 to-black/60" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-4xl font-bold text-white mb-6 leading-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              {content.hero.title1}
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              {content.hero.title2}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              {content.hero.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20 text-lg px-8 backdrop-blur-sm">
                <Link to="/servicios">Ver Portafolio</Link>
              </Button>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8">
                <Link to="/contacto">
                  Agendar Consulta
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20 text-lg px-8 backdrop-blur-sm">
                <Link to="/partners">
                  Ser Partner
                </Link>
              </Button>
              
            </motion.div>
            
            
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 ">¿Te identificas con alguno de estos problemas?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                No estás solo. Los hemos resuelto antes y podemos resolverlos contigo.
              </p>
            </motion.div>

            <div className="space-y-12 ">
              {content.problems.map((item, index) => (
                <ProblemSolutionCard
                  key={item.id}
                  problem={item.problem}
                  solution={item.solution}
                  index={index}
                  reverse={index % 2 !== 0}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros servicios</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Soluciones integrales para impulsar el crecimiento de tu empresa
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {mainServices.map((service, index) => (
                <ServiceCard
                  key={index}
                  name={service.name}
                  description={service.description}
                  onLearnMore={() => window.location.href = '/servicios'}
                  index={index}
                />
              ))}
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="bg-secondary text-secondary-foreground/80 hover:bg-background/90  hover:text-secondary">
                <Link to="/servicios">
                  Ver todos los servicios
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Por qué elegir DOMAKEA</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Nuestro enfoque diferenciador para tu éxito empresarial
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.benefits.slice(0, 6).map((benefit, index) => (
                <BenefitCard
                  key={benefit.id}
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Herramientas que dominamos</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Tecnología de punta para entregar resultados medibles
              </p>
            </motion.div>

            <ToolsCarousel />
          </div>
        </section>

        <section className="py-20 bg-secondary text-secondary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestra metodología</h2>
              <p className="text-xl text-secondary-foreground/80 max-w-2xl mx-auto">
                Un proceso probado para garantizar resultados sostenibles
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {methodology.map((step, index) => (
                <TimelineStep
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  isLast={index === methodology.length - 1}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

       

        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-primary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <TrendingUp className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Impulsa el crecimiento de tu negocio con nosotros
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Agenda una consulta gratuita y descubre cómo podemos ayudarte a alcanzar tus objetivos empresariales con estrategias basadas en datos reales.
              </p>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8">
                <Link to="https://api.whatsapp.com/send/?phone=3018547895&text&type=phone_number&app_absent=0">
                  Agendar Consulta Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;