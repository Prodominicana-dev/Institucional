"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { FileWithPath } from "@mantine/dropzone";
import Editor from "../tools/rich-editor/config";
import TextEditor from "../tools/rich-editor/rich-editor";
import { createNews } from "@/services/news/service";
import { useNewsCategories } from "@/services/news/categories/service";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ImageIcon,
  Info,
  Newspaper,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { compressImage, formatBytes } from "@/lib/image-compression";
import { Header } from "./NewsModal/Header";
import { Stepper, type StepDef } from "./NewsModal/Stepper";
import { UploadImage } from "./NewsModal/UploadImage";
import { CategorySelect, type CategoryOption } from "./NewsModal/CategorySelect";
import { DatePicker } from "./NewsModal/DatePicker";
import { Footer } from "./NewsModal/Footer";
import { PreviewModal } from "./NewsModal/PreviewModal";

/* Tope de la portada. Cloudflare está delante de la API y rechaza cuerpos
   grandes, así que conviene cortar antes en el navegador con un mensaje claro. */
const MAX_COVER_SIZE = 25 * 1024 ** 2;

const TOTAL_STEPS = 3;
const STEP_DEFS: StepDef[] = [
  { label: "Portada", icon: <ImageIcon className="size-4" strokeWidth={1.75} /> },
  { label: "Español", icon: <span className="text-[10px] font-bold">ES</span> },
  { label: "Inglés", icon: <span className="text-[10px] font-bold">EN</span> },
];

const stepVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 24 : -24, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -24 : 24, opacity: 0 }),
};

