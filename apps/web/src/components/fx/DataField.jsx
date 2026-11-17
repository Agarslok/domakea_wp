import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * DataField — fondo interactivo de DOMAKEA.
 *
 * Idea: datos dispersos que se organizan alrededor del cursor.
 *  · Una matriz de puntos (datos ordenados) que se enciende y se "estira" cerca del cursor.
 *  · Nodos flotantes (datos sueltos) que el cursor atrae y conecta con líneas amarillas,
 *    formando constelaciones / redes.
 *  · Clic o toque: onda expansiva que reacomoda los nodos.
 *  · Sin cursor (celular o inactivo): un "cursor fantasma" recorre el lienzo para que siempre esté vivo.
 */
const YELLOW = '255,195,15';
const WHITE = '255,255,255';

const DataField = ({ className, density = 1, grid = true }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const host = canvas.parentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let nodes = [];
    let dots = [];
    const ripples = [];
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, last: 0, ghost: true };
    let gap = 36;

    const build = () => {
      const small = w < 640;
      gap = small ? 28 : 36;

      // Matriz de puntos
      dots = [];
      if (grid) {
        const cols = Math.ceil(w / gap) + 1;
        const rows = Math.ceil(h / gap) + 1;
        const ox = (w - (cols - 1) * gap) / 2;
        const oy = (h - (rows - 1) * gap) / 2;
        for (let r = 0; r < rows; r += 1) {
          for (let c = 0; c < cols; c += 1) dots.push({ x: ox + c * gap, y: oy + r * gap });
        }
      }

      // Nodos flotantes
      const count = Math.max(24, Math.min(small ? 46 : 96, Math.round(((w * h) / (small ? 15000 : 17000)) * density)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1.4 + Math.random() * 2,
        warm: Math.random() < 0.38,
      }));
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    const toLocal = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top, inside: clientY >= rect.top && clientY <= rect.bottom };
    };

    const onMove = (e) => {
      const p = toLocal(e.clientX, e.clientY);
      if (!p.inside) return;
      pointer.tx = p.x;
      pointer.ty = p.y;
      pointer.last = performance.now();
      pointer.ghost = false;
    };
    const onTouch = (e) => {
      const t = e.touches[0];
      if (t) onMove({ clientX: t.clientX, clientY: t.clientY });
    };
    const onDown = (e) => {
      const p = toLocal(e.clientX, e.clientY);
      if (!p.inside) return;
      ripples.push({ x: p.x, y: p.y, t: performance.now() });
      nodes.forEach((n) => {
        const dx = n.x - p.x;
        const dy = n.y - p.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < 320) {
          const f = (1 - d / 320) * 6;
          n.vx += (dx / d) * f;
          n.vy += (dy / d) * f;
        }
      });
    };

    const draw = (now) => {
      // Cursor fantasma cuando no hay interacción
      if (now - pointer.last > 2600) {
        pointer.ghost = true;
        pointer.tx = w * (0.5 + 0.34 * Math.sin(now * 0.00042));
        pointer.ty = h * (0.48 + 0.26 * Math.sin(now * 0.00061 + 1.3));
      }
      const ease = pointer.ghost ? 0.035 : 0.14;
      if (pointer.x < -9000) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
      pointer.x += (pointer.tx - pointer.x) * ease;
      pointer.y += (pointer.ty - pointer.y) * ease;
      const px = pointer.x;
      const py = pointer.y;

      ctx.clearRect(0, 0, w, h);

      // Resplandor del cursor
      const glowR = Math.max(w, h) * 0.22 + 80;
      const glow = ctx.createRadialGradient(px, py, 0, px, py, glowR);
      glow.addColorStop(0, `rgba(${YELLOW},${pointer.ghost ? 0.1 : 0.2})`);
      glow.addColorStop(1, `rgba(${YELLOW},0)`);
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Matriz de puntos reactiva
      const reach = 210;
      for (let i = 0; i < dots.length; i += 1) {
        const d = dots[i];
        const dx = d.x - px;
        const dy = d.y - py;
        const dist = Math.hypot(dx, dy);
        if (dist < reach) {
          const k = 1 - dist / reach;
          const push = k * k * 14;
          const x = d.x + (dx / (dist || 1)) * push;
          const y = d.y + (dy / (dist || 1)) * push;
          ctx.fillStyle = `rgba(${YELLOW},${0.18 + k * 0.8})`;
          ctx.beginPath();
          ctx.arc(x, y, 0.9 + k * 2.4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(${WHITE},0.11)`;
          ctx.fillRect(d.x - 0.6, d.y - 0.6, 1.2, 1.2);
        }
      }

      // Ondas de clic
      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        const r = ripples[i];
        const age = (now - r.t) / 1100;
        if (age >= 1) {
          ripples.splice(i, 1);
        } else {
          ctx.strokeStyle = `rgba(${YELLOW},${(1 - age) * 0.55})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(r.x, r.y, age * 340, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Nodos: física
      const attract = 260;
      for (let i = 0; i < nodes.length; i += 1) {
        const n = nodes[i];
        const dx = px - n.x;
        const dy = py - n.y;
        const dist = Math.hypot(dx, dy);
        if (dist < attract) {
          const f = (1 - dist / attract) * 0.055;
          n.vx += (dx / (dist || 1)) * f;
          n.vy += (dy / (dist || 1)) * f;
          // Órbita suave para que no colapsen sobre el cursor
          if (dist < 70) {
            n.vx -= (dx / (dist || 1)) * 0.12;
            n.vy -= (dy / (dist || 1)) * 0.12;
          }
        }
        n.vx *= 0.985;
        n.vy *= 0.985;
        const sp = Math.hypot(n.vx, n.vy);
        if (sp < 0.12) {
          n.vx += (Math.random() - 0.5) * 0.04;
          n.vy += (Math.random() - 0.5) * 0.04;
        }
        if (sp > 3) {
          n.vx = (n.vx / sp) * 3;
          n.vy = (n.vy / sp) * 3;
        }
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -10) n.x = w + 10;
        else if (n.x > w + 10) n.x = -10;
        if (n.y < -10) n.y = h + 10;
        else if (n.y > h + 10) n.y = -10;
      }

      // Conexiones entre nodos
      const link = w < 640 ? 100 : 128;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        const da = Math.hypot(a.x - px, a.y - py);
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (dx > link || dx < -link || dy > link || dy < -link) continue;
          const d = Math.hypot(dx, dy);
          if (d > link) continue;
          const near = da < attract || Math.hypot(b.x - px, b.y - py) < attract;
          const alpha = (1 - d / link) * (near ? 0.65 : 0.16);
          ctx.strokeStyle = `rgba(${near ? YELLOW : WHITE},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        // Línea hacia el cursor
        if (da < 190) {
          ctx.strokeStyle = `rgba(${YELLOW},${(1 - da / 190) * 0.55})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(px, py);
          ctx.stroke();
        }
      }

      // Nodos: dibujo
      for (let i = 0; i < nodes.length; i += 1) {
        const n = nodes[i];
        const dist = Math.hypot(n.x - px, n.y - py);
        const hot = dist < attract;
        ctx.fillStyle = hot || n.warm ? `rgba(${YELLOW},${hot ? 0.95 : 0.75})` : `rgba(${WHITE},0.5)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + (hot ? (1 - dist / attract) * 1.6 : 0), 0, Math.PI * 2);
        ctx.fill();
      }

      // Cursor
      ctx.strokeStyle = `rgba(${YELLOW},0.9)`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = `rgba(${YELLOW},1)`;
      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fill();
    };

    const loop = (now) => {
      if (visible) draw(now);
      raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(host);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });

    if (reduceMotion) {
      draw(performance.now());
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [density, grid]);

  return <canvas ref={canvasRef} aria-hidden className={cn('pointer-events-none absolute inset-0 h-full w-full', className)} />;
};

export default DataField;
