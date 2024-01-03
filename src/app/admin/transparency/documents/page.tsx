"use client";
import Sketch from "@/components/admin/sketch";
import { DocumentDialog } from "@/components/admin/transparency/document/dialog";
import React, { useState } from "react";

export default function page() {
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen);
  };
  return (
    <>
      <Sketch
        title="Documentos"
        subtitle="Transparencia"
        handleOpen={handleOpen}
        handleFilterOpen={handleFilterOpen}
      >
        <div className="w-11/12">
          <div className="w-full  space-y-5 text-black">
            <>
              <div className="grid items-center justify-between w-full h-24 grid-cols-3 p-5 font-bold text-center bg-white rounded-lg sm:grid-cols-5 ring-2 ring-gray-100">
                <div className="text-center">Fecha</div>
                <div className="hidden sm:block">Sección</div>
                <div>Subsección</div>
                <div>Documento</div>
                <div>Acción</div>
              </div>
              {/* {currentPageData?.map((rami: any, key: number) => {
                return <Card key={key} rami={rami} updateRamis={updateRamis} />;
              })} */}

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
      {open && <DocumentDialog open={open} handler={handleOpen} />}
    </>
  );
}
