/* Utilidad para comprimir imágenes en el navegador antes de subirlas.
   Reduce drásticamente el tiempo de subida en el admin: una foto de cámara
   de ~20MB baja a unos cientos de KB sin diferencia visible en la web. */

/* Ancho máximo en píxeles. 1920px cubre pantallas full HD, que es lo más
   grande que se muestra una portada de noticia en el portal. */
const MAX_WIDTH = 1920;

/* Calidad de recompresión JPEG. 0.85 es el punto donde deja de notarse
   la pérdida a simple vista. */
const QUALITY = 0.85;

/* Por debajo de este tamaño no vale la pena comprimir: el archivo ya es
   liviano y recomprimir solo degradaría la imagen. */
const SKIP_BELOW_BYTES = 300 * 1024;

/* Formatos que no se deben tocar: los GIF perderían la animación y los
   SVG son vectoriales (no tienen sentido en un canvas). */
const SKIP_TYPES = ["image/gif", "image/svg+xml"];

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No se pudo leer la imagen."));
    };
    img.src = url;
  });
}

/* Comprime una imagen redimensionándola a MAX_WIDTH y recomprimiéndola a JPEG.
   Si algo falla, devuelve el archivo original: la subida nunca debe romperse
   por un problema de compresión. */
export async function compressImage(file: File): Promise<File> {
  if (SKIP_TYPES.includes(file.type)) return file;
  if (file.size < SKIP_BELOW_BYTES) return file;

  try {
    const img = await loadImage(file);

    /* Solo se reduce, nunca se agranda una imagen pequeña. */
    const scale = Math.min(1, MAX_WIDTH / img.width);
    const width = Math.round(img.width * scale);
    const height = Math.round(img.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    /* Los PNG con transparencia quedarían con fondo negro al pasar a JPEG. */
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", QUALITY)
    );
    if (!blob) return file;

    /* Si la compresión no ganó nada (imagen ya optimizada), se conserva
       el original para no degradarla sin motivo. */
    if (blob.size >= file.size) return file;

    const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], name, {
      type: "image/jpeg",
      lastModified: file.lastModified,
    });
  } catch {
    return file;
  }
}
