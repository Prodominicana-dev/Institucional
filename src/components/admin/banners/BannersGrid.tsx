"use client";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { HashLoader } from "react-spinners";
import Image from "next/image";
import DeleteButton from "@/components/admin/delete";
import { Button } from "@/components/ui/button";
import {
  Banner,
  bannerImageUrl,
  createBanner,
  deleteBanner,
  reorderBanners,
  setBannerVisibility,
  useAdminBanners,
} from "@/services/banner/service";
import { BannerModal } from "./BannerModal";

interface Props {
  addOpen: boolean;
  onAddClose: () => void;
}

/* Banners que hoy estan fijos en el codigo de la home. El boton "Importar"
   los carga en la base de datos para poder administrarlos desde aqui. Las
   imagenes ya estan publicadas en /public/images. */
const DEFAULT_BANNERS = [
  {
    file: "bannerDashboardModa.jpg",
    title: "Explora nuestro Dashboard de Moda",
    link: "https://app.powerbi.com/links/RDc8I1GV7l?ctid=10ea1582-f863-4bd4-af09-3c745e735c05&pbi_source=linkShare",
    external: true,
    locale: "es",
  },
  {
    file: "BANNER MUJERES 2027 PAGINA WEB PD.jpg",
    title: "Mujeres en Exportación",
    link: "https://forms.monday.com/forms/9866f0d5847de778a946082cb0732a0e?r=use1",
    external: true,
    locale: "es",
  },
  {
    file: "BANNER MUJERES WEB INGLES.jpg",
    title: "National Women in Export Forum",
    link: "https://forms.monday.com/forms/6d166f4eaaf1e4fe8a560ce8b773f787?r=use1",
    external: true,
    locale: "en",
  },
];

const LOCALE_LABEL: Record<string, string> = {
  es: "Solo español",
  en: "Solo inglés",
};

export function BannersGrid({ addOpen, onAddClose }: Props) {
  const { user } = useUser();
  const userId = user?.sub as string | undefined;
  const { data, isLoading, isError, refetch } = useAdminBanners(userId);
  const [editItem, setEditItem] = useState<Banner | null>(null);
  const [deleteItem, setDeleteItem] = useState<Banner | null>(null);
  const [importing, setImporting] = useState(false);

  const handleUpdate = () => {
    refetch();
  };

  const handleDelete = () => {
    if (!deleteItem || !userId) return;
    deleteBanner(deleteItem.id, () => setDeleteItem(null), handleUpdate, userId);
  };

  const banners = data ?? [];

  const move = (index: number, delta: number) => {
    if (!userId) return;
    const ids = banners.map((b) => b.id);
    const target = index + delta;
    if (target < 0 || target >= ids.length) return;
    [ids[index], ids[target]] = [ids[target], ids[index]];
    reorderBanners(ids, handleUpdate, userId);
  };

  const importDefaults = async () => {
    if (!userId) return;
    setImporting(true);
    for (const d of DEFAULT_BANNERS) {
      try {
        const blob = await (await fetch(`/images/${encodeURIComponent(d.file)}`)).blob();
        const formData = new FormData();
        formData.append("images", new File([blob], d.file, { type: blob.type }));
        formData.append("title", d.title);
        formData.append("link", d.link);
        formData.append("external", String(d.external));
        formData.append("locale", d.locale);
        formData.append("visible", "true");
        await createBanner(formData, () => {}, userId, true);
      } catch {
        /* createBanner ya avisa si falla; sigue con el siguiente */
      }
    }
    setImporting(false);
    handleUpdate();
  };

  if (isLoading || !userId) {
    return (
      <div className="flex w-full justify-center py-20">
        <HashLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="py-12 text-center text-red-600">
        No se pudieron cargar los banners. Verifique que el API esté actualizado
        y que la tabla Banner exista en la base de datos.
      </p>
    );
  }

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        {banners.map((b, i) => (
          <div
            key={b.id}
            className={`flex flex-col gap-3 rounded-xl border bg-white p-3 shadow-sm lg:flex-row lg:items-center ${
              b.visible ? "" : "opacity-60"
            }`}
          >
            <div className="relative h-16 w-full overflow-hidden rounded-lg bg-gray-100 lg:w-96 lg:shrink-0">
              <Image
                src={bannerImageUrl(b)}
                alt={b.title}
                fill
                sizes="400px"
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900">
                {b.title}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                <span
                  className={`rounded-full px-2 py-0.5 font-medium ${
                    b.visible
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {b.visible ? "Visible" : "Oculto"}
                </span>
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-blue-dark">
                  {b.locale ? LOCALE_LABEL[b.locale] : "Todos los idiomas"}
                </span>
                {b.link && (
                  <a
                    href={b.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="max-w-xs truncate text-blue-dark hover:underline"
                  >
                    {b.link}
                  </a>
                )}
              </div>
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="rounded-lg border p-1.5 text-gray-600 disabled:opacity-30"
                title="Subir"
              >
                <ChevronUpIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => move(i, 1)}
                disabled={i === banners.length - 1}
                className="rounded-lg border p-1.5 text-gray-600 disabled:opacity-30"
                title="Bajar"
              >
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setBannerVisibility(b.id, !b.visible, handleUpdate, userId)}
                className="rounded-lg border p-1.5 text-gray-700"
                title={b.visible ? "Ocultar" : "Mostrar"}
              >
                {b.visible ? (
                  <EyeSlashIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => setEditItem(b)}
                className="rounded-lg border p-1.5 text-blue-dark"
                title="Editar"
              >
                <PencilSquareIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setDeleteItem(b)}
                className="rounded-lg border p-1.5 text-red-600"
                title="Eliminar"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {banners.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-12 text-center text-gray-500">
            <p>No hay banners registrados.</p>
            <p className="max-w-md text-sm">
              Si es la primera vez, puede cargar los banners que hoy tiene la
              página de inicio para administrarlos desde aquí.
            </p>
            <Button
              onClick={importDefaults}
              disabled={importing}
              className="bg-blue-dark text-white hover:bg-blue-dark/90"
            >
              {importing ? <HashLoader size={16} /> : "Importar los banners actuales"}
            </Button>
          </div>
        )}
      </div>

      {addOpen && <BannerModal open onClose={onAddClose} update={handleUpdate} />}
      {editItem && (
        <BannerModal
          open
          banner={editItem}
          onClose={() => setEditItem(null)}
          update={handleUpdate}
        />
      )}
      {deleteItem && (
        <DeleteButton
          open
          title="Eliminar banner"
          message={`¿Está seguro de que desea eliminar el banner "${deleteItem.title}"? Esta acción no se puede deshacer. Si solo quiere quitarlo de la página por un tiempo, use Ocultar.`}
          handleOpen={() => setDeleteItem(null)}
          funct={handleDelete}
        />
      )}
    </>
  );
}
