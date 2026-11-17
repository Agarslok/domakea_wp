import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import DataField from '@/components/fx/DataField.jsx';
import HistoryVisual from '@/components/about/HistoryVisual.jsx';
import { HISTORY_STEPS, THEME_STYLES } from '@/components/about/historySteps.js';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/** Fracción del tramo de cada fragmento dedicada a iluminar palabras; el resto es pausa invisible antes del cambio. */
const WORD_SCROLL_SHARE = 1 / 3;

const mapScrollToReadingLocal = (segmentLocal) => {
  if (segmentLocal <= WORD_SCROLL_SHARE) {
    return segmentLocal / WORD_SCROLL_SHARE;
  }
  return 1;
};

const ReadingLine = ({ text, local, theme, lead, emphasis, quote, instant, mobile }) => {
  const words = useMemo(() => text.split(/\s+/), [text]);
  const t = THEME_STYLES[theme] || THEME_STYLES.light;

  if (instant) {
    return (
      <p
        className={cn(
          'mx-auto w-full text-balance',
          mobile ? 'px-1 text-justify text-[0.95rem] leading-[1.55] [hyphens:auto]' : 'text-center',
          lead && (mobile ? 'text-[1.35rem] font-bold leading-[1.2]' : 'font-display text-3xl font-bold leading-[1.14] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.2rem]'),
          emphasis && (mobile ? 'text-xl font-bold' : 'font-display text-2xl font-bold md:text-4xl'),
          !lead && !emphasis && !mobile && 'text-lg leading-relaxed md:text-xl',
          quote && !mobile && 'md:text-2xl'
        )}
        aria-label={text}
      >
        {quote && (
          <span className={cn('block mb-3 text-sm text-justify md:text-lg', t.muted)}>
            Como dijo Peter Drucker:{' '}
            <span className="italic text-primary">"La mejor manera de predecir el futuro es crearlo."</span>
          </span>
        )}
        <span className={cn(t.active, mobile && 'block text-justify')}>{text}</span>
      </p>
    );
  }

  return (
    <p
      className={cn(
        'mx-auto max-w-3xl text-center text-balance',
        lead && 'font-display text-3xl font-bold leading-[1.14] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.2rem]',
        emphasis && 'font-display text-2xl font-bold md:text-4xl',
        !lead && !emphasis && 'text-lg leading-relaxed md:text-xl',
        quote && 'md:text-2xl'
      )}
      aria-label={text}
    >
      {quote && (
        <span className={cn('block mb-3 text-base md:text-lg', t.muted)}>
          Como dijo Peter Drucker:{' '}
          <span className="italic text-primary">"La mejor manera de predecir el futuro es crearlo."</span>
        </span>
      )}
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 2.2 / words.length);
        const lit = local >= start;
        const active = local >= start && local < end;
        const opacity = lit ? (active ? 1 : 0.88) : 0.18;

        return (
          <span
            key={`${word}-${i}`}
            className={cn(
              'relative mr-[0.28em] inline-block transition-colors duration-300',
              lit ? t.active : t.dim
            )}
            style={{ opacity }}
          >
            {active && (
              <span
                className={cn('absolute -bottom-0.5 left-0 right-0 h-[0.42em] rounded-sm', t.highlight)}
                aria-hidden
              />
            )}
            <span className="relative z-[1]">{word}</span>
          </span>
        );
      })}
    </p>
  );
};

const HistoryFooter = ({ step, theme, onSelectStep }) => (
  <div className="mt-auto shrink-0 space-y-3 pt-4">
    <div className="mx-auto flex max-w-xl gap-1.5">
      {HISTORY_STEPS.map((s, i) => {
        const barClass = cn(
          'h-1 flex-1 rounded-full transition-colors duration-300',
          i <= step ? theme.barOn : theme.bar
        );
        if (onSelectStep) {
          return (
            <button
              key={s.text.slice(0, 12)}
              type="button"
              aria-label={`Ir al paso ${i + 1}`}
              onClick={() => onSelectStep(i)}
              className={cn(barClass, 'cursor-pointer')}
            />
          );
        }
        return <span key={s.text.slice(0, 12)} className={barClass} aria-hidden />;
      })}
    </div>
  </div>
);

/* ── Móvil: pantalla fija, toque para avanzar (sin scroll largo ni parpadeos) ── */

const SWIPE_MIN = 44;

