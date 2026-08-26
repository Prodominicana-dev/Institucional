This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Notas técnicas

### Compresión de portadas en el admin de Noticias

**Problema:** Cloudflare está delante de la API del sitio y rechaza peticiones con
cuerpo muy grande. Cuando un redactor subía una foto de cámara/celular sin editar
(10–20 MB) como portada de una noticia, la petición podía ser bloqueada por
Cloudflare antes de llegar al servidor. Además, el hosting compartido donde vive
la API es lento subiendo archivos, así que aun cuando la petición sí pasaba,
podía tardar tanto que el cliente cortaba la conexión antes de que el servidor
terminara de procesarla.

**Importante:** la solución no evita ni bypasea Cloudflare — la petición sigue
pasando por ahí igual que siempre. Lo que se hizo fue atacar las dos causas del
problema desde el otro lado:

**1) Comprimir la portada en el navegador antes de enviarla**
(`src/lib/image-compression.ts`, usado desde
`src/components/admin/news/dialog.tsx` y `edit.tsx`):

- Si la imagen pesa más de 300 KB, se redimensiona a un máximo de 1920px de
  ancho (el tamaño más grande que se muestra realmente en el portal) y se
  recomprime como JPEG al 85% de calidad, punto donde la pérdida visual es
  imperceptible.
- Una foto de ~20 MB queda típicamente en unos cientos de KB sin diferencia
  visible en la web — al pesar tan poco, ya no choca con el límite de tamaño
  de Cloudflare y la subida es notablemente más rápida.
- GIF y SVG no se tocan (se perdería la animación / no aplica rasterizar un
  vectorial). Si la imagen ya está optimizada y comprimir no reduce el
  tamaño, se conserva el original. Si la compresión falla por cualquier
  motivo, se sube el archivo original — nunca debe romper la publicación.
- Hay un checkbox "mantener original" (`keepOriginal`) para que el redactor
  pueda forzar la subida sin comprimir si lo necesita.
- Además, se dejó un tope duro de 25 MB (`MAX_COVER_SIZE`) que corta en el
  navegador con un mensaje claro, para no dejar que el usuario intente subir
  algo que Cloudflare va a rechazar de todas formas.

**2) Extender el timeout de subida a 5 minutos**
(`UPLOAD_TIMEOUT_MS` en `src/services/news/service.ts`), para que axios no
corte la petición si el hosting compartido de la API responde lento, aun con
la portada ya comprimida.

### Cómo replicar esto en un módulo nuevo que suba archivos

Hoy esta lógica vive solo en Noticias y quedaría duplicada si otro módulo
(Documentos, Galería, QR-docs, etc.) la necesita. Para reusarla sin copiar
código:

- **Imágenes:** importar `compressImage()` desde `src/lib/image-compression.ts`
  directamente — es genérica, no tiene nada específico de Noticias. Se llama
  sobre el `File` justo antes de armar el `FormData`, igual que en
  `dialog.tsx`/`edit.tsx` de News.
- **Timeout largo:** `UPLOAD_TIMEOUT_MS` está definido dentro de
  `services/news/service.ts`, así que por ahora hay que declararlo de nuevo en
  cada servicio nuevo. Pendiente: moverlo a un lugar compartido (ej.
  `src/lib/upload-config.ts`) o exponer una instancia de axios preconfigurada
  (`axios.create({ timeout: UPLOAD_TIMEOUT_MS })`) para que un módulo nuevo
  solo la importe en vez de repetir el número a mano.
- **Tope duro de tamaño:** replicar el patrón de `MAX_COVER_SIZE` (constante +
  corte en el navegador con mensaje claro) ajustado al límite real de
  Cloudflare para el endpoint correspondiente.
