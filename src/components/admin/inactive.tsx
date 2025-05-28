import { EyeSlashIcon } from "@heroicons/react/24/solid";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import { HashLoader } from "react-spinners";
const monserratStyle = Montserrat({ subsets: ["latin"] });

export default function DeactiveButton({
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
            <EyeSlashIcon className="w-full h-24 md:h-40" />
            <div className="space-y-2">
              <p className="w-full text-lg font-bold md:text-3xl">{title}</p>
              <p className="w-full text-xs font-normal md:w-11/12 md:text-base">
                {message}
              </p>
            </div>
            <div className="flex flex-row w-full space-x-3">
              <button
                disabled={isLoading}
                className="w-full h-12 font-normal text-black duration-300 bg-white rounded-lg hover:bg-black hover:shadow-lg hover:text-white border-2 border-black flex justify-center items-center"
                onClick={() => {
                  setIsLoading(true);
                  funct();
                }}
              >
                {isLoading ? <HashLoader /> : "Ocultar"}
              </button>
              <button
                onClick={handleOpen}
                className="w-full h-12 font-normal text-white duration-300 bg-red-500 border-2 hover:shadow-lg border-red-500 rounded-lg hover:bg-white hover:text-red-500"
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
