/* El prefijo de idioma de las rutas de Noticias Pro. localePrefix es
   "as-needed" y /noticias-pro no esta en el mapa de pathnames, asi que el
   espanol va sin prefijo y el ingles con /en. Unica definicion. */
export function prefijoIdioma(locale: string): string {
  return locale === "en" ? "/en" : "";
}

/* A donde lleva una noticia de Noticias Pro: al enlace que escribio el
   redactor si lo puso, y si no al detalle DENTRO de Noticias Pro. Antes iba a
   /news/{id}, el detalle del portal, y el lector salia del apartado.
   Devuelve las props tal cual para <Link {...enlaceNoticia(item, locale)}>. */
export function enlaceNoticia(
  item: { id: string; link?: string },
  locale: string = "es"
) {
  const externo = Boolean(item.link);
  return {
    href: externo
      ? (item.link as string)
      : `${prefijoIdioma(locale)}/noticias-pro/${item.id}`,
    target: externo ? "_blank" : undefined,
    rel: externo ? "noopener noreferrer" : undefined,
  };
}
