/**
 * Lleva al primer campo con error dentro del formulario (útil en móvil).
 */
export function scrollToFirstFormError(errors) {
  const firstKey = Object.keys(errors)[0];
  if (!firstKey || typeof document === 'undefined') return;

  const byName = document.querySelector(`[name="${firstKey}"]`);
  if (byName) {
    byName.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (typeof byName.focus === 'function') byName.focus({ preventScroll: true });
    return;
  }

  const byData = document.querySelector(`[data-form-field="${firstKey}"]`);
  if (byData) {
    byData.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}