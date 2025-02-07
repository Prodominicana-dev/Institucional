"use client";
import Sketch from "@/components/admin/sketch";
import { DocumentDialog } from "@/components/admin/transparency/document/dialog";
import Card from "@/components/admin/transparency/document/card";
import { useDocuments } from "@/services/document/service";
import { useUser } from "@auth0/nextjs-auth0/client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect, use } from "react";
import Select from "react-select";
import {
  useSectionSubsAdmin,
  useSubsectionFilter,
} from "@/services/subsection/service";
import AuthUser from "@/components/admin/auth";
import { Spinner } from "@material-tailwind/react";

export default function Page() {
  const [open, setOpen] = useState(false);
  const { user, isLoading: userLoading } = useUser();
  const [filterOpen, setFilterOpen] = useState(false);
  const { data, isLoading, refetch } = useDocuments();
  const [documents, setDocuments] = useState([]);
  const [_refetch, setRefetch] = useState(false);
  const [search, setSearch] = useState("");
  const { data: sectionData, isLoading: sectionLoading } =
    useSectionSubsAdmin();
  const { data: subsectionData, isLoading: subsectionLoading } =
    useSubsectionFilter();
  const [section, setSection] = useState<any>(null);
  const [subsection, setSubsection] = useState<any>(null);
  const [sectionFilter, setSectionFilter] = useState<any>(null);
  const [subsectionFilter, setSubsectionFilter] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const indexOfLastSection = currentPage * itemsPerPage;
  const indexOfFirstSection = indexOfLastSection - itemsPerPage;
  const currentDocuments = documents?.slice(
    indexOfFirstSection,
    indexOfLastSection
  );
  const totalPages = Math.ceil(documents?.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (!sectionLoading && !subsectionLoading) {
      setSection(sectionData);
      setSubsection(subsectionData);
    }
  }, [sectionData, subsectionData]);

  useEffect(() => {
    if (!isLoading && !userLoading) updateDocuments;
  }, [data, isLoading, userLoading, user]);

  useEffect(() => {
    refetch().then((e) => {
      setDocuments(e.data);
    });
  }, [_refetch]);

  const updateDocuments = () => {
    setRefetch(!_refetch);
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen);
  };

  const handleFilter = () => {
    if (data) {
      let filteredData = [...data];
      if (search !== "") {
        filteredData = filteredData.filter((document) =>
          document.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (sectionFilter !== null) {
        filteredData = filteredData.filter(
          (document) => document.sectionId === sectionFilter.value
        );
      }
      if (subsectionFilter !== null) {
        filteredData = filteredData.filter(
          (document) => document.subsectionId === subsectionFilter.value
        );
      }
      setDocuments(filteredData as any);
      setCurrentPage(1); // Reset page to 1 when applying filters
    }
  };

  useEffect(() => {
    handleFilter();
  }, [search, subsectionFilter, sectionFilter]);

  const totalOption = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
  ];

  const nextEmpty =
    "w-6/12 h-full text-blue-dark bg-white border-2 border-blue-dark rounded-lg justify-center items-center";

  const nextNotEmpty =
    "w-6/12 h-full text-white bg-blue-dark border-2 border-blue-dark hover:bg-white hover:text-blue-dark duration-300 hover:shadow-lg rounded-lg justify-center items-center";

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <Spinner
          className="size-7"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      </div>
    );
  }
  return (
    <>
      <AuthUser permission="create:transparency">
        <Sketch
          title="Documentos"
          subtitle="Transparencia"
          handleFilterOpen={handleFilterOpen}
          buttons={[{ name: "Agregar", onClick: handleOpen }]}
        >
          <div
            className={`${
              filterOpen ? "flex" : "hidden"
            } w-11/12 h-10 flex-row justify-end items-end space-x-4`}
          >
            <div className="flex flex-col">
              <input
                type="text"
                className="w-56 h-10 border-2 p-4 border-gray-200 rounded-full focus:outline-none focus:border-blue-dark"
                placeholder="Buscar por nombre..."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400">Secciones</label>
              <Select
                id="subsection"
                className="w-56"
                menuPlacement="auto"
                options={section}
                onChange={(e) => setSectionFilter(e)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400">Subsecciones</label>
              <Select
                id="subsection"
                className="w-56"
                menuPlacement="auto"
                options={subsection}
                onChange={(e) => setSubsectionFilter(e)}
              />
            </div>
            <button
              onClick={() => {
                setSearch("");
                setSectionFilter(null);
                setSubsectionFilter(null);
                setFilterOpen(false);
              }}
              className=" w-10 h-10 flex justify-center items-center rounded-lg bg-red-500 text-white hover:shadow-lg hover:bg-red-700 duration-300 "
            >
              <XMarkIcon className="w-7 h-7" />
            </button>
          </div>
          {documents?.length > 0 ? (
            <>
              <div className="w-11/12 flex flex-col space-y-4">
                <div className="w-full flex justify-between">
                  <div className="text-black flex items-center">
                    {documents?.length > 0 && (
                      <>
                        Mostrando los documentos del{" "}
                        {currentPage === 1
                          ? 1
                          : (currentPage - 1) * itemsPerPage + 1}{" "}
                        al{" "}
                        {Math.min(
                          currentPage * itemsPerPage,
                          documents?.length
                        )}{" "}
                        de {documents?.length} totales.
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
                    <span>secciones por página.</span>
                  </div>
                </div>
                <div className="w-full  space-y-5 text-black">
                  <>
                    <div className="grid items-center justify-between w-full h-24 grid-cols-3 p-5 font-bold text-center bg-white rounded-lg sm:grid-cols-5 ring-2 ring-gray-100">
                      <div>Fecha</div>
                      <div>Sección</div>
                      <div>Subsección</div>
                      <div>Documento</div>
                      <div>Acción</div>
                    </div>

                    {currentDocuments?.map((document: any, key: number) => {
                      return (
                        <Card
                          key={key}
                          document={document}
                          update={updateDocuments}
                        />
                      );
                    })}

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
          <DocumentDialog
            open={open}
            handler={handleOpen}
            update={updateDocuments}
          />
        )}
      </AuthUser>
    </>
  );
}
