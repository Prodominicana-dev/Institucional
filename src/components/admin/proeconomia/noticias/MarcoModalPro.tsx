"use client";
import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ImageIcon, Newspaper } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Header } from "@/components/admin/news/NewsModal/Header";
import { Stepper, type StepDef } from "@/components/admin/news/NewsModal/Stepper";
import { Footer } from "@/components/admin/news/NewsModal/Footer";

/* Tope de la portada. Cloudflare esta delante de la API y rechaza cuerpos
   grandes, asi que conviene cortar antes en el navegador con un mensaje claro. */
export const MAX_COVER_SIZE = 25 * 1024 ** 2;

export const TOTAL_STEPS = 3;

export const STEP_DEFS: StepDef[] = [
  { label: "Portada", icon: <ImageIcon className="size-4" strokeWidth={1.75} /> },
  { label: "Español", icon: <span className="text-[10px] font-bold">ES</span> },
  { label: "Inglés", icon: <span className="text-[10px] font-bold">EN</span> },
];

const stepVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 24 : -24, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -24 : 24, opacity: 0 }),
};

/* Caja del modal de Noticias Pro: cabecera, pasos, hoja blanca y pie. Lo que
   cambia entre crear y editar va dentro, como hijo. */
export function MarcoModalPro({
  open,
  onOpenChange,
  titulo,
  descripcion,
  activeStep,
  direction,
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
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titulo: string;
  descripcion: string;
  activeStep: number;
  direction: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  submitLoading: boolean;
  compressing: boolean;
  uploadProgress: number;
  onPrev: () => void;
  onNext: () => void;
  submitLabel: string;
  onPreview: () => void;
  previewDisabled: boolean;
  children: ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[95vh] w-[95vw] max-w-none sm:max-w-none flex-col gap-0 overflow-hidden rounded-3xl border-none p-0 shadow-2xl font-montserrat">
        <div className="px-8 pt-8">
          <Header icon={Newspaper} title={titulo} description={descripcion} />
        </div>

        <div className="px-8 pt-6">
          <Stepper steps={STEP_DEFS} activeStep={activeStep} />
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto bg-neutral-200 px-8 py-8 dark:bg-neutral-950">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={activeStep}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="mx-auto w-full max-w-[960px] rounded-sm bg-white p-10 shadow-xl ring-1 ring-black/10 dark:bg-neutral-800"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="border-t bg-muted/20 px-8 py-5">
          <Footer
            step={activeStep}
            totalSteps={TOTAL_STEPS}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            submitLoading={submitLoading}
            compressing={compressing}
            uploadProgress={uploadProgress}
            onPrev={onPrev}
            onNext={onNext}
            submitLabel={submitLabel}
            onPreview={onPreview}
            previewDisabled={previewDisabled}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
