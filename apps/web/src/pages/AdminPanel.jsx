import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Lock, LogOut, Save, Trash2, Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useContent } from '../contexts/useContent';

const AdminPanel = () => {
  const { content, updateContent, isAdmin, login, logout, resetContent } = useContent();
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      toast({
        title: 'Acceso concedido',
        description: 'Bienvenido al panel de administración',
      });
      setPassword('');
      setLoginError('');
    } else {
      setLoginError('Contraseña incorrecta');
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: 'Sesión cerrada',
      description: 'Has salido del panel de administración',
    });
  };

  const handleSaveHero = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    updateContent('hero', {
      title: formData.get('title'),
      subtitle: formData.get('subtitle'),
    });
    toast({
      title: 'Cambios guardados',
      description: 'El contenido del hero ha sido actualizado',
    });
  };

  const handleSaveAbout = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    updateContent('about', {
      quienesSomos: formData.get('quienesSomos'),
      queHacemos: formData.get('queHacemos'),
      porQueLoHacemos: formData.get('porQueLoHacemos'),
      vision: formData.get('vision'),
      metodologia: formData.get('metodologia'),
    });
    toast({
      title: 'Cambios guardados',
      description: 'El contenido de Sobre Nosotros ha sido actualizado',
    });
  };

  const handleAddTestimonial = () => {
    const newTestimonial = {
      id: Date.now(),
      name: 'Nuevo Cliente',
      company: 'Empresa',
      comment: 'Comentario del cliente...',
    };
    updateContent('testimonials', [...content.testimonials, newTestimonial]);
    toast({
      title: 'Testimonio agregado',
      description: 'Edita los campos del nuevo testimonio',
    });
  };

  const handleUpdateTestimonial = (id, field, value) => {
    const updated = content.testimonials.map(t =>
      t.id === id ? { ...t, [field]: value } : t
    );
    updateContent('testimonials', updated);
  };

  const handleDeleteTestimonial = (id) => {
    const updated = content.testimonials.filter(t => t.id !== id);
    updateContent('testimonials', updated);
    toast({
      title: 'Testimonio eliminado',
      description: 'El testimonio ha sido removido',
    });
  };

  const handleUpdateServicePrice = (categoryId, subserviceId, newPrice) => {
    const updated = content.services.map(service => {
      if (service.id === categoryId) {
        return {
          ...service,
          subservices: service.subservices.map(sub =>
            sub.id === subserviceId ? { ...sub, price: newPrice } : sub
          ),
        };
      }
      return service;
    });
    updateContent('services', updated);
  };

  const handleReset = () => {
    if (window.confirm('¿Estás seguro de que quieres restaurar el contenido por defecto? Esta acción no se puede deshacer.')) {
      resetContent();
      toast({
        title: 'Contenido restaurado',
        description: 'Se ha restaurado el contenido por defecto',
      });
    }
  };

  if (!isAdmin) {
    return (
      <>
        <Helmet>
          <title>Admin - DOMAKEA</title>
        </Helmet>
        <Header />
        <main className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-background py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md px-4"
          >
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 w-fit">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Panel de Administración</CardTitle>
                <CardDescription>Ingresa la contraseña para acceder</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-2 text-foreground"
                      placeholder="Ingresa la contraseña"
                      required
                    />
                    {loginError && (
                      <p className="text-sm text-destructive mt-2">{loginError}</p>
                    )}
                  </div>
                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Acceder
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Panel de Administración - DOMAKEA</title>
      </Helmet>
      <Header />
      <main className="py-20 bg-background min-h-[calc(100vh-80px)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Panel de Administración</h1>
            <div className="flex gap-4">
              <Button onClick={handleReset} variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Restaurar contenido
              </Button>
              <Button onClick={handleLogout} variant="outline" className="gap-2">
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </Button>
            </div>
          </div>

          <Tabs defaultValue="hero" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="hero">Hero</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonios</TabsTrigger>
              <TabsTrigger value="services">Servicios</TabsTrigger>
              <TabsTrigger value="about">Sobre Nosotros</TabsTrigger>
            </TabsList>

            <TabsContent value="hero">
              <Card>
                <CardHeader>
                  <CardTitle>Editar Hero Section</CardTitle>
                  <CardDescription>Modifica el título y subtítulo de la página principal</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveHero} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        name="title"
                        defaultValue={content.hero.title}
                        className="mt-2 text-foreground"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="subtitle">Subtítulo</Label>
                      <Textarea
                        id="subtitle"
                        name="subtitle"
                        defaultValue={content.hero.subtitle}
                        className="mt-2 text-foreground"
                        required
                      />
                    </div>
                    <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Save className="mr-2 h-4 w-4" />
                      Guardar cambios
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="testimonials">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Gestionar Testimonios</CardTitle>
                      <CardDescription>Agrega, edita o elimina testimonios de clientes</CardDescription>
                    </div>
                    <Button onClick={handleAddTestimonial} className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Plus className="mr-2 h-4 w-4" />
                      Agregar testimonio
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {content.testimonials.map((testimonial) => (
                      <Card key={testimonial.id}>
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <Label>Nombre</Label>
                              <Input
                                value={testimonial.name}
                                onChange={(e) => handleUpdateTestimonial(testimonial.id, 'name', e.target.value)}
                                className="mt-2 text-foreground"
                              />
                            </div>
                            <div>
                              <Label>Empresa</Label>
                              <Input
                                value={testimonial.company}
                                onChange={(e) => handleUpdateTestimonial(testimonial.id, 'company', e.target.value)}
                                className="mt-2 text-foreground"
                              />
                            </div>
                          </div>
                          <div className="mb-4">
                            <Label>URL de la foto</Label>
                            <Input
                              value={testimonial.photo}
                              onChange={(e) => handleUpdateTestimonial(testimonial.id, 'photo', e.target.value)}
                              className="mt-2 text-foreground"
                            />
                          </div>
                          <div className="mb-4">
                            <Label>Comentario</Label>
                            <Textarea
                              value={testimonial.comment}
                              onChange={(e) => handleUpdateTestimonial(testimonial.id, 'comment', e.target.value)}
                              className="mt-2 text-foreground"
                            />
                          </div>
                          <Button
                            onClick={() => handleDeleteTestimonial(testimonial.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <CardTitle>Editar Precios de Servicios</CardTitle>
                  <CardDescription>Modifica los precios de los servicios ofrecidos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {content.services.map((service) => (
                      <div key={service.id}>
                        <h3 className="text-xl font-semibold mb-4">{service.category}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {service.subservices.map((subservice) => (
                            <Card key={subservice.id}>
                              <CardContent className="pt-6">
                                <p className="font-medium mb-2">{subservice.name}</p>
                                <Label>Precio</Label>
                                <Input
                                  value={subservice.price}
                                  onChange={(e) => handleUpdateServicePrice(service.id, subservice.id, e.target.value)}
                                  className="mt-2 text-foreground"
                                />
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => toast({ title: 'Cambios guardados', description: 'Los precios han sido actualizados' })}
                    className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Guardar cambios
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>Editar Sobre Nosotros</CardTitle>
                  <CardDescription>Modifica las secciones de la página Sobre Nosotros</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveAbout} className="space-y-6">
                    <div>
                      <Label htmlFor="quienesSomos">Quiénes Somos</Label>
                      <Textarea
                        id="quienesSomos"
                        name="quienesSomos"
                        defaultValue={content.about.quienesSomos}
                        className="mt-2 min-h-[100px] text-foreground"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="queHacemos">Qué Hacemos</Label>
                      <Textarea
                        id="queHacemos"
                        name="queHacemos"
                        defaultValue={content.about.queHacemos}
                        className="mt-2 min-h-[100px] text-foreground"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="porQueLoHacemos">Por Qué Lo Hacemos</Label>
                      <Textarea
                        id="porQueLoHacemos"
                        name="porQueLoHacemos"
                        defaultValue={content.about.porQueLoHacemos}
                        className="mt-2 min-h-[100px] text-foreground"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="vision">Nuestra Visión</Label>
                      <Textarea
                        id="vision"
                        name="vision"
                        defaultValue={content.about.vision}
                        className="mt-2 min-h-[100px] text-foreground"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="metodologia">Nuestra Metodología</Label>
                      <Textarea
                        id="metodologia"
                        name="metodologia"
                        defaultValue={content.about.metodologia}
                        className="mt-2 min-h-[100px] text-foreground"
                        required
                      />
                    </div>
                    <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Save className="mr-2 h-4 w-4" />
                      Guardar cambios
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminPanel;