import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
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
        <section className="relative py-20 text-secondary-foreground overflow-hidden py-20 bg-gradient-to-br from-secondary via-secondary to-secondary/90 text-secondary-foreground">
          <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/us_services.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 via-secondary/65 to-secondary/70" />
        </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              Servicios profesionales
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-secondary-foreground/90 max-w-3xl mx-auto leading-relaxed"
            >
              Soluciones integrales diseñadas para impulsar el crecimiento de tu empresa con estrategias basadas en datos
            </motion.p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {content.services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300">
                    <CardHeader
                      className="cursor-pointer transition-colors duration-200"
                      onClick={() => toggleCategory(service.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-2xl md:text-3xl font-bold mb-2">
                            {service.category}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {expandedCategory === service.id ? service.description : service.shortDescription}
                          </CardDescription>
                        </div>
                        {expandedCategory === service.id ? (
                          <ChevronUp className="h-6 w-6 text-primary flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                        )}
                      </div>
                    </CardHeader>

                    {expandedCategory === service.id && (
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                          <div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-primary" />
                              Beneficios
                            </h3>
                            <ul className="space-y-2">
                              {service.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  <span className="text-muted-foreground">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-primary" />
                              Casos de uso
                            </h3>
                            <ul className="space-y-2">
                              {service.useCases.map((useCase, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  <span className="text-muted-foreground">{useCase}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                    <div>
                    <h3 className="text-lg font-semibold mb-4">Servicios disponibles</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {service.subservices.map((subservice) => (
                        <Card key={subservice.id} className="hover:shadow-lg transition-all duration-300">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{subservice.name}</CardTitle>
                            <CardDescription className="text-sm">{subservice.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex items-baseline gap-1 flex-wrap">
                              <span className="text-xs text-secondary">Desde</span>
                              <span className="text-xl font-bold text-primary">{subservice.price}</span>
                              <span className="text-xs text-primary">COP</span>
                              <span className="text-xs text-secondary">por proyecto</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground text-center mt-6">
                      ¿Deseas contratar algún servicio específico?{' '}
                      <a href="#" className="text-primary font-medium hover:underline">
                        Contáctanos
                      </a>
                    </p>
                  </div>
                        
                        <div className="mt-8 p-6 rounded-2xl">
                        {service.totalPrice && (
                            <div className="text-center mb-4 bg-primary rounded-xl py-4 px-6">
                            <span className="text-secondary/70 text-sm">Precio total del paquete</span>
                            <div className="flex items-baseline justify-center gap-2">
                            
                            <span className="text-3xl font-bold text-secondary"><span className="text-white/70 text-sm">Desde </span>{service.totalPrice}<span className="text-white/70 text-sm"> COP</span></span>
                            
                            </div>
                            </div>
                          )}
                          
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                ¿Listo para transformar tu negocio?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Agenda una consulta gratuita y descubre cómo nuestros servicios pueden ayudarte a alcanzar tus objetivos.
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

export default ServiciosPage;