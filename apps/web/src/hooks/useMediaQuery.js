import { useEffect, useState } from 'react';

/**
 * Hook sincrónico: lee el valor inicial de matchMedia en el primer render
 * para evitar el "flash" de la versión desktop antes de cambiar a móvil.
 */
export function useMediaQuery(query) {
  const getMatch = () =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(query).matches
      : false;

  const [matches, setMatches] = useState(getMatch);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
