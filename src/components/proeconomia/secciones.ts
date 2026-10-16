/* Unica definicion de las secciones de Noticias Pro. La usan la barra de la
   pagina publica, el desplegable de las portadas en el admin y el filtrado.

   "key" es ademas el valor que se guarda en la portada y el texto que se
   busca DENTRO del nombre de la categoria de una noticia, por eso va en
   minuscula y en singular: asi "Mision internacional" cae en Internacionales
   sin renombrar nada.

   La seccion que se rotula "Economicas" conserva la clave "finanzas": es el
   valor que ya esta guardado en las noticias y en las portadas, y cambiarlo
   las dejaria fuera de la seccion. Solo cambio el rotulo. */
export const SECCIONES = [
  { key: "exportación", labelKey: "categories.exportacion", nombre: "Exportación" },
  { key: "inversión", labelKey: "categories.inversion", nombre: "Inversión" },
  { key: "internacional", labelKey: "categories.internacionales", nombre: "Internacionales" },
  { key: "finanzas", labelKey: "categories.finanzas", nombre: "Económicas" },
  { key: "turismo", labelKey: "categories.turismo", nombre: "Turismo" },
];

/* La etiqueta de las tarjetas, las miniaturas, la destacada y el detalle
   rotula la SECCION, no la categoria del portal: la categoria no se elige al
   publicar en Noticias Pro. Devuelve la clave de traduccion, o null si la
   noticia no lleva una seccion conocida. */
export function rotuloSeccion(seccion?: string): string | null {
  return SECCIONES.find((s) => s.key === seccion)?.labelKey ?? null;
}