const HistoryExperienceMobile = () => {
  const sectionRef = useRef(null);
  const touchStart = useRef(null);
  const last = HISTORY_STEPS.length - 1;
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const item = HISTORY_STEPS[step];
  const theme = THEME_STYLES[item.theme] || THEME_STYLES.light;
  const hasImage = Boolean(item.image?.src);

  const goNext = useCallback(() => {
    setStep((prev) => {
      if (prev >= last) return prev;
      setDirection(1);
      return prev + 1;
    });
  }, [last]);

  const goPrev = useCallback(() => {
    setStep((prev) => {
      if (prev <= 0) return prev;
      setDirection(-1);
      return prev - 1;
    });
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const onTouchStart = (e) => {
      const t = e.touches[0];
      touchStart.current = { x: t.clientX, y: t.clientY };
    };

    const onTouchEnd = (e) => {
      const start = touchStart.current;
      touchStart.current = null;
      if (!start) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) goNext();
      else goPrev();
    };

    node.addEventListener('touchstart', onTouchStart, { passive: true });
    node.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      node.removeEventListener('touchstart', onTouchStart);
      node.removeEventListener('touchend', onTouchEnd);
    };
  }, [goNext, goPrev]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative flex w-full flex-col overflow-x-hidden md:hidden',
        'min-h-[100dvh] pb-[calc(5.75rem+env(safe-area-inset-bottom))] pt-[calc(4.5rem+env(safe-area-inset-top))]',
        'transition-colors duration-500',
        theme.bg
      )}
      aria-label="Nuestra historia"
    >
      <div className="relative flex min-h-0 flex-1 flex-col">
        {item.theme === 'dark' && <DataField className="opacity-20" density={0.45} />}

        <div className="relative z-[1] mx-auto flex h-full w-full max-w-lg flex-1 flex-col px-4">
          <p className={cn('mono-label mb-3 shrink-0 text-center', theme.muted)}>
            {step + 1} · {HISTORY_STEPS.length}
          </p>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 28 : -28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.14}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -SWIPE_MIN) goNext();
                  else if (info.offset.x > SWIPE_MIN) goPrev();
                }}
                className="flex w-full max-w-full flex-col items-center gap-4 overflow-hidden"
              >
                {hasImage && (
                  <div className="flex w-full shrink-0 justify-center">
                    <HistoryVisual image={item.image} theme={item.theme} compact interactive={false} />
                  </div>
                )}
                <ReadingLine
                  text={item.text}
                  local={1}
                  theme={item.theme}
                  lead={item.lead}
                  emphasis={item.emphasis}
                  quote={item.quote}
                  instant
                  mobile
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <HistoryFooter step={step} theme={theme} />

          <div className="mt-2 flex shrink-0 items-center justify-center gap-3 pb-1">
            <button
              type="button"
              onClick={goPrev}
              disabled={step === 0}
              aria-label="Anterior"
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full border transition-colors',
                step === 0 ? 'border-transparent opacity-25' : 'border-current/15 active:bg-black/10',
                theme.muted
              )}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={step === last}
              aria-label="Siguiente"
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full border transition-colors',
                step === last ? 'border-transparent opacity-25' : 'border-current/15 active:bg-black/10',
                theme.muted
              )}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Desktop: scroll con lectura palabra a palabra ── */

const HistoryExperienceDesktop = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const [step, setStep] = useState(0);
  const [local, setLocal] = useState(0);
  const last = HISTORY_STEPS.length - 1;
  const item = HISTORY_STEPS[step];
  const theme = THEME_STYLES[item.theme] || THEME_STYLES.light;
  const hasImage = Boolean(item.image?.src);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const scaled = v * HISTORY_STEPS.length;
    const s = Math.min(last, Math.max(0, Math.floor(scaled)));
    const segmentLocal = scaled - s;
    setStep((p) => (p === s ? p : s));
    setLocal(mapScrollToReadingLocal(segmentLocal));
  });

  const bgFade = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      style={{ height: `${HISTORY_STEPS.length * 100}dvh` }}
      className="relative hidden w-full max-w-full overflow-x-clip md:block"
      aria-label="Nuestra historia"
    >
      <div
        className={cn(
          'sticky top-0 flex h-screen max-h-screen flex-col overflow-hidden transition-colors duration-700',
          theme.bg
        )}
      >
        {item.theme === 'dark' && <DataField className="opacity-30" density={0.55} />}
        {item.theme === 'gold' && (
          <motion.div
            style={{ opacity: bgFade }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,0,0,0.08),transparent_50%)]"
          />
        )}

        <div className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col px-5 pb-24 pt-32 sm:px-8">
          <p className={cn('mono-label mb-6 text-center', theme.muted)}>
            {step + 1} · {HISTORY_STEPS.length}
          </p>

          <div
            className={cn(
              'flex flex-1 flex-col items-center justify-center',
              hasImage ? 'lg:grid lg:grid-cols-12 lg:gap-10' : 'w-full'
            )}
          >
            <div
              className={cn(
                'flex w-full flex-col items-center justify-center',
                hasImage ? 'lg:col-span-7' : 'max-w-4xl px-2'
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                >
                  <ReadingLine
                    text={item.text}
                    local={local}
                    theme={item.theme}
                    lead={item.lead}
                    emphasis={item.emphasis}
                    quote={item.quote}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {hasImage && (
              <div className="mt-10 flex w-full items-center justify-center lg:col-span-5 lg:mt-0">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`vis-${step}`}
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(16px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
                    transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                    className="flex w-full justify-center"
                  >
                    <HistoryVisual image={item.image} theme={item.theme} />
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>

          <HistoryFooter step={step} theme={theme} />
          <p className={cn('mono-label text-center', theme.muted)}>Sigue deslizando</p>
        </div>
      </div>
    </section>
  );
};

const HistoryExperience = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <>
      {isMobile ? <HistoryExperienceMobile /> : <HistoryExperienceDesktop />}
    </>
  );
};

export default HistoryExperience;