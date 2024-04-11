import React from "react";
import Image from "next/image";

export default function page() {
  return (
    <div>
      <div className="relative h-[40vh] sm:h-[80vh]">
        <Image
          width={5378}
          height={3589}
          src={"/images/export/ship.jpg"}
          alt="directory"
          className="w-full h-full object-cover"
        />
        <div className="bg-black/30 absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-white text-center pt-10">
            <div className="uppercase w-full font-bold text-xl sm:text-5xl">
              Documentos
            </div>
            <div className="w-6/12 text-lg">
              Optimiza tu experiencia exportadora con nuestra amplia gama de
              documentos.
            </div>
          </div>
        </div>
      </div>
      <div className="h-full bg-white flex justify-center py-10"></div>
    </div>
  );
}
