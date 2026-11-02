/* Parte publica del servicio de banners. Va aparte del servicio del admin
   para que la home no cargue react-query ni las notificaciones del admin. */

export interface Banner {
  id: string;
  image: string;
  title: string;
  link?: string | null;
  /* true = el enlace se abre en una pestaña nueva */
  external: boolean;
  /* "es" | "en". null = sale en todos los idiomas */
  locale?: "es" | "en" | null;
  order: number;
  /* false = oculto: sigue guardado pero no sale en la home */
  visible: boolean;
}

export function bannerImageUrl(b: Pick<Banner, "id" | "image">) {
  return `${process.env.NEXT_PUBLIC_API_URL}/banner/${b.id}/img/${encodeURIComponent(b.image)}`;
}

/* Banners que ve el público: solo los visibles del idioma pedido. */
export async function fetchPublicBanners(locale: string): Promise<Banner[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/banner?locale=${encodeURIComponent(locale)}`
  );
  if (!res.ok) throw new Error(`Banners: ${res.status}`);
  return (await res.json()) as Banner[];
}
