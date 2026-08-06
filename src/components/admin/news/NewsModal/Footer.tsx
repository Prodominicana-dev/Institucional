"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Eye, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

export function Footer({
  step,
  totalSteps,
  isFirstStep,
  isLastStep,
  submitLoading,
  compressing,
  uploadProgress,
  onPrev,
  onNext,
  submitLabel,
  onPreview,
  previewDisabled,
}: {
  step: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  submitLoading: boolean;
  compressing: boolean;
  uploadProgress: number;
  onPrev: () => void;
  onNext: () => void;
  submitLabel: string;
  onPreview: () => void;
  previewDisabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence initial={false}>
        {submitLoading && (
          <motion.div
            key="progress"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-2 rounded-xl border bg-muted/40 p-3.5">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  animate={{
                    width: `${compressing ? 15 : Math.max(uploadProgress, 5)}%`,
                  }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                />
              </div>
              <span className="text-center text-xs text-muted-foreground">
                {compressing
                  ? "Optimizando la imagen..."
                  : uploadProgress < 100
                  ? `Subiendo... ${uploadProgress}%`
                  : "Procesando en el servidor, no cierres esta ventana..."}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <DialogFooter className="flex-row items-center justify-between gap-3 sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="hidden text-xs font-medium text-muted-foreground sm:block">
            Paso {step + 1} de {totalSteps}
          </span>
          <Button
            type="button"
            variant="ghost"
            onClick={onPreview}
            disabled={submitLoading || previewDisabled}
            className="h-10 gap-1.5 rounded-xl text-muted-foreground hover:text-foreground"
          >
            <Eye className="size-4" /> Vista previa
          </Button>
        </div>
        <div className="ml-auto flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onPrev}
            disabled={submitLoading}
            className={cn("h-10 rounded-xl", isFirstStep && "invisible")}
          >
            <ChevronLeft className="size-4" /> Anterior
          </Button>
          <Button
            type="button"
            onClick={onNext}
            disabled={submitLoading}
            className="h-10 rounded-xl px-5 shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
          >
            {submitLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Guardando...
              </>
            ) : isLastStep ? (
              <>
                <Check className="size-4" /> {submitLabel}
              </>
            ) : (
              <>
                Continuar <ChevronRight className="size-4" />
              </>
            )}
          </Button>
        </div>
      </DialogFooter>
    </div>
  );
}
