"use client";
import { useState } from "react";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";
import {
  deleteNews,
  disableNews,
  enableNews,
  useNewsConfById,
} from "@/services/news/service";
import DeactiveButton from "@/components/admin/inactive";
import ActivateButton from "@/components/admin/active";
import DeleteButton from "@/components/admin/delete";
import { PreviewModal } from "@/components/admin/news/NewsModal/PreviewModal";
import { SECCIONES } from "@/components/proeconomia/secciones";
import { BarraAccionesPro } from "./BarraAccionesPro";
import { EditarNoticiaPro } from "./EditarNoticiaPro";

/* Tarjeta de una noticia de Noticias Pro. A diferencia de la del portal,
   muestra la seccion en la que sale y abre el editor de Noticias Pro. */
export default function TarjetaPro({
  news,
  update,
}: {
  news: any;
  update: () => void;
}) {
  const { user, isLoading } = useUser();
  const [activate, setActivate] = useState(false);
  const [deleted, setDelete] = useState(false);
  const [inactive, setInactive] = useState(false);
  const [edit, setEdit] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { data: previewNews, isLoading: previewLoading } = useNewsConfById(
    news.id,
    previewOpen
  );

  const seccion = SECCIONES.find((s) => s.key === news.seccion);

  const handleEditOpen = () => setEdit(!edit);
  const handleInactiveOpen = () => setInactive(!inactive);
  const handleActivateOpen = () => setActivate(!activate);
  const handleDeleteOpen = () => setDelete(!deleted);

  const handleDeactivate = () => {
    if (user && !isLoading) {
      disableNews(news.id as string, handleInactiveOpen, update, user.sub as string);
    }
  };

  const handleActivate = () => {
    if (user && !isLoading) {
      enableNews(news.id as string, handleActivateOpen, update, user.sub as string);
    }
  };

  const handleDelete = () => {
    if (user && !isLoading) {
      deleteNews(news.id as string, handleDeleteOpen, update, user.sub as string);
    }
  };

  return (
    <div className="w-full min-h-[60vh] bg-gray-200 flex flex-col justify-center items-center rounded-lg">
      <div className="w-full h-5/6 flex flex-col items-center rounded-t-lg">
        <div className="w-full h-[75%] relative">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/news/images/${news.id}/${news.cover}`}
            alt={news.title}
            width={1920}
            height={1080}
            className="w-full h-full rounded-t-lg shadow-sm object-cover"
          />
          <span className="absolute top-3 left-3 rounded-full bg-[#C8102E] px-3 py-1 text-xs font-bold uppercase text-white font-montserrat">
            {seccion ? seccion.nombre : "Sin sección"}
          </span>
          {!news.status && (
            <span className="absolute top-3 right-3 rounded-full bg-black/80 px-3 py-1 text-xs font-bold uppercase text-white font-montserrat">
              Oculta
            </span>
          )}
        </div>
        <div className="w-11/12 h-[25%] flex flex-col justify-center">
          <h1 className="text-2xl text-black font-montserrat font-bold truncate w-full">
            {news.title}
          </h1>
          <p className="text-lg text-black/90 font-montserrat truncate w-full">
            {news.category.nameEs}
          </p>
        </div>
      </div>

      <BarraAccionesPro
        publicada={!!news.status}
        onVistaPrevia={() => setPreviewOpen(true)}
        onEditar={handleEditOpen}
        onCambiarEstado={news.status ? handleInactiveOpen : handleActivateOpen}
        onEliminar={handleDeleteOpen}
      />

      {edit && (
        <EditarNoticiaPro
          id={news.id}
          open={edit}
          handler={handleEditOpen}
          update={update}
        />
      )}

      {inactive && (
        <DeactiveButton
          open={inactive}
          title="Ocultar Noticia"
          message="¿Estás seguro que deseas ocultar esta noticia? Dejará de verse en Noticias Pro."
          handleOpen={handleInactiveOpen}
          funct={handleDeactivate}
        />
      )}
      {activate && (
        <ActivateButton
          open={activate}
          title="Activar Noticia"
          message="¿Estás seguro que deseas activar esta noticia? Será visible en Noticias Pro."
          handleOpen={handleActivateOpen}
          funct={handleActivate}
        />
      )}
      {deleted && (
        <DeleteButton
          open={deleted}
          title="Eliminar Noticia"
          message="¿Estás seguro de que deseas eliminar esta noticia? Esta acción no se puede deshacer."
          handleOpen={handleDeleteOpen}
          funct={handleDelete}
        />
      )}

      <PreviewModal
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        loading={previewLoading}
        spanish={{
          title: previewNews?.es?.title ?? "",
          description: previewNews?.es?.description ?? "",
          content: previewNews?.es?.content ?? "",
        }}
        english={{
          title: previewNews?.en?.title ?? "",
          description: previewNews?.en?.description ?? "",
          content: previewNews?.en?.content ?? "",
        }}
        coverSrc={
          previewNews
            ? `${process.env.NEXT_PUBLIC_API_URL}/news/images/${news.id}/${previewNews.cover}`
            : undefined
        }
        categoryLabel={previewNews?.category?.nameEs}
        date={previewNews ? new Date(previewNews.date) : undefined}
      />
    </div>
  );
}
