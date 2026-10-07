"use client";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { AlertCircle } from "lucide-react";
import { HashLoader } from "react-spinners";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Editor from "@/components/admin/tools/rich-editor/config";
import TextEditor from "@/components/admin/tools/rich-editor/rich-editor";
import {
  Newsletter,
  createNewsletter,
  editNewsletter,
} from "@/services/newsletter/service";

interface Props {
  open: boolean;
  onClose: () => void;
  update: () => void;
  newsletter?: Newsletter;
}

export function NewsletterModal({ open, onClose, update, newsletter }: Props) {
  const { user } = useUser();
  const [title, setTitle] = useState(newsletter?.title ?? "");
  const [titleEn, setTitleEn] = useState(newsletter?.titleEn ?? "");
  const [subject, setSubject] = useState(newsletter?.subject ?? "");
  const [tags, setTags] = useState((newsletter?.tags ?? []).join(", "));
  const [scheduledAt, setScheduledAt] = useState(
    newsletter?.scheduledSendDate
      ? new Date(newsletter.scheduledSendDate).toISOString().slice(0, 16)
      : ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const editor = Editor({
    placeholder: "Escriba aquí el contenido que recibirán los suscriptores...",
    content: newsletter?.html ?? "",
  });

  useEffect(() => {
    if (newsletter?.html && editor) {
      editor.commands.setContent(newsletter.html);
    }
  }, [newsletter?.html]);

  const handleSave = async () => {
    const hasContent = !!editor?.getText()?.trim();
    if (!title || !subject || !hasContent) {
      setError(true);
      return;
    }
    if (!user) return;
    setLoading(true);
    const body: Partial<Newsletter> = {
      title,
      subject,
      html: editor!.getHTML(),
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    if (titleEn) body.titleEn = titleEn;
    // Con fecha, el boletin queda programado y la tarea del servidor lo envia
    // sola al llegar el momento. Sin fecha, vuelve a borrador.
    if (scheduledAt) {
      body.scheduledSendDate = new Date(scheduledAt).toISOString();
      body.state = "scheduled";
    } else if (newsletter?.state === "scheduled") {
      body.scheduledSendDate = null as any;
      body.state = "draft";
    }
    const ok = newsletter
      ? await editNewsletter(newsletter.id, body, update, user.sub as string)
      : await createNewsletter(body, update, user.sub as string);
    setLoading(false);
    if (ok) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && !loading && onClose()}>
      {/* sm:max-w-lg viene en la base del dialogo y, por ser variante
          responsiva, gana sobre un max-w- sin variante: hay que pisarlo
          con la misma variante o el modal se queda estrecho. */}
      <DialogContent className="flex h-[92vh] w-[97vw] max-w-none flex-col gap-4 overflow-x-hidden overflow-y-auto p-6 font-montserrat text-black sm:max-w-[1400px]">
        <h2 className="font-opensans text-2xl font-extrabold uppercase text-blue-900">
          {newsletter ? "Editar noticia" : "Nueva noticia"}
        </h2>

        <div className="grid min-w-0 gap-4">
          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="nl-title" className="font-montserrat font-semibold text-blue-950">
                Título (ES) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nl-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título de la noticia"
              />
              {error && !title && (
                <p className="flex items-center gap-1 text-xs text-red-500">
                  <AlertCircle className="size-3.5" /> El título es obligatorio.
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="nl-title-en" className="font-montserrat font-semibold text-blue-950">Título (EN)</Label>
              <Input
                id="nl-title-en"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="Newsletter title"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="nl-subject" className="font-montserrat font-semibold text-blue-950">
              Asunto del correo <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nl-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Asunto que verán los suscriptores"
            />
            {error && !subject && (
              <p className="flex items-center gap-1 text-xs text-red-500">
                <AlertCircle className="size-3.5" /> El asunto es obligatorio.
              </p>
            )}
          </div>

          {/* Etiquetas y programacion comparten fila: son cortos y asi el
              formulario cabe sin tanto desplazamiento. */}
          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-1.5">
              <Label htmlFor="nl-tags" className="font-montserrat font-semibold text-blue-950">
                Etiquetas{" "}
                <span className="text-xs text-gray-400">
                  (separadas por coma)
                </span>
              </Label>
              <Input
                id="nl-tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="tecnología, exportación, ..."
              />
            </div>

            <div className="flex min-w-0 flex-col gap-1.5">
              <Label htmlFor="nl-scheduled" className="font-montserrat font-semibold text-blue-950">
                Programar envío{" "}
                <span className="text-xs text-gray-400">(opcional)</span>
              </Label>
              <Input
                id="nl-scheduled"
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Con fecha y hora, la noticia se envía sola en ese momento.
                Vacío, queda en borrador para enviarlo a mano.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="font-montserrat font-semibold text-blue-950">
              Contenido <span className="text-red-500">*</span>
            </Label>
            <div className="min-w-0 [&_.ProseMirror]:min-h-[320px]">
              <TextEditor editor={editor} />
            </div>
            {error && !editor?.getText()?.trim() && (
              <p className="flex items-center gap-1 text-xs text-red-500">
                <AlertCircle className="size-3.5" /> El contenido es obligatorio.
              </p>
            )}
          </div>
        </div>

        <div className="mt-auto flex justify-end gap-3 border-t pt-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-dark text-white"
          >
            {loading ? (
              <HashLoader size={16} />
            ) : newsletter ? (
              "Actualizar"
            ) : (
              "Crear noticia"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
