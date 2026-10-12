"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { createNews } from "@/services/news/service";
import { useNewsCategories } from "@/services/news/categories/service";
import { type CategoryOption } from "@/components/admin/news/NewsModal/CategorySelect";
import { PreviewModal } from "@/components/admin/news/NewsModal/PreviewModal";
import { CamposPro } from "./CamposPro";
import { PasoIdiomaPro } from "./PasosIdiomaPro";
import { MarcoModalPro, MAX_COVER_SIZE, TOTAL_STEPS } from "./MarcoModalPro";
import { usePortadaPro } from "./usePortadaPro";
import { useEditoresPro } from "./useEditoresPro";

/* Crear una noticia de Noticias Pro. Camino propio: la seccion es obligatoria,
   asi que de aqui no puede salir una noticia que acabe en el portal
   institucional por descuido. */
export function CrearNoticiaPro({
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
  const [warningAlert, setWarningAlert] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [date, setDate] = useState<any>(new Date());
  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [link, setLink] = useState("");
  const [seccion, setSeccion] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { data: categories, isLoading: categoriesLoading } =
    useNewsCategories();
  const {
    files,
    cover,
    keepOriginal,
    setKeepOriginal,
    sizeError,
    compressing,
    handleDrop,
    handleReject,
    handleRemoveCover,
    comprimirPortada,
  } = usePortadaPro();
  const { minidescriptionEs, contentEs, minidescriptionEn, contentEn } =
    useEditoresPro();

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

  /* Cierra sin preguntar si el redactor no alcanzo a escribir nada; si ya hay
     contenido real, confirma para no perder trabajo por un clic afuera. */
  const isDirty =
    files.length > 0 ||
    spanishTitle !== "" ||
    englishTitle !== "" ||
    categoryId !== "" ||
    seccion !== "";
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && !submitLoading && isDirty) {
      const confirmed = window.confirm(
        "¿Deseas cerrar sin guardar? Se perderá la información ingresada."
      );
      if (!confirmed) return;
    }
    handler();
  };

  const handleButton = async () => {
    if (activeStep === 0 && (files.length === 0 || !categoryId || !seccion)) {
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

      const coverFiles = await comprimirPortada();

      const es_data = {
        title: spanishTitle,
        content: contentEs?.getHTML(),
        description: minidescriptionEs?.getHTML(),
        link: link.trim(),
        seccion,
        language: "es",
      };
      const en_data = {
        title: englishTitle,
        content: contentEn?.getHTML(),
        description: minidescriptionEn?.getHTML(),
        link: link.trim(),
        seccion,
        language: "en",
      };

      const formData = new FormData();
      formData.append("es", JSON.stringify(es_data));
      formData.append("en", JSON.stringify(en_data));
      formData.append("date", date.toISOString());
      /* El nombre tiene que ser el del archivo que se sube de verdad:
         comprimir renombra a .jpg. */
      const coverName = coverFiles.length > 0 ? coverFiles[0].name : cover;
      formData.append("cover", coverName);
      formData.append("categoryId", categoryId);
      /* Esta pantalla no administra imagenes relacionadas, solo la portada. */
      formData.append("images", JSON.stringify([]));
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
      /* Si fallo, el dialogo se mantiene abierto para no perder lo redactado. */
      if (ok) handler();
    }
  };

  const previewCoverSrc = useMemo(
    () => (files[0] ? URL.createObjectURL(files[0]) : undefined),
    [files]
  );

  const pasos = [
    <CamposPro
      key="campos"
      date={date}
      setDate={setDate}
      categoryId={categoryId}
      setCategoryId={setCategoryId}
      categoryOptions={categoryOptions}
      seccion={seccion}
      setSeccion={setSeccion}
      link={link}
      setLink={setLink}
      files={files}
      openRef={openRef}
      onDrop={handleDrop}
      onReject={handleReject}
      onRemoveCover={handleRemoveCover}
      maxCoverSize={MAX_COVER_SIZE}
      sizeError={sizeError}
      keepOriginal={keepOriginal}
      setKeepOriginal={setKeepOriginal}
      warningAlert={warningAlert}
      coverRequerida={files.length === 0}
    />,
    <PasoIdiomaPro
      key="es"
      idioma="es"
      titulo={spanishTitle}
      setTitulo={setSpanishTitle}
      minidescription={minidescriptionEs}
      content={contentEs}
      warningAlert={warningAlert}
    />,
    <PasoIdiomaPro
      key="en"
      idioma="en"
      titulo={englishTitle}
      setTitulo={setEnglishTitle}
      minidescription={minidescriptionEn}
      content={contentEn}
      warningAlert={warningAlert}
    />,
  ];

  return (
    <>
      <MarcoModalPro
        open={open}
        onOpenChange={handleOpenChange}
        titulo="Nueva noticia de Noticias Pro"
        descripcion="Publica una noticia en español e inglés en el apartado Noticias Pro."
        activeStep={activeStep}
        direction={direction}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        submitLoading={submitLoading}
        compressing={compressing}
        uploadProgress={uploadProgress}
        onPrev={handlePrev}
        onNext={handleButton}
        submitLabel="Publicar en Noticias Pro"
        onPreview={() => setPreviewOpen(true)}
        previewDisabled={!spanishTitle && !englishTitle}
      >
        {pasos[activeStep]}
      </MarcoModalPro>

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
        categoryLabel={
          categoryOptions.find((option) => option.value === categoryId)?.label
        }
        date={date instanceof Date ? date : new Date(date)}
      />
    </>
  );
}
