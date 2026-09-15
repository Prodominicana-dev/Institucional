"use client";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import {
  editInitiative,
  useInitiativeById,
} from "@/services/mujer-exporta/initiatives/service";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Info, Layers, Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const TOTAL_STEPS = 2;

const RUTAS = [
  { value: "aprender", label: "Aprender" },
  { value: "impulsar", label: "Impulsar" },
  { value: "exportar", label: "Exportar" },
  { value: "conectar", label: "Conectar" },
];

const TIPOS = [
  "Curso",
  "Documento",
  "Servicio",
  "Programa",
  "Guía",
  "Herramienta",
  "Video",
  "Dashboard",
  "Estudio",
  "Certificación",
  "Premio",
  "Página",
];

const NIVELES = ["Básico", "Intermedio", "Avanzado"];

const PUBLICO_OBJETIVO = [
  "Exclusivo mujeres",
  "Mixto (hombres y mujeres)",
  "General con enfoque género",
];

const stepVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 24 : -24, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -24 : 24, opacity: 0 }),
};

function formatDateForInput(date: string | null): string {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

export function EditInitiativeDialog({
  id,
  open,
  handler,
  update,
}: {
  id: string;
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const { user } = useUser();
  const { data: initiative, isLoading: loadingInitiative } = useInitiativeById(id, open);

  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [warningAlert, setWarningAlert] = useState(false);

  // Step 1 - Información general
  const [ruta, setRuta] = useState("");
  const [tipo, setTipo] = useState("");
  const [autor, setAutor] = useState("");
  const [url, setUrl] = useState("");
  const [subtema, setSubtema] = useState("");
  const [publicoObjetivo, setPublicoObjetivo] = useState("");
  const [nivel, setNivel] = useState("");
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Step 2 - Contenido multiidioma
  const [titleEs, setTitleEs] = useState("");
  const [descriptionEs, setDescriptionEs] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");

  // Cargar datos cuando llegan
  useEffect(() => {
    if (initiative && !loadingInitiative) {
      setRuta(initiative.ruta || "");
      setTipo(initiative.tipo || "");
      setAutor(initiative.autor || "");
      setUrl(initiative.url || "");
      setSubtema(initiative.subtema || "");
      setPublicoObjetivo(initiative.publicoObjetivo || "");
      setNivel(initiative.nivel || "");
      setTags(initiative.tags?.join(", ") || "");
      setStartDate(formatDateForInput(initiative.startDate));
      setEndDate(formatDateForInput(initiative.endDate));
      setTitleEs(initiative.es?.title || "");
      setDescriptionEs(initiative.es?.description || "");
      setTitleEn(initiative.en?.title || "");
      setDescriptionEn(initiative.en?.description || "");
    }
  }, [initiative, loadingInitiative]);

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === TOTAL_STEPS - 1;

  const handleNext = () => {
    setDirection(1);
    setActiveStep((cur) => Math.min(cur + 1, TOTAL_STEPS - 1));
    setWarningAlert(false);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveStep((cur) => Math.max(cur - 1, 0));
    setWarningAlert(false);
  };

  const handleSubmit = async () => {
    // Validación step 1
    if (activeStep === 0 && (!ruta || !tipo || !autor || !url)) {
      return setWarningAlert(true);
    }

    if (!isLastStep) {
      return handleNext();
    }

    // Validación step 2
    if (!titleEs || !descriptionEs) {
      return setWarningAlert(true);
    }

    setSubmitLoading(true);

    const esData = {
      title: titleEs,
      description: descriptionEs,
      language: "es",
    };

    const enData = {
      title: titleEn || titleEs,
      description: descriptionEn || descriptionEs,
      language: "en",
    };

    const tagsArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    const initiativeData = {
      es: JSON.stringify(esData),
      en: JSON.stringify(enData),
      ruta,
      subtema: subtema || null,
      tipo,
      autor,
      url,
      publicoObjetivo: publicoObjetivo || null,
      nivel: nivel || null,
      tags: JSON.stringify(tagsArray),
      startDate: startDate || null,
      endDate: endDate || null,
      updated_By: user?.email,
    };

    const success = await editInitiative(id, initiativeData, update);
    setSubmitLoading(false);

    if (success) {
      handler();
    }
  };

  const steps = [
    {
      title: "Información General",
      section: (
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-2.5 rounded-xl border bg-muted/30 p-3.5 text-sm text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0" />
            Modifica la información básica de la iniciativa.
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label>
                Ruta <span className="text-destructive">*</span>
              </Label>
              <Select value={ruta} onValueChange={setRuta}>
                <SelectTrigger className={warningAlert && !ruta ? "border-destructive" : ""}>
                  <SelectValue placeholder="Seleccionar ruta" />
                </SelectTrigger>
                <SelectContent>
                  {RUTAS.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label>
                Tipo <span className="text-destructive">*</span>
              </Label>
              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger className={warningAlert && !tipo ? "border-destructive" : ""}>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {TIPOS.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label>
                Autor/Institución <span className="text-destructive">*</span>
              </Label>
              <Input
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                placeholder="Ej: ProDominicana"
                className={warningAlert && !autor ? "border-destructive" : ""}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Subtema</Label>
              <Input
                value={subtema}
                onChange={(e) => setSubtema(e.target.value)}
                placeholder="Ej: Marco Normativo"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>
              URL del recurso <span className="text-destructive">*</span>
            </Label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className={warningAlert && !url ? "border-destructive" : ""}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label>Público objetivo</Label>
              <Select value={publicoObjetivo} onValueChange={setPublicoObjetivo}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {PUBLICO_OBJETIVO.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Nivel</Label>
              <Select value={nivel} onValueChange={setNivel}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {NIVELES.map((n) => (
                    <SelectItem key={n} value={n}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label>Fecha de inicio</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Fecha de cierre</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                La iniciativa se ocultará automáticamente después de esta fecha.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Tags (separados por coma)</Label>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Ej: exportación, comercio, legislación"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Contenido",
      section: (
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-2.5 rounded-xl border bg-muted/30 p-3.5 text-sm text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0" />
            Modifica el título y descripción en español e inglés.
          </div>

          {/* Español */}
          <div className="rounded-xl border p-4 bg-blue-50/30">
            <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                ES
              </span>
              Español
            </h4>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>
                  Título <span className="text-destructive">*</span>
                </Label>
                <Input
                  value={titleEs}
                  onChange={(e) => setTitleEs(e.target.value)}
                  placeholder="Título de la iniciativa"
                  className={warningAlert && !titleEs ? "border-destructive" : ""}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>
                  Descripción <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  value={descriptionEs}
                  onChange={(e) => setDescriptionEs(e.target.value)}
                  placeholder="Descripción breve de la iniciativa..."
                  rows={3}
                  className={warningAlert && !descriptionEs ? "border-destructive" : ""}
                />
              </div>
            </div>
          </div>

          {/* Inglés */}
          <div className="rounded-xl border p-4 bg-green-50/30">
            <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-green-600 text-white text-xs flex items-center justify-center font-bold">
                EN
              </span>
              Inglés (opcional)
            </h4>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>Título</Label>
                <Input
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="Initiative title"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Descripción</Label>
                <Textarea
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  placeholder="Brief description of the initiative..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  if (loadingInitiative) {
    return (
      <Dialog open={open} onOpenChange={handler}>
        <DialogContent className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-rose-600" />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handler}>
      <DialogContent className="flex h-[90vh] w-[95vw] max-w-3xl flex-col gap-0 overflow-hidden rounded-2xl border-none p-0 shadow-2xl font-montserrat">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Layers className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Editar Iniciativa</h2>
              <p className="text-sm text-muted-foreground">
                Modifica los datos de la iniciativa
              </p>
            </div>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-2 mt-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= activeStep
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`text-sm hidden sm:block ${
                    index <= activeStep ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className="w-8 h-0.5 bg-gray-200 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={activeStep}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              {steps[activeStep].section}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t bg-white flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={isFirstStep || submitLoading}
          >
            Anterior
          </Button>

          <div className="text-sm text-muted-foreground">
            Paso {activeStep + 1} de {TOTAL_STEPS}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={submitLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {submitLoading
              ? "Guardando..."
              : isLastStep
              ? "Guardar Cambios"
              : "Siguiente"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
