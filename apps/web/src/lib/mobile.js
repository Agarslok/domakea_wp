export const WHATSAPP_NUMBER = '3018547895';

/** Enlace de WhatsApp (mismo formato que ya usa el sitio) con mensaje prellenado opcional. */
export const waLink = (text) =>
  `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text${
    text ? `=${encodeURIComponent(text)}` : ''
  }&type=phone_number&app_absent=0`;

/** Vibración sutil (solo en dispositivos que la soportan) para dar feedback táctil. */
export const haptic = (ms = 8) => {
  try {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(ms);
  } catch {
    /* sin soporte */
  }
};

/** "DomaAdvisory | Consultoría" -> { name: 'DomaAdvisory', tag: 'Consultoría' } */
export const splitCategory = (category = '') => {
  const [name, tag] = category.split('|').map((s) => s.trim());
  return { name, tag };
};
