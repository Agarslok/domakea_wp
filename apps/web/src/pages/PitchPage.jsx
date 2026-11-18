import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * Presentación interactiva (deck estático en public/pitch-deck).
 * Ruta React para que /pitch no caiga en el 404 del SPA en dev ni en producción.
 */
const PitchPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const exit = () => navigate('/');

    const onMessage = (event) => {
      if (event.data?.type === 'pitch-exit') exit();
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        exit();
        return;
      }
      const next = event.key === 'ArrowRight' || event.key === 'ArrowDown';
      const prev = event.key === 'ArrowLeft' || event.key === 'ArrowUp';
      if (!next && !prev) return;
      event.preventDefault();
      const frame = document.getElementById('pitch-deck');
      frame?.contentWindow?.postMessage(
        { type: next ? 'pitch-next' : 'pitch-prev' },
        window.location.origin,
      );
    };

    window.addEventListener('message', onMessage);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('message', onMessage);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Pitch · DOMAKEA × Cámara de Comercio de Bogotá</title>
        <meta
          name="description"
          content="Presentación DOMAKEA: datos, inteligencia comercial y finanzas para pymes."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="fixed inset-0 z-[100] bg-[#121212]">
        <iframe
          id="pitch-deck"
          title="Pitch DOMAKEA — presentación"
          src="/pitch-deck/index.html"
          className="h-full w-full border-0"
          allowFullScreen
        />

        {/* Capa fuera del iframe: solo la flecha, sin texto ni marca Pitch */}
        <div
          className="pointer-events-none absolute inset-0 z-[110]"
        >
          <Link
            to="/"
            aria-label="Volver al inicio"
            className="pointer-events-auto absolute left-2 top-[max(0.5rem,env(safe-area-inset-top))] flex h-11 w-11 items-center justify-center rounded-full text-[#5c5c66] transition-colors hover:bg-white/5 hover:text-[#8a8a94] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ArrowLeft className="h-6 w-6" strokeWidth={2} aria-hidden />
          </Link>
        </div>
      </div>
    </>
  );
};

export default PitchPage;