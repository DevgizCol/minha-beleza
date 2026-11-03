/**
 * Selector de Divisa Dinámico (COP / USD / EUR)
 * Estándar para Spas y Clínicas de Alta Gama con clientela internacional.
 */

export type CurrencyCode = 'COP' | 'USD' | 'EUR';

// Tasas de cambio de referencia para visualización inmediata (actualizables)
const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  COP: 1,
  USD: 1 / 4150,
  EUR: 1 / 4480
};

export const formatCurrency = (amountInCop: number, currency: CurrencyCode = 'COP'): string => {
  const converted = amountInCop * (EXCHANGE_RATES[currency] || 1);

  if (currency === 'COP') {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(converted);
  }

  return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'de-DE', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0
  }).format(converted);
};
