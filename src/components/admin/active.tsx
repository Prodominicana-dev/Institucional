import { EyeIcon } from "@heroicons/react/24/solid";
import { Dialog, DialogBody, Spinner } from "@material-tailwind/react";
import React, { useState } from "react";
import { Montserrat } from "next/font/google";
const monserratStyle = Montserrat({ subsets: ["latin"] });

export default function ActivateButton({
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
      <Dialog
        placeholder={undefined}
        open={open}
        handler={handleOpen}
        size="sm"
      >
        <DialogBody
          style={monserratStyle.style}
          placeholder={undefined}
          className="font-sans text-black"
        >
          <div className="flex flex-col items-center justify-center p-3 space-y-12">
            <EyeIcon className="w-full h-24 text-green-500 md:h-40" />
            <div className="space-y-2">
              <p className="w-full text-lg font-bold md:text-3xl">{title}</p>
              <p className="w-full text-xs font-normal md:w-11/12 md:text-base">
                {message}
              </p>
            </div>
            <div className="flex flex-row w-full space-x-3">
              <button
                disabled={isLoading}
                className="w-full h-12 font-normal text-green-500 duration-300 bg-white rounded-lg hover:shadow-lg hover:text-white hover:bg-green-500 border-2 border-green-500 flex items-center justify-center"
                onClick={() => {
                  setIsLoading(true);
                  funct();
                }}
              >
                {isLoading ? <Spinner className="w-7 h-7" /> : "Activar"}
              </button>
              <button
                onClick={handleOpen}
                className="w-full h-12 font-normal text-white duration-300 bg-red-500 border-2 border-red-500 rounded-lg hover:shadow-lg hover:bg-white hover:text-red-500"
              >
                Cancelar
              </button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
