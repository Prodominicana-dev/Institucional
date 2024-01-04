"use client";
import Sketch from "@/components/admin/sketch";
import Card from "@/components/admin/transparency/section/card";
import { SectionDialog } from "@/components/admin/transparency/section/dialog";
import { Section } from "@/models/section";
import { useSectionAdmin } from "@/services/section/service";
import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useState, useEffect } from "react";

export default function page() {
  const [open, setOpen] = useState(false);
  const { user, isLoading: userLoading } = useUser();
  const [filterOpen, setFilterOpen] = useState(false);
  const { data, isLoading, refetch } = useSectionAdmin();
  const [sections, setSections] = useState([]);
  const [_refetch, setRefetch] = useState(false);

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
  return (
    <>
      <Sketch
        title="Secciones"
        subtitle="Transparencia"
        handleOpen={handleOpen}
        handleFilterOpen={handleFilterOpen}
      >
        <div className="w-11/12">
          <div className="w-full  space-y-5 text-black">
            <>
              <div className="grid items-center justify-between w-full h-24 grid-cols-3 p-5 font-bold text-center bg-white rounded-lg ring-2 ring-gray-100">
                <div className="text-center">Nombre</div>
                <div className="">Estado</div>
                <div>Acción</div>
              </div>
              {sections?.map((section: Section, key: number) => {
                return (
                  <Card key={key} section={section} update={updateSections} />
                );
              })}

              {/* <div className="flex flex-row items-center w-full py-4 space-x-3 sm:justify-end">
                <button
                  className={`text-black  w-5/12 sm:w-32 h-8 text-center bg-gray-300 rounded-lg`}
                  disabled={currentPage === 1 ? true : false}
                  onClick={prevPage}
                >
                  Anterior
                </button>
                <div className="flex items-center justify-center w-10 h-10 text-black bg-white rounded-full sm:w-12 sm:h-12 ring-1 ring-gray-300">
                  {currentPage}/{totalPages}
                </div>
                <button
                  className={`text-black w-5/12 sm:w-32 h-8 text-center bg-gray-300 rounded-lg`}
                  disabled={currentPage === totalPages ? true : false}
                  onClick={nextPage}
                >
                  Siguiente
                </button>
              </div> */}
            </>
          </div>
        </div>
      </Sketch>
      {open && (
        <SectionDialog
          open={open}
          handler={handleOpen}
          update={updateSections}
        />
      )}
    </>
  );
}
