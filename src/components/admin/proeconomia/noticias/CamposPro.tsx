"use client";
import { FileWithPath } from "@mantine/dropzone";
import { AlertCircle } from "lucide-react";
import { RefObject } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SECCIONES } from "@/components/proeconomia/secciones";
import { CategorySelect, type CategoryOption } from "@/components/admin/news/NewsModal/CategorySelect";
import { DatePicker } from "@/components/admin/news/NewsModal/DatePicker";
import { UploadImage } from "@/components/admin/news/NewsModal/UploadImage";

/* Primer paso del formulario de Noticias Pro. Es el unico que se aparta del
   formulario de Noticias: aqui la seccion es OBLIGATORIA, porque una noticia
   sin seccion no sale en ningun lado de Noticias Pro.

   Al editar se permite dejarla vacia a proposito: es la unica forma de
   devolver al portal una noticia que se etiqueto por error. */
export function CamposPro({
  date,
  setDate,
  categoryId,
  setCategoryId,
  categoryOptions,
  seccion,
  setSeccion,
  link,
  setLink,
  files,
  existingCoverSrc,
  openRef,
  onDrop,
  onReject,
  onRemoveCover,
  maxCoverSize,
  sizeError,
  keepOriginal,
  setKeepOriginal,
  warningAlert,
  coverRequerida,
  permitirSacar = false,
}: {
  date: any;
  setDate: (v: any) => void;
  categoryId: string;
  setCategoryId: (v: string) => void;
  categoryOptions: CategoryOption[];
  seccion: string;
  setSeccion: (v: string) => void;
  link: string;
  setLink: (v: string) => void;
  files: FileWithPath[];
  existingCoverSrc?: string;
  openRef: RefObject<() => void>;
  onDrop: (files: FileWithPath[]) => void;
  onReject: () => void;
  onRemoveCover: () => void;
  maxCoverSize: number;
  sizeError: string;
  keepOriginal: boolean;
  setKeepOriginal: (v: boolean) => void;
  warningAlert: boolean;
  coverRequerida: boolean;
  permitirSacar?: boolean;
}) {
  const sacada = permitirSacar && seccion === "";

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="grid w-full gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label>Fecha de la noticia</Label>
          <DatePicker date={date} setDate={setDate} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="seccionPro">
            Sección de Noticias Pro{" "}
            {!permitirSacar && <span className="text-destructive">*</span>}
          </Label>
          <select
            id="seccionPro"
            value={seccion}
            onChange={(e) => setSeccion(e.target.value)}
            className={`h-11 rounded-xl border bg-background px-4 text-base shadow-sm ${
              warningAlert && !permitirSacar && !seccion
                ? "border-destructive"
                : ""
            }`}
          >
            <option value="">
              {permitirSacar
                ? "Sacarla de Noticias Pro"
                : "Elija la sección..."}
            </option>
            {SECCIONES.map(({ key, nombre }) => (
              <option key={key} value={key}>
                {nombre}
              </option>
            ))}
          </select>
          {warningAlert && !permitirSacar && !seccion && (
            <p className="flex items-center gap-1 text-xs text-destructive">
              <AlertCircle className="size-3.5" /> Elija en qué sección de
              Noticias Pro aparece.
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Decide en qué columna de Noticias Pro aparece la noticia.
          </p>
        </div>
      </div>

      {sacada && (
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-300 bg-amber-50 p-3.5 text-sm text-amber-900">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          Al guardar sin sección, la noticia sale de Noticias Pro y vuelve al
          portal institucional, donde se administra desde Noticias.
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="categoryPro">
          Categoría del portal <span className="text-destructive">*</span>
        </Label>
        <CategorySelect
          id="categoryPro"
          value={categoryId}
          onChange={setCategoryId}
          options={categoryOptions}
          invalid={warningAlert && !categoryId}
        />
        {warningAlert && !categoryId && (
          <p className="flex items-center gap-1 text-xs text-destructive">
            <AlertCircle className="size-3.5" /> La categoría es obligatoria.
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Clasificación interna que toda noticia necesita. No decide dónde sale
          en Noticias Pro: eso lo hace la sección.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="linkPro">Enlace de la noticia</Label>
        <Input
          id="linkPro"
          onChange={(e) => setLink(e.target.value)}
          value={link}
          placeholder="https://..."
          className="h-11 rounded-xl px-4 text-base shadow-sm"
        />
        <p className="text-xs text-muted-foreground">
          Opcional. Si lo pones, la noticia llevará ahí en vez de a su detalle
          en el portal.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Label>
          Portada de la noticia <span className="text-destructive">*</span>
        </Label>
        <UploadImage
          file={files[0]}
          existingImageSrc={existingCoverSrc}
          openRef={openRef}
          onDrop={onDrop}
          onReject={onReject}
          onRemove={onRemoveCover}
          maxSize={maxCoverSize}
          error={
            warningAlert && coverRequerida
              ? "La imagen es obligatoria."
              : undefined
          }
          sizeError={sizeError}
          keepOriginal={keepOriginal}
          onKeepOriginalChange={setKeepOriginal}
        />
      </div>
    </div>
  );
}
