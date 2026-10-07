/* El nombre de la categoria llega de dos formas segun el endpoint:
   - GET :lang/news lo devuelve como TEXTO, porque el metadata de la noticia
     trae su propia copia de "category" y pisa la relacion al aplanarse.
   - GET news/featured lo devuelve como OBJETO, con nameEs y nameEn.
   Esta funcion acepta las dos para que los componentes no tengan que saberlo. */
export function nombreCategoria(
  categoria: any,
  locale: string = "es"
): string {
  if (!categoria) return "";
  if (typeof categoria === "string") return categoria;
  return locale === "es"
    ? (categoria.nameEs ?? categoria.nameEn ?? "")
    : (categoria.nameEn ?? categoria.nameEs ?? "");
}
