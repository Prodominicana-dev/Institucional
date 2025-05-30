"use client";
import AuthUser from "@/components/admin/auth";
import DeleteButton from "@/components/admin/delete";
import Card from "@/components/admin/gallery/card";
import { GalleryDialog } from "@/components/admin/gallery/dialog";
import { PhotoDialog } from "@/components/admin/gallery/photo/dialog";
import Sketch from "@/components/admin/sketch";
import { deletePhoto, usePhotoGallery } from "@/services/gallery/photo/service";
import { useGallery, useGalleryById } from "@/services/gallery/service";
import { useDirections } from "@/services/structure-organizational/service";
import { useUser } from "@auth0/nextjs-auth0";
import { XMarkIcon } from "@heroicons/react/24/solid";

import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { HashLoader } from "react-spinners";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);
  const { user, isLoading: userLoading } = useUser();
  const [filterOpen, setFilterOpen] = useState(false);
  const { data, isLoading, refetch } = usePhotoGallery(id);
  const { data: galleryData, isLoading: galleryLoading } = useGalleryById(id);
  const [gallery, setGallery] = useState([]);
  const [_refetch, setRefetch] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<any>(null);
  const [deleted, isDeleted] = useState(false);
  const [title, setTitle] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  const indexOfLastDirection = currentPage * itemsPerPage;
  const indexOfFirstDirection = indexOfLastDirection - itemsPerPage;
  const currentGallery = gallery?.slice(
    indexOfFirstDirection,
    indexOfLastDirection
  );
  const totalPages = Math.ceil(gallery?.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (!isLoading && !userLoading) updateGallery;
  }, [data, isLoading, userLoading, user]);

  useEffect(() => {
    if (galleryData && !galleryLoading) {
      setTitle(galleryData?.title);
    }
  }, [galleryData, galleryLoading]);

  useEffect(() => {
    refetch().then((e) => {
      setGallery(e.data);
    });
  }, [_refetch]);

  const updateGallery = () => {
    setRefetch(!_refetch);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDeleteOpen = () => {
    isDeleted(!deleted);
  };

  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen);
  };

  const handleDelete = (galleryId: string, photoId: string) => {
    if (user && !userLoading) {
      deletePhoto(galleryId, photoId, updateGallery, user?.sub as string);
    }
  };
  const handleFilter = () => {
    if (data) {
      let filteredData = [...data];
      if (search !== "") {
        filteredData = filteredData.filter((section) =>
          section.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (filter !== null) {
        filteredData = filteredData.filter(
          (section) => section.status === filter
        );
      }
      setGallery(filteredData as any);
      setCurrentPage(1); // Reset page to 1 when applying filters
    }
  };

  useEffect(() => {
    handleFilter();
  }, [search, filter]);

  const statusOption = [
    { value: null, label: "Todos" },
    { value: true, label: "Activo" },
    { value: false, label: "Inactivo" },
  ];

  const totalOption = [
    { value: 15, label: "15" },
    { value: 20, label: "20" },
    { value: 25, label: "25" },
  ];

  const nextEmpty =
    "w-6/12 h-full text-blue-dark bg-white border-2 border-blue-dark rounded-lg justify-center items-center";

  const nextNotEmpty =
    "w-6/12 h-full text-white bg-blue-dark border-2 border-blue-dark hover:bg-white hover:text-blue-dark duration-300 hover:shadow-lg rounded-lg justify-center items-center";

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <HashLoader />
      </div>
    );
  }
  return (
    <>
      <AuthUser permission="create:transparency">
        <Sketch
          title={`${title}`}
          handleFilterOpen={handleFilterOpen}
          buttons={[{ name: "Agregar", onClick: handleOpen }]}
          hasFilter={false}
        >
          {gallery?.length > 0 ? (
            <>
              <div className="w-11/12 flex flex-col space-y-4">
                <div className="w-full flex justify-between">
                  <div className="text-black flex items-center">
                    {gallery?.length > 0 && (
                      <>
                        Mostrando las galerías del{" "}
                        {currentPage === 1
                          ? 1
                          : (currentPage - 1) * itemsPerPage + 1}{" "}
                        al{" "}
                        {Math.min(currentPage * itemsPerPage, gallery?.length)}{" "}
                        de {gallery?.length} totales.
                      </>
                    )}
                  </div>
                  <div className="text-black flex items-center space-x-2">
                    <span> Se mostrarán</span>
                    <Select
                      id="subsection"
                      className="w-20"
                      menuPlacement="auto"
                      options={totalOption}
                      defaultValue={totalOption.find(
                        (opt) => opt.value === itemsPerPage
                      )}
                      onChange={(e) => setItemsPerPage(e?.value as number)}
                    />
                    <span>galerías por página.</span>
                  </div>
                </div>
                <div className="w-full  space-y-5 text-black">
                  <>
                    <div className="grid items-center justify-between w-full gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 font-bold text-center bg-white rounded-lg">
                      {currentGallery?.map((gallery: any, key: number) => {
                        return (
                          <div
                            key={key}
                            className="w-full rounded-lg p-5 relative"
                          >
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_URL}/gallery/${gallery?.galleryId}/img/${gallery?.name}`}
                              alt={gallery?.name}
                              width={1920}
                              height={1080}
                              className="w-full object-cover"
                            />
                            <button
                              onClick={() => {
                                handleDelete(gallery.galleryId, gallery.id);
                              }}
                              className="absolute size-10 rounded-full bg-red flex items-center justify-center bg-red-500 hover:bg-red-500/80 duration-200 text-white z-10 top-2 right-2"
                            >
                              <XMarkIcon className="size-5" />
                            </button>
                            {deleted && (
                              <DeleteButton
                                open={deleted}
                                title="Eliminar Galería de Fotos"
                                message="¿Estás seguro de que deseas eliminar esta galería de fotos? Esta acción no se puede deshacer y además se eliminarán todas las imágenes asociadas a la galería."
                                handleOpen={handleDeleteOpen}
                                funct={() =>
                                  handleDelete(gallery.galleryId, gallery.id)
                                }
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex flex-row space-x-4 w-full h-12">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={`${
                          currentPage === 1 ? nextEmpty : nextNotEmpty
                        }`}
                      >
                        Anterior
                      </button>
                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={`${
                          currentPage === totalPages ? nextEmpty : nextNotEmpty
                        }`}
                      >
                        Siguiente
                      </button>
                    </div>
                  </>
                </div>
              </div>
            </>
          ) : (
            <>No hay</>
          )}
        </Sketch>
        {open && (
          <PhotoDialog
            galleryId={id}
            open={open}
            handler={handleOpen}
            update={updateGallery}
          />
        )}
      </AuthUser>
    </>
  );
}
