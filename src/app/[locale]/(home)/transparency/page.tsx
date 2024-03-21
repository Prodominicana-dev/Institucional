"use client";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className="w-full py-10 flex flex-col gap-5 font-montserrat">
      <Image
        src={"/images/prodominicanabuilding.jpg"}
        alt="imagen"
        width={1920}
        height={1080}
        className="w-full max-h-[30rem] object-cover "
      />
      <p>
        <span className="font-bold">Artículo 5.-</span> «Se dispone la
        informatización y la incorporación al sistema de comunicación por
        Internet, o a cualquier otro sistema similar que en el futuro se
        establezca, de todos los organismos públicos centralizados y
        descentralizados del Estado, incluyendo el Distrito Nacional y los
        Municipios, con la finalidad de garantizar a través de éste un acceso
        directo del público a la información del Estado.»
      </p>

      <p>
        Todos los poderes y organismos del Estado deberán instrumentar la
        publicación de sus respectivas «Páginas Web» a los siguientes fines:
      </p>
      <div className="flex flex-row items-center gap-3 ">
        <div className="w-5 h-2 rounded-xl bg-black"></div>
        <p className="w-11/12">
          Difusión de Información: Estructura, integrantes, normativas de
          funcionamiento, proyectos, informes de gestión, base de datos;
        </p>
      </div>
      <div className="flex flex-row items-center gap-3">
        <div className="w-5 h-2 rounded-xl bg-black"></div>
        <p className="w-11/12">
          Centro de Intercambio y Atención al Cliente o Usuario: Consultas,
          quejas y sugerencias;
        </p>
      </div>
      <div className="flex flex-row items-center gap-3">
        <div className="w-5 h-2 rounded-xl bg-black"></div>
        <p className="w-11/12">
          Trámites o Transacciones Bilaterales: «La información a que hace
          referencia el párrafo anterior será de libre acceso al público sin
          necesidad de petición previa».
        </p>
      </div>

      <p>
        En cumplimiento de la ley General de Libre Acceso a la Información
        Pública (Ley 200-04) y el Decreto No. 130-05 que crea el reglamento de
        la ley.
      </p>
    </div>
  );
}
