import { TrashIcon } from "@heroicons/react/24/solid";

import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import { HashLoader } from "react-spinners";
const monserratStyle = Montserrat({ subsets: ["latin"] });
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function DeleteButton({
  open,
  handleOpen,
  title,
  message,
  funct,
}: {
  open: boolean;
  handleOpen: () => void;
  title: string;
  message: string;
  funct: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogContent
          style={monserratStyle.style}
          className="font-sans text-black"
        >
          <DialogTitle></DialogTitle>
          <div className="flex flex-col items-center justify-center p-3 space-y-12">
            <TrashIcon className="w-full h-24 text-red-700 md:h-40" />
            <div className="space-y-2">
              <p className="w-full text-lg font-bold md:text-3xl">{title}</p>
              <p className="w-full text-xs font-normal md:w-11/12 md:text-base">
                {message}
              </p>
            </div>
            <div className="flex flex-row w-full space-x-3">
              <button
                disabled={isLoading}
                className="w-full h-12 font-normal text-red-500 duration-300 bg-white rounded-lg hover:shadow-lg hover:text-white hover:bg-red-500 border-2 border-red-500  flex justify-center items-center"
                onClick={() => {
                  setIsLoading(true);
                  funct();
                }}
              >
                {isLoading ? <HashLoader /> : "Eliminar"}
              </button>
              <button
                onClick={handleOpen}
                className="w-full h-12 font-normal text-white duration-300 bg-red-500 border-2 border-red-500 rounded-lg hover:shadow-lg hover:bg-white hover:text-red-500"
              >
                Cancelar
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
