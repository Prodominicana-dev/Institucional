"use client";
import Editor from "@/components/admin/tools/rich-editor/config";

/* Los cuatro editores de texto de una noticia: descripcion y cuerpo, en
   espanol y en ingles. */
export function useEditoresPro() {
  const minidescriptionEs = Editor({
    placeholder: "Breve descripción...",
    contentEs: "",
  });
  const contentEs = Editor({
    placeholder: "Contenido de la noticia...",
    contentEs: "",
  });
  const minidescriptionEn = Editor({
    placeholder: "Breve descripción en inglés...",
    contentEs: "",
  });
  const contentEn = Editor({
    placeholder: "Contenido de la noticia en inglés...",
    contentEs: "",
  });

  return { minidescriptionEs, contentEs, minidescriptionEn, contentEn };
}
