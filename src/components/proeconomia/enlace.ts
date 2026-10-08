/* A donde lleva una noticia de Noticias Pro: al enlace que escribio el
   redactor si lo puso, y si no al detalle de la noticia en el portal.
   Devuelve las props tal cual para <Link {...enlaceNoticia(item)}>. */
export function enlaceNoticia(item: { id: string; link?: string }) {
  const externo = Boolean(item.link);
  return {
    href: externo ? (item.link as string) : `/news/${item.id}`,
    target: externo ? "_blank" : undefined,
    rel: externo ? "noopener noreferrer" : undefined,
  };
}
