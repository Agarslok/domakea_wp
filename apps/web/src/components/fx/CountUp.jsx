import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

/** Número que "cuenta" hasta su valor cuando entra en pantalla ("+28%", "-22%", "4 sem"...). */
const CountUp = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const match = String(value).match(/^([^\d]*)(\d+(?:\.\d+)?)([^\d]*)$/);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || !match) return undefined;
    const controls = animate(0, parseFloat(match[2]), {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setN(v),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value]);

  if (!match) return <span ref={ref}>{value}</span>;
  const decimals = (match[2].split('.')[1] || '').length;
  return (
    <span ref={ref}>
      {match[1]}
      {n.toFixed(decimals)}
      {match[3]}
    </span>
  );
};

export default CountUp;
