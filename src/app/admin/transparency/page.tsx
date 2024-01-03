"use client";
import { TransparencyDialog } from "@/components/admin/transparency/dialog";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import React, { useState } from "react";

export default function page() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className="w-full h-[85vh] space-y-8 flex flex-col items-center p-8">
        <div className="w-11/12 h-24 flex justify-between items-center text-black">
          <div className="flex flex-col">
            <div className="font-semibold text-2xl">Transparencia</div>
            <label className="text-base font-normal">Documentos</label>
          </div>
          <div className="space-x-4">
            <button
              onClick={handleOpen}
              className="w-36 h-12 rounded-full bg-blue-dark text-white hover:text-white/80 hover:shadow-md"
            >
              Añadir
            </button>
            <button className="w-36 h-12 rounded-full border-[1px] border-gray-400 text-gray-400 hover:text-gray-400/80 hover:shadow-sm">
              Filtrar
            </button>
          </div>
        </div>
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
      </div>
      {open && <TransparencyDialog open={open} handler={handleOpen} />}
    </>
  );
}
