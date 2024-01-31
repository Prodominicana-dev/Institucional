"use client";
import AuthUser from "@/components/admin/auth";
import Sketch from "@/components/admin/sketch";
import Card from "@/components/admin/transparency/section/card";
import { SectionDialog } from "@/components/admin/transparency/section/dialog";
import { Section } from "@/models/section";
import { useSectionAdmin } from "@/services/section/service";
import { useUser } from "@auth0/nextjs-auth0/client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Spinner } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import Select from "react-select";

export default function Page() {
  const [open, setOpen] = useState(false);
  const { user, isLoading: userLoading } = useUser();
  const [filterOpen, setFilterOpen] = useState(false);
  const { data, isLoading, refetch } = useSectionAdmin();
  const [sections, setSections] = useState([]);
  const [_refetch, setRefetch] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastSection = currentPage * itemsPerPage;
  const indexOfFirstSection = indexOfLastSection - itemsPerPage;
  const currentSections = sections?.slice(
    indexOfFirstSection,
    indexOfLastSection
  );
  const totalPages = Math.ceil(sections?.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (!isLoading && !userLoading) updateSections;
  }, [data, isLoading, userLoading, user]);

  console.log(sections);

  useEffect(() => {
    refetch().then((e) => {
      setSections(e.data);
    });
  }, [_refetch]);

  const updateSections = () => {
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
        filteredData = filteredData.filter((section) =>
          section.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (filter !== null) {
        filteredData = filteredData.filter(
          (section) => section.status === filter
        );
      }
      setSections(filteredData as any);
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
        <Spinner className="w-7 h-7" />
      </div>
    );
  }
  return (
    <>
      <AuthUser permission="create:transparency">
        <Sketch
          title="Secciones"
          subtitle="Transparencia"
          handleOpen={handleOpen}
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
              <label className="text-gray-400">Filtrar por...</label>
              <Select
                id="subsection"
                className="w-56"
                menuPlacement="auto"
                options={statusOption}
                defaultValue={statusOption[0]}
                onChange={(e) => setFilter(e?.value as boolean)}
              />
            </div>
            <button
              onClick={() => {
                setSearch("");
                setFilter(null);
              }}
              className=" w-10 h-10 flex justify-center items-center rounded-lg bg-red-500 text-white hover:shadow-lg hover:bg-red-700 duration-300 "
            >
              <XMarkIcon className="w-7 h-7" />
            </button>
          </div>
          {sections?.length > 0 ? (
            <>
              <div className="w-11/12 flex flex-col space-y-4">
                <div className="w-full flex justify-between">
                  <div className="text-black flex items-center">
                    {sections?.length > 0 && (
                      <>
                        Mostrando las secciones del{" "}
                        {currentPage === 1
                          ? 1
                          : (currentPage - 1) * itemsPerPage + 1}{" "}
                        al{" "}
                        {Math.min(currentPage * itemsPerPage, sections?.length)}{" "}
                        de {sections?.length} totales.
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
                    <div className="grid items-center justify-between w-full h-24 grid-cols-3 p-5 font-bold text-center bg-white rounded-lg ring-2 ring-gray-100">
                      <div className="text-center">Nombre</div>
                      <div className="">Estado</div>
                      <div>Acción</div>
                    </div>

                    {currentSections?.map((section: Section, key: number) => {
                      return (
                        <Card
                          key={key}
                          section={section}
                          update={updateSections}
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
          <SectionDialog
            open={open}
            handler={handleOpen}
            update={updateSections}
          />
        )}
      </AuthUser>
    </>
  );
}
