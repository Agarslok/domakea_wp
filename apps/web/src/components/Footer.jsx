import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-32 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <img
              src="/imagologo.png"
              alt="DOMAKEA"
              className="h-10 w-auto mb-4 brightness-1"
            />
            <p className="text-secondary-foreground/80 leading-relaxed max-w-md mb-4">
              Transformamos datos en decisiones estratégicas para impulsar el crecimiento de tu negocio.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/domakea.cons/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary-foreground/10 hover:bg-primary transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/domakea/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary-foreground/10 hover:bg-primary transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                  href="https://www.tiktok.com/@domakea.cons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-secondary-foreground/10 hover:bg-primary transition-all duration-200"
                  aria-label="TikTok"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
                  </svg>
                </a>
                <a 

                  href="https://x.com/domakeacons?s=21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-secondary-foreground/10 hover:bg-primary transition-all duration-200"
                  aria-label="X"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
            </div>
          </div>
          

          <div>
            <span className="font-semibold text-lg mb-4 block">Navegación</span>
            <nav className="space-y-2">
              <Link to="/" className="block text-secondary-foreground/80 hover:text-primary transition-colors duration-200">
                Home
              </Link>
              <Link to="/servicios" className="block text-secondary-foreground/80 hover:text-primary transition-colors duration-200">
                Portafolio
              </Link>
              <Link to="/portafolio" className="block text-secondary-foreground/80 hover:text-primary transition-colors duration-200">
                Clientes
              </Link>
              <Link to="/sobre-nosotros" className="block text-secondary-foreground/80 hover:text-primary transition-colors duration-200">
                Sobre Nosotros
              </Link>
              <Link to="/contacto" className="block text-secondary-foreground/80 hover:text-primary transition-colors duration-200">
                Contacto
              </Link>
            </nav>
          </div>

          <div>
            <span className="font-semibold text-lg mb-4 block">Contacto</span>
            <div className="space-y-2 text-secondary-foreground/80">
              <p>domakea.cons@gmail.com</p>
              <p>+57 3018547895</p>
              <p>Bogotá, Colombia</p>
              <p className="text-sm text-muted-foreground mt-1 text-justify">Operamos 100% de forma virtual en Colombia Latinoamérica. Pero con total disponibilidad para reuniones presenciales en Bogotá y  sus alrededores, Manizales, Cali y Medellín.</p>
            </div>
          </div>
        </div>

                

        <div className="border-t border-secondary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-secondary-foreground/60">
            © {currentYear} DOMAKEA. Todos los derechos reservados.
          </p>
          <div>
                  <a href="https://www.rues.org.co/buscar/RM/Domakea"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-background gap-2 border border-border/50 rounded-lg px-3 py-2 w-fit hover:border-primary transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <div className="text-xs">
                    <p className="font-semibold text-foreground">Empresa registrada</p>
                    <p className="text-primary">Cámara de Comercio de Bogotá</p>
                  </div>
                </a>

            
        </div>

          <div className="flex gap-6 text-sm">
            <Link to="/politica-privacidad" className="text-secondary-foreground/60 hover:text-primary transition-colors duration-200">
              Política de Tratamiento de Datos Personales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;