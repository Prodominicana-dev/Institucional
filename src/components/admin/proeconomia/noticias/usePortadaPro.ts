"use client";
import { useState } from "react";
import { FileWithPath } from "@mantine/dropzone";
import { compressImage, formatBytes } from "@/lib/image-compression";
import { MAX_COVER_SIZE } from "./MarcoModalPro";

/* Portada de la noticia: seleccion, rechazo por tamano y compresion. La usan
   las pantallas de crear y de editar de Noticias Pro. */
export function usePortadaPro() {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [cover, setCover] = useState("");
  const [keepOriginal, setKeepOriginal] = useState(false);
  const [sizeError, setSizeError] = useState("");
  const [compressing, setCompressing] = useState(false);

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setSizeError("");
    setCover(acceptedFiles[0].name);
    setFiles(acceptedFiles);
  };

  /* El dropzone rechaza el archivo silenciosamente cuando excede maxSize, asi
     que hay que decirle al redactor por que no paso nada. */
  const handleReject = () => {
    setSizeError(
      `La imagen supera el límite de ${formatBytes(
        MAX_COVER_SIZE
      )}. Redúcela antes de subirla.`
    );
  };

  /* Al editar, quitar la seleccion nueva devuelve la portada que ya tenia la
     noticia; al crear, deja el campo vacio. */
  const handleRemoveCover = (anterior = "") => {
    setFiles([]);
    setCover(anterior);
    setSizeError("");
    setKeepOriginal(false);
  };

  /* Se comprime salvo que el redactor pida el original. Es lo que mas pesa en
     la peticion, asi que es donde se gana tiempo. */
  const comprimirPortada = async (): Promise<File[]> => {
    if (files.length === 0 || keepOriginal) return files;
    setCompressing(true);
    const comprimida = await compressImage(files[0]);
    setCompressing(false);
    return [comprimida];
  };

  return {
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
  };
}
