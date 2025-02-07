import { Dialog, DialogBody, Spinner } from "@material-tailwind/react";
import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
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
      <Dialog
        placeholder={undefined}
        open={open}
        handler={handleOpen}
        size="sm"
        className="z-[9999]"
      >
        <DialogBody
          style={monserratStyle.style}
          placeholder={undefined}
          className="font-sans text-black"
        >
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
                {isLoading ? (
                  <Spinner
                    className="w-7 h-7"
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                ) : (
                  "Cambiar"
                )}
              </button>
              <button
                onClick={handleCancel}
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
