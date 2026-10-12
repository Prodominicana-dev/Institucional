"use client";
import { AlertCircle, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextEditor from "@/components/admin/tools/rich-editor/rich-editor";

/* Pasos 2 y 3 del formulario de Noticias Pro: el contenido en espanol y en
   ingles. Son iguales en crear y en editar; la unica diferencia es que al
   editar se les pasa el texto que ya tenia la noticia. */
export function PasoIdiomaPro({
  idioma,
  titulo,
  setTitulo,
  minidescription,
  content,
  descriptionPrevia,
  contentPrevio,
  warningAlert,
}: {
  idioma: "es" | "en";
  titulo: string;
  setTitulo: (v: string) => void;
  minidescription: any;
  content: any;
  descriptionPrevia?: string;
  contentPrevio?: string;
  warningAlert: boolean;
}) {
  const es = idioma === "es";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-start gap-2.5 rounded-xl border bg-muted/30 p-3.5 text-sm text-muted-foreground">
        <Info className="mt-0.5 size-4 shrink-0" />
        {es
          ? "Completa el contenido en español. En el siguiente paso escribirás la misma noticia en inglés."
          : "Ahora escribe el mismo contenido, pero en inglés."}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={`tituloPro-${idioma}`}>
          {es ? "Título" : "Título en inglés"}{" "}
          <span className="text-destructive">*</span>
        </Label>
        <Input
          id={`tituloPro-${idioma}`}
          onChange={(e) => setTitulo(e.target.value)}
          value={titulo}
          placeholder="Título de la noticia"
          className="h-11 rounded-xl px-4 text-base shadow-sm"
        />
        {warningAlert && !titulo && (
          <p className="flex items-center gap-1 text-xs text-destructive">
            <AlertCircle className="size-3.5" />{" "}
            {es
              ? "El título es obligatorio."
              : "El título en inglés es obligatorio."}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>
          {es
            ? "Breve descripción de la noticia"
            : "Breve descripción de la noticia en inglés"}
        </Label>
        <TextEditor
          editor={minidescription}
          number={15}
          description={descriptionPrevia}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>
          {es ? "Cuerpo de la noticia" : "Cuerpo de la noticia en inglés"}{" "}
          <span className="text-destructive">*</span>
        </Label>
        <TextEditor editor={content} description={contentPrevio} />
        {warningAlert && !content?.getText() && (
          <p className="flex items-center gap-1 text-xs text-destructive">
            <AlertCircle className="size-3.5" />{" "}
            {es
              ? "El cuerpo de la noticia es obligatorio."
              : "El cuerpo de la noticia en inglés es obligatorio."}
          </p>
        )}
      </div>
    </div>
  );
}
