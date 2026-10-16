"use client";
import Editor from "@/components/admin/tools/rich-editor/config";

/* Los dos editores de texto de una noticia: el cuerpo en espanol y en
   ingles. La breve descripcion ya no se pide en el panel de Noticias Pro. */
export function useEditoresPro() {
  const contentEs = Editor({
    placeholder: "Contenido de la noticia...",
    contentEs: "",
  });
  const contentEn = Editor({
    placeholder: "Contenido de la noticia en inglés...",
    contentEs: "",
  });

  return { contentEs, contentEn };
}
