import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { HashLoader } from "react-spinners";
const monserratStyle = Montserrat({ subsets: ["latin"] });

export default function ChangeTypeMessage({
  open,
  handleOpen,
  title,
  message,
  handleAccept,
  handleCancel,
}: {
  open: boolean;
  handleOpen: () => void;
  title: string;
  message: string;
  handleAccept: () => void;
  handleCancel: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogContent
          style={monserratStyle.style}
          className="font-sans text-black"
        >
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">{message}</DialogDescription>
          <div className="flex flex-col items-center justify-center p-3 space-y-12">
            <InformationCircleIcon className="w-full h-24 text-yellow-500 md:h-40" />
            <div className="space-y-2">
              <p className="w-full text-lg font-bold md:text-3xl">{title}</p>
              <p className="w-full text-xs font-normal md:w-11/12 md:text-base">
                {message}
              </p>
            </div>
            <div className="flex flex-row w-full space-x-3">
              <button
                disabled={isLoading}
                className="w-full h-12 font-normal text-black duration-300 bg-white rounded-lg hover:shadow-lg hover:text-white hover:bg-black border-2 border-black  flex justify-center items-center"
                onClick={handleAccept}
              >
                {isLoading ? <HashLoader /> : "Cambiar"}
              </button>
              <button
                onClick={handleCancel}
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
