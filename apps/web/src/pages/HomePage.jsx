import React from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import MobileHome from '@/components/mobile/MobileHome.jsx';
import DesktopHome from '@/components/home/DesktopHome.jsx';

// Móvil (< 768px): experiencia tipo app. Desktop: versión amplia con las mismas secciones.
// Ambas comparten el campo de datos interactivo, el vidrio líquido y las animaciones.
// (El Home original quedó respaldado en _backup_antes_rediseno_movil/HomePage.jsx)
const HomePage = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  return isMobile ? <MobileHome /> : <DesktopHome />;
};

export default HomePage;
