"use client";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className="w-full py-10 flex flex-col gap-10 font-montserrat">
      <div className="flex justify-center">
        <div className="flex items-center gap-5">
          <Image
            src={"/svg/transparencyHome.svg"}
            alt="imagen"
            width={1920}
            height={1080}
            className="aspect-square w-60"
          />
          <div className="flex flex-col gap-3 font-montserrat">
            <h1 className="text-blue-dark text-3xl font-bold">
              Portal de{" "}
              <span className="bg-red-700 p-2 text-white">Transparencia</span>
            </h1>
            <div className="text-blue-dark font-semibold">
              <p>
                Bienvenido al Portal de Transparencia Institucional de
                ProDominicana
              </p>
              <p>
                Centro de Exportación e Inversión de la República Dominicana
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-10/12 flex flex-col gap-3">
          <p>
            <span className="font-bold">Artículo 5.-</span> «Se dispone la
            informatización y la incorporación al sistema de comunicación por
            Internet, o a cualquier otro sistema similar que en el futuro se
            establezca, de todos los organismos públicos centralizados y
            descentralizados del Estado, incluyendo el Distrito Nacional y los
            Municipios, con la finalidad de garantizar a través de éste un
            acceso directo del público a la información del Estado.»
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
            Pública (Ley 200-04) y el Decreto No. 130-05 que crea el reglamento
            de la ley.
          </p>
        </div>
      </div>
    </div>
  );
}
