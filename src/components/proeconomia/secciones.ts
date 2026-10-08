/* Unica definicion de las secciones de Noticias Pro. La usan la barra de la
   pagina publica, el desplegable de las portadas en el admin y el filtrado.

   "key" es ademas el valor que se guarda en la portada y el texto que se
   busca DENTRO del nombre de la categoria de una noticia, por eso va en
   minuscula y en singular: asi "Mision internacional" cae en Internacionales
   sin renombrar nada. */
export const SECCIONES = [
  { key: "exportación", labelKey: "categories.exportacion", nombre: "Exportación" },
  { key: "inversión", labelKey: "categories.inversion", nombre: "Inversión" },
  { key: "internacional", labelKey: "categories.internacionales", nombre: "Internacionales" },
  { key: "finanzas", labelKey: "categories.finanzas", nombre: "Finanzas" },
];
