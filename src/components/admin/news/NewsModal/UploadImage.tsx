"use client";
import { useMemo, type RefObject } from "react";
import { FileWithPath, IMAGE_MIME_TYPE, Dropzone } from "@mantine/dropzone";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ImagePlus,
  Info,
  RefreshCw,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { formatBytes } from "@/lib/image-compression";

export function UploadImage({
  file,
  existingImageSrc,
  openRef,
  onDrop,
  onReject,
  onRemove,
  maxSize,
  error,
  sizeError,
  keepOriginal,
  onKeepOriginalChange,
}: {
  file?: FileWithPath;
  existingImageSrc?: string;
  openRef: RefObject<() => void>;
  onDrop: (files: FileWithPath[]) => void;
  onReject: () => void;
  onRemove: () => void;
  maxSize: number;
  error?: string;
  sizeError?: string;
  keepOriginal: boolean;
  onKeepOriginalChange: (checked: boolean) => void;
}) {
  const previewSrc = useMemo(
    () => (file ? URL.createObjectURL(file) : existingImageSrc),
    [file, existingImageSrc]
  );
  const hasPreview = Boolean(previewSrc);

  return (
    <div className="flex flex-col gap-3">
      <Dropzone
        multiple={false}
        openRef={openRef}
        onDrop={onDrop}
        onReject={onReject}
        accept={IMAGE_MIME_TYPE}
        maxSize={maxSize}
        activateOnClick
        className={cn(
          "upload-zone group relative flex h-[42vh] w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed bg-muted/20 p-0 transition-colors duration-200",
          !hasPreview && "hover:border-primary/40 hover:bg-primary/[0.03]",
          error && "border-destructive/40 bg-destructive/[0.03]"
        )}
      >
        <AnimatePresence mode="wait">
          {hasPreview ? (
            <motion.div
              key={previewSrc}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0"
            >
              <Image
                src={previewSrc as string}
                alt=""
                fill
                sizes="900px"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10">
                <span className="truncate text-xs font-medium text-white/90">
                  {file
                    ? `${file.name} · ${formatBytes(file.size)}`
                    : "Portada actual"}
                </span>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openRef.current?.();
                    }}
                    className="flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur transition-colors hover:bg-white"
                  >
                    <RefreshCw className="size-3.5" /> Cambiar
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove();
                    }}
                    className="flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-medium text-destructive shadow-sm backdrop-blur transition-colors hover:bg-white"
                  >
                    <Trash2 className="size-3.5" /> Eliminar
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 px-6 py-10 text-center"
            >
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/5 text-primary ring-1 ring-primary/10 transition-transform duration-200 group-hover:scale-105">
                <UploadCloud className="size-6" strokeWidth={1.75} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-foreground">
                  Arrastra tu imagen aquí
                </span>
                <span className="text-xs text-muted-foreground">
                  o hacé clic para buscarla en tu equipo
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  openRef.current?.();
                }}
                className="mt-2 flex items-center gap-2 rounded-xl border bg-background px-4 py-2 text-xs font-medium shadow-sm transition-colors hover:bg-accent"
              >
                <ImagePlus className="size-3.5" /> Seleccionar imagen
              </button>
              <span className="text-[11px] text-muted-foreground">
                PNG, JPG o WEBP · Máximo {formatBytes(maxSize)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </Dropzone>

      {error && (
        <p className="flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle className="size-3.5 shrink-0" /> {error}
        </p>
      )}
      {sizeError && (
        <p className="flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle className="size-3.5 shrink-0" /> {sizeError}
        </p>
      )}

      {file && (
        <div className="flex items-center gap-2.5 rounded-xl border bg-muted/30 px-3.5 py-3">
          <Checkbox
            id="keepOriginalUpload"
            checked={keepOriginal}
            onCheckedChange={(checked) => onKeepOriginalChange(!!checked)}
          />
          <Label
            htmlFor="keepOriginalUpload"
            className="cursor-pointer font-normal text-muted-foreground"
          >
            Subir en resolución original (más lento)
          </Label>
        </div>
      )}

      <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0" />
        No importa si la imagen se ve &quot;cortada&quot; o &quot;agrandada&quot;: se
        centrará automáticamente.
      </p>
    </div>
  );
}
