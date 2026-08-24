"use client";
import AuthUser from "@/components/admin/auth";
import Sketch from "@/components/admin/sketch";
import Card from "@/components/admin/qr-docs/card";
import { QrDocDialog } from "@/components/admin/qr-docs/dialog";
import { useQrDocs } from "@/services/qr-docs/service";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { HashLoader } from "react-spinners";

export default function Page() {
  const { data, isLoading, isError, refetch } = useQrDocs();

  const [open, setOpen] = useState(false);
  const [aReemplazar, setAReemplazar] = useState<any>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [documentos, setDocumentos] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentDocs = documentos?.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil((documentos?.length ?? 0) / itemsPerPage);

  /* El filtrado se rehace cuando cambia la búsqueda o llega el listado */
  useEffect(() => {
    if (!data) return;
    const filtrados =
      search === ""
        ? [...data]
        : data.filter((doc: any) =>
            doc.name.toLowerCase().includes(search.toLowerCase())
          );
    setDocumentos(filtrados);
    setCurrentPage(1);
  }, [search, data]);

  const update = () => {
    refetch();
  };

  const handleOpen = () => {
    setAReemplazar(null);
    setOpen(!open);
  };

  const handleReplace = (documento: any) => {
    setAReemplazar(documento);
    setOpen(true);
  };

  const totalOption = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
  ];

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <HashLoader />
      </div>
    );
  }

  return (
    <AuthUser permission="create:transparency">
      <Sketch
        title="Documentos QR"
        subtitle="Archivos que abren los códigos QR impresos"
        handleFilterOpen={() => setFilterOpen(!filterOpen)}
        buttons={[{ name: "Agregar", onClick: handleOpen }]}
      >
        <div className="w-11/12 flex items-start gap-2 text-sm text-gray-500">
          <ExclamationCircleIcon className="size-5 shrink-0 mt-0.5" />
          <span>
            El nombre del archivo es la dirección que abre el código QR. Al
            reemplazar un documento el nombre se conserva, y del anterior se
            guarda una copia.
          </span>
        </div>

        <div
          className={`${
            filterOpen ? "flex" : "hidden"
          } w-11/12 h-10 flex-row justify-end items-end space-x-4`}
        >
          <input
            type="text"
            className="w-56 h-10 border-2 p-4 border-gray-200 rounded-full focus:outline-none focus:border-blue-dark"
            placeholder="Buscar por nombre..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button
            onClick={() => setSearch("")}
            className="w-10 h-10 flex justify-center items-center rounded-lg bg-red-500 text-white hover:shadow-lg hover:bg-red-700 duration-300 cursor-pointer"
          >
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>

        {documentos?.length > 0 ? (
          <div className="w-11/12 flex flex-col space-y-4">
            <div className="w-full flex justify-between">
              <div className="text-black flex items-center">
                Mostrando los documentos del{" "}
                {currentPage === 1 ? 1 : (currentPage - 1) * itemsPerPage + 1} al{" "}
                {Math.min(currentPage * itemsPerPage, documentos.length)} de{" "}
                {documentos.length} totales.
              </div>
              <div className="text-black flex items-center space-x-2">
                <span>Se mostrarán</span>
                <Select
                  className="w-20"
                  menuPlacement="auto"
                  options={totalOption}
                  defaultValue={totalOption.find(
                    (opt) => opt.value === itemsPerPage
                  )}
                  onChange={(e) => setItemsPerPage(e?.value as number)}
                />
                <span>documentos por página.</span>
              </div>
            </div>

            <div className="w-full space-y-5 text-black">
              {/* Mismas proporciones de columna que la fila, para que los
                  encabezados queden alineados con los datos */}
              <div className="grid items-center w-full h-16 grid-cols-[minmax(0,2.6fr)_minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,1.3fr)] gap-2 px-5 font-bold text-center bg-white rounded-lg ring-2 ring-gray-100">
                <div className="text-start">Archivo</div>
                <div>Peso</div>
                <div>Actualizado</div>
                <div>Acción</div>
              </div>

              {currentDocs?.map((documento: any, key: number) => (
                <Card
                  key={key}
                  document={documento}
                  onReplace={handleReplace}
                  update={update}
                />
              ))}

              <div className="flex flex-row space-x-4 w-full h-12">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="w-6/12 h-full text-white bg-blue-dark border-2 border-blue-dark hover:bg-white hover:text-blue-dark duration-300 rounded-lg disabled:opacity-40 cursor-pointer"
                >
                  Anterior
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="w-6/12 h-full text-white bg-blue-dark border-2 border-blue-dark hover:bg-white hover:text-blue-dark duration-300 rounded-lg disabled:opacity-40 cursor-pointer"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        ) : isError ? (
          <div className="w-11/12 flex flex-col items-center justify-center gap-4 py-16 text-center bg-white rounded-lg ring-2 ring-gray-100">
            <ExclamationCircleIcon className="size-10 text-red-500" />
            <div className="text-black font-semibold">
              No se pudo obtener el listado de documentos.
            </div>
            <div className="text-gray-500 text-sm w-2/3">
              Revisa que la API esté disponible y vuelve a intentarlo.
            </div>
            <button
              onClick={() => refetch()}
              className="w-36 h-12 rounded-full bg-blue-dark text-white hover:text-white/80 hover:shadow-md cursor-pointer"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <div className="w-11/12 flex flex-col items-center justify-center gap-4 py-16 text-center bg-white rounded-lg ring-2 ring-gray-100">
            <div className="text-black font-semibold">
              {search
                ? "Ningún documento coincide con la búsqueda."
                : "No hay documentos cargados todavía."}
            </div>
          </div>
        )}
      </Sketch>

      <QrDocDialog
        open={open}
        handler={() => setOpen(!open)}
        update={update}
        documento={aReemplazar}
      />
    </AuthUser>
  );
}
