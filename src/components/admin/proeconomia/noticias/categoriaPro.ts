import { type CategoryOption } from "@/components/admin/news/NewsModal/CategorySelect";

/* Al publicar en Noticias Pro solo se elige la SECCION. La categoria del
   portal ya no se pregunta, pero sigue siendo obligatoria en la base, asi que
   todas las noticias de Noticias Pro guardan siempre esta, creada una sola vez
   en el portal. Si no existe, no se puede publicar y el formulario lo dice. */
export const CATEGORIA_PRO = "Noticias Pro";

export function idCategoriaPro(opciones: CategoryOption[]): string {
  return opciones.find((o) => o.label === CATEGORIA_PRO)?.value ?? "";
}
