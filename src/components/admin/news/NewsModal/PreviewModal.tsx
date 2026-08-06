"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { es as esLocale } from "date-fns/locale";
import { Eye, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export interface PreviewLanguageContent {
  title: string;
  description: string;
  content: string;
}

export function PreviewModal({
  open,
  onOpenChange,
  loading,
  spanish,
  english,
  coverSrc,
  categoryLabel,
  date,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading?: boolean;
  spanish: PreviewLanguageContent;
  english: PreviewLanguageContent;
  coverSrc?: string;
  categoryLabel?: string;
  date?: Date;
}) {
  const [lang, setLang] = useState<"es" | "en">("es");

  /* Si el redactor todavía no escribió nada en español, mostrar inglés por
     defecto en vez de una pantalla vacía cuando abre la vista previa. */
  useEffect(() => {
    if (open) {
      setLang(spanish.title ? "es" : english.title ? "en" : "es");
    }
  }, [open, spanish.title, english.title]);

  const active = lang === "es" ? spanish : english;
  const showLangToggle = Boolean(spanish.title) && Boolean(english.title);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[94vh] w-[calc(100%-2rem)] max-w-[1400px] sm:max-w-[1400px] flex-col gap-0 overflow-hidden rounded-3xl border-none p-0 shadow-2xl font-montserrat">
        <DialogHeader className="sr-only">
          <DialogTitle>Vista previa de la noticia</DialogTitle>
          <DialogDescription>
            Así se verá la noticia publicada en la sala de prensa.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between gap-3 border-b bg-muted/30 px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              <Eye className="size-3.5" /> Vista previa
            </span>
            {categoryLabel && (
              <span className="truncate text-xs text-muted-foreground">
                {categoryLabel}
              </span>
            )}
          </div>
          {showLangToggle && (
            <div className="flex items-center gap-0.5 rounded-lg border bg-background p-0.5">
              {(["es", "en"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs font-semibold transition-colors",
                    lang === code
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex h-[50vh] w-full items-center justify-center">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <div className="relative h-[42vh] w-full bg-muted">
                {coverSrc ? (
                  <Image
                    src={coverSrc}
                    alt=""
                    fill
                    sizes="1400px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                    Sin portada seleccionada
                  </div>
                )}
              </div>

              <div className="mx-auto flex w-full max-w-[880px] flex-col gap-5 px-8 py-10">
                {date && (
                  <span className="text-xs font-medium text-muted-foreground">
                    {format(date, "dd MMMM yyyy", { locale: esLocale })}
                  </span>
                )}

                <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground">
                  {active.title || "Sin título"}
                </h1>

                {active.description && (
                  <div
                    className="ProseMirror !min-h-0 !p-0 text-lg text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: active.description }}
                  />
                )}

                <div className="h-px w-full bg-border" />

                {active.content ? (
                  <div
                    className="ProseMirror !min-h-0 !p-0"
                    dangerouslySetInnerHTML={{ __html: active.content }}
                  />
                ) : (
                  <p className="text-sm italic text-muted-foreground">
                    Todavía no hay contenido para mostrar.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
