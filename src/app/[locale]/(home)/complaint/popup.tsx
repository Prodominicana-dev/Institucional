import Image from "next/image";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

export function Popup() {
  const [open, setOpen] = useState(true); 
  const t = useTranslations("complaints");

  const handleClose = () => {
    setOpen(false); 
  };
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
        >
          <div className="relative w-10/12 max-w-xl p-5 mx-auto my-auto bg-white rounded-xl shadow-lg">
            <div className="text-center">
              <Image
                width={2000}
                height={2000}
                src="/images/dencuiasComunicado.jpg"
                alt="Comunicado"
                className="mx-auto w-10/12"
              />
            </div>
            <div className="p-3  mt-2 text-center space-x-4 md:block">
               
               <button className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600 cursor-pointer"  onClick={handleClose}>
                {t("form.buttonnPopup")}
               </button>
             </div>
          </div>
        </div>
      )}
    </>
  );
}
