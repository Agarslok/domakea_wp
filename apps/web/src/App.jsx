import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from "./components/ui/sonner";
import ScrollToTop from './components/ScrollToTop';
import { ContentProvider } from "./contexts/ContentContext";
import HomePage from './pages/HomePage.jsx';
import ServiciosPage from './pages/ServiciosPage.jsx';
import PortafolioPage from './pages/PortafolioPage.jsx';
import SobreNosotrosPage from './pages/SobreNosotrosPage.jsx';
import ContactoPage from './pages/ContactoPage.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import PartnersPage from './pages/PartnersPage.jsx';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad.jsx';

function App() {
  return (
    <ContentProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/portafolio" element={<PortafolioPage />} />
          <Route path="/sobre-nosotros" element={<SobreNosotrosPage />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-background">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
                <p className="text-muted-foreground mb-6">La página que buscas no existe.</p>
                <a href="/" className="text-primary hover:underline">Volver al inicio</a>
              </div>
            </div>
          } />
        </Routes>
        <Toaster />
      </Router>
    </ContentProvider>
  );
}

export default App;