export function NewsDialog({
  open,
  handler,
  update,
}: {
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const { user } = useUser();
  const [spanishTitle, setSpanishTitle] = useState("");
  const [englishTitle, setEnglishTitle] = useState("");
  const [description] = useState("");
  const [cover, setCover] = useState("");
  const [warningAlert, setWarningAlert] = useState(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [imagesRelated, setImagesRelated] = useState<FileWithPath[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [date, setDate] = useState<any>(new Date());
  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [keepOriginal, setKeepOriginal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [compressing, setCompressing] = useState(false);
  const [sizeError, setSizeError] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const { data: categories, isLoading: categoriesLoading } =
    useNewsCategories();

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === TOTAL_STEPS - 1;

  useEffect(() => {
    if (!categoriesLoading && categories) {
      setCategoryOptions(
        categories.map(({ id, nameEs }: { id: string; nameEs: string }) => ({
          value: id,
          label: nameEs,
        }))
      );
    }
  }, [categories, categoriesLoading]);

  const openRef = useRef<() => void>(null);
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

  /* Cierra sin preguntar si el redactor no alcanzó a escribir nada; si ya
     hay contenido real, confirma para no perder trabajo por un clic afuera
     del modal o un Escape accidental. */
  const isDirty =
    files.length > 0 ||
    spanishTitle !== "" ||
    englishTitle !== "" ||
    categoryId !== "";
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && !submitLoading && isDirty) {
      const confirmed = window.confirm(
        "¿Deseas cerrar sin guardar? Se perderá la información ingresada."
      );
      if (!confirmed) return;
    }
    handler();
  };

  const minidescriptionEs = Editor({
    placeholder: "Breve descripción...",
    contentEs: description ? description : "",
  });

  const contentEs = Editor({
    placeholder: "Contenido de la noticia...",
    contentEs: description ? description : "",
  });

  const minidescriptionEn = Editor({
    placeholder: "Breve descripción en inglés...",
    contentEs: description ? description : "",
  });

  const contentEn = Editor({
    placeholder: "Contenido de la noticia en inglés...",
    contentEs: description ? description : "",
  });

  /* Funcion para cuando droppeen un documento se agregue a la lista ya existente */
  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setSizeError("");
    setCover(acceptedFiles[0].name);
    setFiles(acceptedFiles);
  };

  /* El dropzone rechaza el archivo silenciosamente cuando excede maxSize,
     así que hay que decirle al redactor por qué no pasó nada. */
  const handleReject = () => {
    setSizeError(
      `La imagen supera el límite de ${formatBytes(
        MAX_COVER_SIZE
      )}. Redúcela antes de subirla.`
    );
  };

  const handleRemoveCover = () => {
    setFiles([]);
    setCover("");
    setSizeError("");
    setKeepOriginal(false);
  };

  useEffect(() => {
    if (imagesRelated.length > 0) {
      setImages(imagesRelated.map((file) => file.name));
    }
    if (imagesRelated.length === 0) {
      setImages([]);
    }
  }, [imagesRelated]);

  const handleButton = async () => {
    if (activeStep === 0 && (files.length === 0 || !categoryId)) {
      return setWarningAlert(true);
    }

    if (
      activeStep === 1 &&
      (spanishTitle === "" || contentEs?.getText() === "")
    ) {
      return setWarningAlert(true);
    }

    !isLastStep && handleNext();

    if (isLastStep && (englishTitle === "" || contentEn?.getText() === "")) {
      return setWarningAlert(true);
    }

    if (
      isLastStep &&
      englishTitle !== "" &&
      contentEn?.getText() !== "" &&
      !submitLoading
    ) {
      setSubmitLoading(true);
      setUploadProgress(0);

      /* Se comprime la portada salvo que el redactor pida el original.
         Es lo que más pesa en la petición, así que es donde se gana tiempo. */
      let coverFiles: File[] = files;
      if (files.length > 0 && !keepOriginal) {
        setCompressing(true);
        coverFiles = [await compressImage(files[0])];
        setCompressing(false);
      }

      const es_data = {
        title: spanishTitle,
        content: contentEs?.getHTML(),
        description: minidescriptionEs?.getHTML(),
        language: "es",
      };
      const en_data = {
        title: englishTitle,
        content: contentEn?.getHTML(),
        description: minidescriptionEn?.getHTML(),
        language: "en",
      };

      const formData = new FormData();
      formData.append("es", JSON.stringify(es_data));
      formData.append("en", JSON.stringify(en_data));
      formData.append("date", date.toISOString());
      formData.append("cover", cover);
      formData.append("categoryId", categoryId);
      formData.append("images", JSON.stringify(images));
      formData.append("created_By", user?.email as string);
      coverFiles.length > 0 &&
        coverFiles.map((file) => formData.append("files", file));
      const ok = await createNews(
        formData,
        update,
        user?.sub as string,
        setUploadProgress
      );
      setSubmitLoading(false);
      setUploadProgress(0);
      /* Si falló, el diálogo se mantiene abierto para no perder lo redactado. */
      if (ok) handler();
    }
  };

  const previewCoverSrc = useMemo(
    () => (files[0] ? URL.createObjectURL(files[0]) : undefined),
    [files]
  );
  const previewCategoryLabel = categoryOptions.find(
    (option) => option.value === categoryId
  )?.label;

  const steps = [
    {
      section: (
        <div className="flex w-full flex-col gap-6">
          <div className="grid w-full gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label>Fecha de la noticia</Label>
              <DatePicker date={date} setDate={setDate} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="category">
                Categoría <span className="text-destructive">*</span>
              </Label>
              <CategorySelect
                id="category"
                value={categoryId}
                onChange={setCategoryId}
                options={categoryOptions}
                invalid={warningAlert && !categoryId}
              />
              {warningAlert && !categoryId && (
                <p className="flex items-center gap-1 text-xs text-destructive">
                  <AlertCircle className="size-3.5" /> La categoría es
                  obligatoria.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>
              Portada de la noticia <span className="text-destructive">*</span>
            </Label>
            <UploadImage
              file={files[0]}
              openRef={openRef}
              onDrop={handleDrop}
              onReject={handleReject}
              onRemove={handleRemoveCover}
              maxSize={MAX_COVER_SIZE}
              error={
                warningAlert && files.length === 0
                  ? "La imagen es obligatoria."
                  : undefined
              }
              sizeError={sizeError}
              keepOriginal={keepOriginal}
              onKeepOriginalChange={setKeepOriginal}
            />
          </div>
        </div>
      ),
    },
    {
      section: (
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-2.5 rounded-xl border bg-muted/30 p-3.5 text-sm text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0" />
            Completa el contenido en español. En el siguiente paso escribirás
            la misma noticia en inglés.
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="titleEs">
              Título <span className="text-destructive">*</span>
            </Label>
            <Input
              id="titleEs"
              onChange={(e) => setSpanishTitle(e.target.value)}
              value={spanishTitle}
              placeholder="Título de la noticia"
              className="h-11 rounded-xl px-4 text-base shadow-sm"
            />
            {warningAlert && !spanishTitle && (
              <p className="flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="size-3.5" /> El título es
                obligatorio.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Breve descripción de la noticia</Label>
            <TextEditor editor={minidescriptionEs} number={15} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>
              Cuerpo de la noticia <span className="text-destructive">*</span>
            </Label>
            <TextEditor editor={contentEs} />
            {warningAlert && !contentEs?.getText() && (
              <p className="flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="size-3.5" /> El cuerpo de la noticia
                es obligatorio.
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      section: (
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-2.5 rounded-xl border bg-muted/30 p-3.5 text-sm text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0" />
            Ahora escribe el mismo contenido, pero en inglés.
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="titleEn">
              Título en inglés <span className="text-destructive">*</span>
            </Label>
            <Input
              id="titleEn"
              onChange={(e) => setEnglishTitle(e.target.value)}
              value={englishTitle}
              placeholder="Título de la noticia"
              className="h-11 rounded-xl px-4 text-base shadow-sm"
            />
            {warningAlert && !englishTitle && (
              <p className="flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="size-3.5" /> El título en inglés es
                obligatorio.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Breve descripción de la noticia en inglés</Label>
            <TextEditor editor={minidescriptionEn} number={15} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>
              Cuerpo de la noticia en inglés{" "}
              <span className="text-destructive">*</span>
            </Label>
            <TextEditor editor={contentEn} />
            {warningAlert && !contentEn?.getText() && (
              <p className="flex items-center gap-1 text-xs text-destructive">
                <AlertCircle className="size-3.5" /> El cuerpo de la noticia
                en inglés es obligatorio.
              </p>
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex h-[95vh] w-[95vw] max-w-none sm:max-w-none flex-col gap-0 overflow-hidden rounded-3xl border-none p-0 shadow-2xl font-montserrat">
        <div className="px-8 pt-8">
          <Header
            icon={Newspaper}
            title="Nueva noticia"
            description="Publica una noticia en español e inglés para la sala de prensa institucional."
          />
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
              {steps[activeStep].section}
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
            onPrev={handlePrev}
            onNext={handleButton}
            submitLabel="Publicar noticia"
            onPreview={() => setPreviewOpen(true)}
            previewDisabled={!spanishTitle && !englishTitle}
          />
        </div>
      </DialogContent>

      <PreviewModal
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        spanish={{
          title: spanishTitle,
          description: minidescriptionEs?.getHTML() ?? "",
          content: contentEs?.getHTML() ?? "",
        }}
        english={{
          title: englishTitle,
          description: minidescriptionEn?.getHTML() ?? "",
          content: contentEn?.getHTML() ?? "",
        }}
        coverSrc={previewCoverSrc}
        categoryLabel={previewCategoryLabel}
        date={date instanceof Date ? date : new Date(date)}
      />
    </Dialog>
  );
}
