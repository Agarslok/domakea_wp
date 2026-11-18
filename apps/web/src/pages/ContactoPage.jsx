import React from 'react';
import { Helmet } from 'react-helmet';
import { Mail, Phone, MapPin } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PageHero from '@/components/fx/PageHero.jsx';
import { PageSectionHeader, ScrollItem, MotionSurface } from '@/components/fx/PageMotion.jsx';
import ContactLeadForm from '@/components/forms/ContactLeadForm.jsx';

const ContactoPage = () => {
  return (
    <>
      <Helmet>
        <title>Contacto - DOMAKEA</title>
        <meta
          name="description"
          content="Contáctanos para agendar una consulta gratuita. Estamos listos para ayudarte a impulsar tu negocio."
        />
      </Helmet>

      <Header />

      <main>
        <PageHero
          image="/us_contact.png"
          eyebrow="Contacto"
          title="Hablemos de tu proyecto"
          subtitle="Agenda una consulta gratuita y descubre cómo podemos ayudarte a alcanzar tus objetivos"
        />

        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-12">
              <ScrollItem index={0}>
                <MotionSurface interactive={false} className="overflow-visible p-4 sm:p-6 md:p-8 shadow-lg">
                  <p className="mono-label mb-2 text-muted-foreground">Consulta gratuita</p>
                  <h2 className="font-display text-2xl font-bold mb-2">Déjanos tu información, nuestro equipo te contactará</h2>
                  <p className="text-muted-foreground text-sm mb-8 max-w-2xl">
                    En pocos pasos nos cuentas tu contexto. Con eso agendamos tu diagnóstico gratuito.
                  </p>
                  <ContactLeadForm />
                </MotionSurface>
              </ScrollItem>

              <ScrollItem index={1}>
                <PageSectionHeader
                  align="left"
                  title="Información de contacto"
                  subtitle="Estamos aquí para responder tus preguntas y ayudarte a encontrar la mejor solución para tu negocio."
                  className="mb-8 text-left"
                />
                <MotionSurface className="p-6 md:p-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <p className="text-muted-foreground">domakea.cons@gmail.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Teléfono</h3>
                        <p className="text-muted-foreground">+57 3018547895</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Ubicación</h3>
                        <p className="text-muted-foreground">Bogotá, Colombia</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 p-6 bg-primary/10 rounded-2xl border border-primary/20 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Horario de atención</h3>
                      <p className="text-muted-foreground">
                        Lunes a Viernes: 9:00 AM - 6:00 PM
                        <br />
                        Sábados: 10:00 AM - 4:00 PM
                      </p>
                    </div>
                    <div className="md:border-l md:border-primary/20 md:pl-6">
                      <h3 className="font-semibold text-lg mb-2">Cobertura y modalidad</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Operamos <strong>100% de forma virtual</strong> en Colombia y Latinoamérica. Contamos con total
                        disponibilidad para reuniones presenciales en
                        <strong> Bogotá y sus alrededores, Manizales, Cali y Medellín</strong>.
                      </p>
                    </div>
                  </div>
                </MotionSurface>
              </ScrollItem>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ContactoPage;