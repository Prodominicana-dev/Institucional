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
import {
  Banner,
  bannerImageUrl,
  createBanner,
  editBanner,
} from "@/services/banner/service";

interface Props {
  open: boolean;
  onClose: () => void;
  update: () => void;
  banner?: Banner;
}

export function BannerModal({ open, onClose, update, banner }: Props) {
  const { user } = useUser();
  const [title, setTitle] = useState(banner?.title ?? "");
  const [link, setLink] = useState(banner?.link ?? "");
  const [external, setExternal] = useState(banner?.external ?? true);
  const [locale, setLocale] = useState<string>(banner?.locale ?? "");
  const [visible, setVisible] = useState(banner?.visible ?? true);
  const [file, setFile] = useState<FileWithPath | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const openRef = useRef<() => void>(null);

  const previewSrc = file
    ? URL.createObjectURL(file)
    : banner
    ? bannerImageUrl(banner)
    : undefined;

  const handleSave = async () => {
    if (!title.trim() || (!file && !banner)) {
      setError(true);
      return;
    }
    if (!user) return;
    setLoading(true);
    /* El banner se sube tal cual, sin comprimir: es una tira muy ancha y
       recortarla a 1920px le quita nitidez al texto en pantallas grandes. */
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("link", link.trim());
    formData.append("external", String(external));
    formData.append("locale", locale);
    formData.append("visible", String(visible));
    if (file) formData.append("images", file);
    const ok = banner
      ? await editBanner(banner.id, formData, update, user.sub as string)
      : await createBanner(formData, update, user.sub as string);
    setLoading(false);
    if (ok) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && !loading && onClose()}>
      <DialogContent className="max-w-lg font-montserrat text-black">
        <DialogTitle className="text-xl font-bold">
          {banner ? "Editar banner" : "Nuevo banner"}
        </DialogTitle>
        <DialogDescription className="text-sm text-gray-500">
          {banner
            ? "Actualice los datos del banner."
            : "Suba la imagen y complete los datos del banner."}
        </DialogDescription>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>
              Imagen {!banner && <span className="text-red-500">*</span>}
            </Label>
            <Dropzone
              openRef={openRef}
              onDrop={(f) => setFile(f[0])}
              accept={IMAGE_MIME_TYPE}
              maxSize={8 * 1024 * 1024}
              multiple={false}
              activateOnClick
              className="relative flex h-28 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-colors hover:border-blue-dark/40"
            >
              {previewSrc ? (
                <Image
                  src={previewSrc}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="500px"
                  unoptimized
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <UploadCloud className="size-8" />
                  <span className="text-sm">Arrastra o haz clic para seleccionar</span>
                </div>
              )}
            </Dropzone>
            <p className="text-xs text-gray-500">
              Imagen horizontal y ancha (por ejemplo 3840 × 284). Máximo 8 MB.
            </p>
            {error && !file && !banner && (
              <p className="flex items-center gap-1 text-xs text-red-500">
                <AlertCircle className="size-3.5" /> La imagen es obligatoria.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="bn-title">
              Título <span className="text-red-500">*</span>
            </Label>
            <Input
              id="bn-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Dashboard de Moda"
              className="h-11 rounded-xl"
            />
            <p className="text-xs text-gray-500">
              Describe el banner; se usa como texto alternativo para lectores de pantalla.
            </p>
            {error && !title.trim() && (
              <p className="flex items-center gap-1 text-xs text-red-500">
                <AlertCircle className="size-3.5" /> El título es obligatorio.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="bn-link">Enlace (opcional)</Label>
            <Input
              id="bn-link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://... o /sumando-exportadoras"
              className="h-11 rounded-xl"
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={external}
                onChange={(e) => setExternal(e.target.checked)}
              />
              Abrir el enlace en una pestaña nueva
            </label>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="bn-locale">Idioma</Label>
            <select
              id="bn-locale"
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
              className="h-11 rounded-xl border border-gray-300 bg-white px-3 text-sm"
            >
              <option value="">Todos los idiomas</option>
              <option value="es">Solo español</option>
              <option value="en">Solo inglés</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={visible}
              onChange={(e) => setVisible(e.target.checked)}
            />
            Mostrar en la página de inicio
          </label>
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
            {loading ? <HashLoader size={16} /> : banner ? "Actualizar" : "Crear"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
