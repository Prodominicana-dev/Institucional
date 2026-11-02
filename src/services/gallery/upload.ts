import axios from "axios";
import { compressImage } from "@/lib/image-compression";
var CryptoJS = require("crypto-js");

/* Fotos por peticion. Mandar todas juntas en una sola peticion multipart
   hacia que la subida fallara o se colgara con galerias de varias fotos:
   el cuerpo pasaba de los limites del servidor y el error se perdia. En
   tandas chicas cada peticion es liviana y, si una falla, las demas siguen. */
const BATCH_SIZE = 3;

export interface UploadResult {
  uploaded: number;
  failed: File[];
}

/* Sube las fotos de una galeria en tandas, comprimiendolas antes.
   Nunca lanza: devuelve cuantas subieron y cuales fallaron, para que quien
   la llama decida que mostrar. */
export async function uploadGalleryPhotos(
  galleryId: string,
  files: File[],
  createdBy: string,
  userId: string,
  onProgress?: (done: number, total: number) => void
): Promise<UploadResult> {
  const token = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();

  const failed: File[] = [];
  let uploaded = 0;
  onProgress?.(0, files.length);

  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    try {
      const compressed = await Promise.all(batch.map(compressImage));
      const formData = new FormData();
      formData.append("galleryId", galleryId);
      formData.append("created_By", createdBy);
      compressed.forEach((f) => formData.append("images", f));
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/gallery/${galleryId}/photo`,
        formData,
        { headers: { Authorization: token }, timeout: 120000 }
      );
      uploaded += batch.length;
    } catch {
      failed.push(...batch);
    }
    onProgress?.(uploaded + failed.length, files.length);
  }

  return { uploaded, failed };
}
