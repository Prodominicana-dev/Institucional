/* El prefijo de idioma de las rutas de Noticias Pro. localePrefix es
   "as-needed" y /noticias-pro no esta en el mapa de pathnames, asi que el
   espanol va sin prefijo y el ingles con /en. Unica definicion. */
export function prefijoIdioma(locale: string): string {
  return locale === "en" ? "/en" : "";
}

/* Un enlace escrito a mano puede venir sin esquema ("listindiario.com/..."):
   asi el navegador lo tomaria como ruta del propio portal y acabaria en un 404
   de prodominicana. Devuelve undefined si no hay enlace. Unica definicion. */
export function urlExterna(link?: string): string | undefined {
  const limpio = link?.trim();
  if (!limpio) return undefined;
  return /^https?:\/\//i.test(limpio) ? limpio : `https://${limpio}`;
}

/* A donde lleva una noticia de Noticias Pro: al enlace que escribio el
   redactor si lo puso, y si no al detalle DENTRO de Noticias Pro. Antes iba a
   /news/{id}, el detalle del portal, y el lector salia del apartado.
   Devuelve las props tal cual para <Link {...enlaceNoticia(item, locale)}>. */
export function enlaceNoticia(
  item: { id: string; link?: string },
  locale: string = "es"
) {
  const externo = urlExterna(item.link);
  return {
    href: externo ?? `${prefijoIdioma(locale)}/noticias-pro/${item.id}`,
    target: externo ? "_blank" : undefined,
    rel: externo ? "noopener noreferrer" : undefined,
  };
}
