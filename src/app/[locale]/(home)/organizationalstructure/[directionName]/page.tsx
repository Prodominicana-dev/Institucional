import React from "react";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      <div className="size-64 border-2 border-gray-300 rounded-2xl flex flex-col items-center justify-center gap-3">
        <Image
          width={1000}
          height={1000}
          alt="emp"
          src={"/images/EdgarEspinal.jpg"}
          className="rounded-full object-cover size-32"
        />
        <div className="w-10/12 text-center">
          <h1 className="text-lg font-bold">Edgar Espinal Quezada</h1>
          <p className="text-sm text-gray-400">
            Director de Innovacion Estrategica
          </p>
        </div>
      </div>
    </div>
  );
}
