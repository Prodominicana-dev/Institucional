"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { editNews, useNewsConfById } from "@/services/news/service";
import { PreviewModal } from "@/components/admin/news/NewsModal/PreviewModal";
import { CamposPro } from "./CamposPro";
import { PasoIdiomaPro } from "./PasosIdiomaPro";
import { MarcoModalPro, MAX_COVER_SIZE, TOTAL_STEPS } from "./MarcoModalPro";
import { usePortadaPro } from "./usePortadaPro";
import { SECCIONES } from "@/components/proeconomia/secciones";
import { useEditoresPro } from "./useEditoresPro";

/* Editar una noticia de Noticias Pro. Aqui la seccion SI se puede dejar vacia:
   es la unica salida para una noticia etiquetada por error, que al guardarse
   sin seccion vuelve al portal institucional. */
export function EditarNoticiaPro({
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
  const [spanishTitle, setSpanishTitle] = useState("");
  const [englishTitle, setEnglishTitle] = useState("");
  const [warningAlert, setWarningAlert] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [date, setDate] = useState<any>(new Date());
  const [categoryId, setCategoryId] = useState("");
  const [link, setLink] = useState("");
  const [seccion, setSeccion] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { data: news, isLoading: newsLoading } = useNewsConfById(id);
  const {
    files,
    cover,
    setCover,
    keepOriginal,
    setKeepOriginal,
    sizeError,
    compressing,
    handleDrop,
    handleReject,
    handleRemoveCover,
    comprimirPortada,
  } = usePortadaPro();
  const { contentEs, contentEn } =
    useEditoresPro();

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === TOTAL_STEPS - 1;

  useEffect(() => {
    if (!newsLoading && news) {
      setSpanishTitle(news.es.title);
      setEnglishTitle(news.en.title);
      setDate(new Date(news.date));
      setCover(news.cover);
      setCategoryId(news.category.id);
      setLink(news.es.link ?? "");
      setSeccion(news.es.seccion ?? "");
    }
  }, [news, newsLoading]);

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

  /* Aca siempre hay contenido cargado, asi que confirmar antes de cerrar evita
     perder ediciones a mitad de camino. */
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && !submitLoading) {
      const confirmed = window.confirm(
        "¿Deseas cerrar sin guardar los cambios?"
      );
      if (!confirmed) return;
    }
    handler();
  };

  const handleButton = async () => {
    if (activeStep === 0 && !categoryId) {
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
      /* Sacarla de Noticias Pro es un cambio de sitio, no un guardado mas:
         se confirma antes porque pasa a administrarse desde Noticias. */
      if (seccion === "" && news?.es?.seccion) {
        const confirmado = window.confirm(
          "Esta noticia saldrá de Noticias Pro y volverá al portal institucional. ¿Deseas continuar?"
        );
        if (!confirmado) return;
      }

      setSubmitLoading(true);
      setUploadProgress(0);

      const coverFiles = await comprimirPortada();

      const es_data = {
        title: spanishTitle,
        content: contentEs?.getHTML(),
        description: news?.es.description ?? "",
        link: link.trim(),
        seccion,
        language: "es",
      };
      const en_data = {
        title: englishTitle,
        content: contentEn?.getHTML(),
        description: news?.en.description ?? "",
        link: link.trim(),
        seccion,
        language: "en",
      };

      const formData = new FormData();
      formData.append("es", JSON.stringify(es_data));
      formData.append("en", JSON.stringify(en_data));
      formData.append("date", date.toISOString());
      /* Sin archivo nuevo se conserva el nombre que ya tenia. */
      const coverName = coverFiles.length > 0 ? coverFiles[0].name : cover;
      formData.append("cover", coverName);
      formData.append("categoryId", categoryId);
      /* Las imagenes relacionadas se reenvian tal cual: esta pantalla no las
         administra y mandar una lista vacia las borraria. */
      formData.append("images", JSON.stringify(news?.images ?? []));
      formData.append("updated_By", user?.email as string);
      coverFiles.length > 0 &&
        coverFiles.map((file) => formData.append("files", file));
      const ok = await editNews(
        news?.id,
        formData,
        update,
        user?.sub as string,
        setUploadProgress
      );
      setSubmitLoading(false);
      setUploadProgress(0);
      if (ok) handler();
    }
  };

  const existingCoverSrc =
    files.length === 0 && cover
      ? `${process.env.NEXT_PUBLIC_API_URL}/news/images/${id}/${cover}`
      : undefined;

  const newCoverBlobSrc = useMemo(
    () => (files[0] ? URL.createObjectURL(files[0]) : undefined),
    [files]
  );

  const pasos = [
    <CamposPro
      key="campos"
      date={date}
      setDate={setDate}
      faltaCategoriaPro={false}
      seccion={seccion}
      setSeccion={setSeccion}
      link={link}
      setLink={setLink}
      files={files}
      existingCoverSrc={existingCoverSrc}
      openRef={openRef}
      onDrop={handleDrop}
      onReject={handleReject}
      onRemoveCover={() => handleRemoveCover(news?.cover || "")}
      maxCoverSize={MAX_COVER_SIZE}
      sizeError={sizeError}
      keepOriginal={keepOriginal}
      setKeepOriginal={setKeepOriginal}
      warningAlert={warningAlert}
      coverRequerida={files.length === 0 && !cover}
      permitirSacar
    />,
    <PasoIdiomaPro
      key="es"
      idioma="es"
      titulo={spanishTitle}
      setTitulo={setSpanishTitle}
      content={contentEs}
      contentPrevio={news?.es.content}
      warningAlert={warningAlert}
    />,
    <PasoIdiomaPro
      key="en"
      idioma="en"
      titulo={englishTitle}
      setTitulo={setEnglishTitle}
      content={contentEn}
      contentPrevio={news?.en.content}
      warningAlert={warningAlert}
    />,
  ];

  return (
    <>
      <MarcoModalPro
        open={open}
        onOpenChange={handleOpenChange}
        titulo="Editar noticia de Noticias Pro"
        descripcion="Actualiza la información en español e inglés de esta publicación."
        activeStep={activeStep}
        direction={direction}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        submitLoading={submitLoading}
        compressing={compressing}
        uploadProgress={uploadProgress}
        onPrev={handlePrev}
        onNext={handleButton}
        submitLabel="Guardar cambios"
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
          description: news?.es.description ?? "",
          content: contentEs?.getHTML() ?? "",
        }}
        english={{
          title: englishTitle,
          description: news?.en.description ?? "",
          content: contentEn?.getHTML() ?? "",
        }}
        coverSrc={newCoverBlobSrc ?? existingCoverSrc}
        categoryLabel={
          SECCIONES.find((x) => x.key === seccion)?.nombre
        }
        date={date instanceof Date ? date : new Date(date)}
      />
    </>
  );
}
