"use client";
import { useState, useRef } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { FileWithPath, IMAGE_MIME_TYPE, Dropzone } from "@mantine/dropzone";
import { UploadCloud, AlertCircle } from "lucide-react";
import { HashLoader } from "react-spinners";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { compressImage } from "@/lib/image-compression";
import {
  NewspaperCover,
  createNewspaperCover,
  editNewspaperCover,
} from "@/services/newspaper-cover/service";

interface Props {
  open: boolean;
  onClose: () => void;
  update: () => void;
  cover?: NewspaperCover;
}

export function CoverModal({ open, onClose, update, cover }: Props) {
  const { user } = useUser();
  const [media, setMedia] = useState(cover?.media ?? "");
  const [link, setLink] = useState(cover?.link ?? "");
  const [date, setDate] = useState(
    cover?.date ? cover.date.substring(0, 10) : new Date().toISOString().substring(0, 10)
  );
  const [file, setFile] = useState<FileWithPath | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const openRef = useRef<() => void>(null);

  const existingImg = cover
    ? `${process.env.NEXT_PUBLIC_API_URL}/newspaper-cover/${cover.id}/img/${cover.image}`
    : undefined;
  const previewSrc = file ? URL.createObjectURL(file) : existingImg;

  const handleSave = async () => {
    if (!media || !date || (!file && !cover)) {
      setError(true);
      return;
    }
    if (!user) return;
    setLoading(true);
    const uploadFile = file ? await compressImage(file) : null;
    const formData = new FormData();
    formData.append("media", media);
    formData.append("date", date);
    if (link) formData.append("link", link);
    if (uploadFile) formData.append("images", uploadFile);
    const ok = cover
      ? await editNewspaperCover(cover.id, formData, update, user.sub as string)
      : await createNewspaperCover(formData, update, user.sub as string);
    setLoading(false);
    if (ok) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && !loading && onClose()}>
      <DialogContent className="max-w-lg font-montserrat text-black">
        <DialogTitle className="text-xl font-bold">
          {cover ? "Editar portada" : "Nueva portada"}
        </DialogTitle>
        <DialogDescription className="text-sm text-gray-500">
          {cover ? "Actualice los datos de la portada." : "Complete los datos de la portada diaria."}
        </DialogDescription>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>
              Imagen {!cover && <span className="text-red-500">*</span>}
            </Label>
            <Dropzone
              openRef={openRef}
              onDrop={(f) => setFile(f[0])}
              accept={IMAGE_MIME_TYPE}
              maxSize={10 * 1024 * 1024}
              multiple={false}
              activateOnClick
              className="relative flex h-40 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-colors hover:border-blue-dark/40"
            >
              {previewSrc ? (
                <Image
                  src={previewSrc}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <UploadCloud className="size-8" />
                  <span className="text-sm">Arrastra o haz clic para seleccionar</span>
                </div>
              )}
            </Dropzone>
            {error && !file && !cover && (
              <p className="flex items-center gap-1 text-xs text-red-500">
                <AlertCircle className="size-3.5" /> La imagen es obligatoria.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cv-media">
              Medio <span className="text-red-500">*</span>
            </Label>
            <Input
              id="cv-media"
              value={media}
              onChange={(e) => setMedia(e.target.value)}
              placeholder="El Listín Diario"
              className="h-11 rounded-xl"
            />
            {error && !media && (
              <p className="flex items-center gap-1 text-xs text-red-500">
                <AlertCircle className="size-3.5" /> El medio es obligatorio.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cv-date">
              Fecha <span className="text-red-500">*</span>
            </Label>
            <Input
              id="cv-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-11 rounded-xl"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="cv-link">Enlace (opcional)</Label>
            <Input
              id="cv-link"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://..."
              className="h-11 rounded-xl"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t pt-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-dark text-white hover:bg-blue-dark/90"
          >
            {loading ? <HashLoader size={16} /> : cover ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
