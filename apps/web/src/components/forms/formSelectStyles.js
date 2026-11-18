import { cn } from '@/lib/utils';

/** Trigger multilínea en móvil (anula nowrap del componente base). */
export const FORM_SELECT_TRIGGER = cn(
  'h-auto min-h-12 py-3',
  'items-start whitespace-normal text-left',
  '[&>span]:line-clamp-none [&>span]:w-[calc(100%-1.25rem)]',
);

/** Panel del desplegable: ancho seguro en pantalla táctil. */
export const FORM_SELECT_CONTENT = cn(
  'z-[260] max-h-[min(50dvh,22rem)]',
  'w-[min(calc(100vw-1.25rem),24rem)] sm:w-[var(--radix-select-trigger-width)]',
);

export const FORM_SELECT_ITEM = 'items-start py-2.5 pl-3 pr-9 text-left whitespace-normal break-words';