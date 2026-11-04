/**
 * Utilidad de resolución de assets para Minha Beleza
 * Garantiza compatibilidad universal entre:
 * - Entornos locales (Vite dev server en localhost)
 * - GitHub Pages (subdirectorio /minha-beleza/)
 * - Despliegues estáticos y dominios personalizados
 */
export function getAssetUrl(path: string | undefined | null): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Quitar slashes al inicio
  const clean = path.replace(/^\/+/, '');
  const base = import.meta.env.BASE_URL || '/';

  if (base.endsWith('/')) {
    return `${base}${clean}`;
  }
  return `${base}/${clean}`;
}
