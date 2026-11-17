  import React, { useState } from 'react';
  import { Helmet } from 'react-helmet';
  import { Mail, Phone, MapPin, Send } from 'lucide-react';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { Label } from '@/components/ui/label';
  import { Textarea } from '@/components/ui/textarea';
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
  import { useToast } from '@/hooks/use-toast';
  import Header from '@/components/Header.jsx';
  import Footer from '@/components/Footer.jsx';
import PageHero from '@/components/fx/PageHero.jsx';
import { PageSectionHeader, ScrollItem, MotionSurface } from '@/components/fx/PageMotion.jsx';
import { Reveal } from '@/components/fx/Reveal.jsx';

  const ContactoPage = () => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleServiceChange = (value) => {
      setFormData(prev => ({ ...prev, service: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: 'Mensaje enviado',
        description: 'Nos pondremos en contacto contigo pronto.',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
      setIsSubmitting(false);
    };

    return (
      <>
        <Helmet>
          <title>Contacto - DOMAKEA</title>
          <meta name="description" content="Contáctanos para agendar una consulta gratuita. Estamos listos para ayudarte a impulsar tu negocio." />
        </Helmet>

        <Header />

        <main>
        <PageHero image="/us_contact.png" eyebrow="Contacto" title="Hablemos de tu proyecto" subtitle="Agenda una consulta gratuita y descubre cómo podemos ayudarte a alcanzar tus objetivos" />

          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <PageSectionHeader
                align="left"
                title="Información de contacto"
                subtitle="Estamos aquí para responder tus preguntas y ayudarte a encontrar la mejor solución para tu negocio."
                className="mb-10 text-left"
              />
              <div className="flex flex-col gap-12">
                <ScrollItem index={0}>
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
  {/* Bloque Izquierdo: Horario */}
  <div>
    <h3 className="font-semibold text-lg mb-2">Horario de atención</h3>
    <p className="text-muted-foreground">
      Lunes a Viernes: 9:00 AM - 6:00 PM<br />
      Sábados: 10:00 AM - 4:00 PM
    </p>
  </div>

  {/* Bloque Derecho: Ubicación y Modalidad */}
  <div className="md:border-l md:border-primary/20 md:pl-6">
    <h3 className="font-semibold text-lg mb-2">Cobertura y modalidad</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">
      Operamos <strong>100% de forma virtual</strong> en Colombia y Latinoamérica. 
      Contamos con total disponibilidad para reuniones presenciales en 
      <strong> Bogotá y sus alrededores, Manizales, Cali y Medellín</strong>.
    </p>
  </div>
</div>
                </MotionSurface>
                </ScrollItem>

                <ScrollItem index={1}>
                  <MotionSurface interactive={false} className="p-6 md:p-8 shadow-lg">
                    <h2 className="font-display text-2xl font-bold mb-6">Dejanos tu información, nuestro equipo te contactará</h2>
                    
                                    <Reveal delay={0.1}>
                  <div className="overflow-hidden rounded-2xl flex justify-center">
                    <iframe
                      src="https://docs.google.com/forms/d/e/1FAIpQLSf9tcqtVBqE8DtA8crkn5wHuSQNTlWmjEuADYqMLD6I46Jd7A/viewform?usp=dialog"
                      width="100%"
                      height="2370"
                      frameBorder="0"
                      marginHeight="0"
                      marginWidth="0"
                    >
                      Cargando…
                    </iframe>
                  </div>
                </Reveal>
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