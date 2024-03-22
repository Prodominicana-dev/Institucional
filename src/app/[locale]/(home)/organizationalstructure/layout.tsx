"use client";
import { useDirections } from "@/services/structure-organizational/service";
import { Spinner } from "@material-tailwind/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface RootLayoutProps {
  children: React.ReactNode;
  params: any;
}
export default function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  const params = useParams();
  const { data, isLoading } = useDirections();
  const [directions, setDirections] = useState([]);
  useEffect(() => {
    if (!isLoading && data) {
      setDirections(data);
    }
  }, [data, isLoading]);

  if (isLoading) {
    return (
      <div className="w-full h-[85vh] bg-white flex justify-center items-center">
        <Spinner className="size-10" />
      </div>
    );
  }
  return (
    <div className="w-full bg-white flex flex-col items-center py-10">
      <div className="w-10/12 flex flex-col sm:flex-row justify-between gap-5">
        <h1 className="text-2xl sm:text-4xl font-bold text-blue-dark">
          Estructura Organizacional
        </h1>
        <Link
          href={
            "https://www.prodominicana.gob.do/Documentos/Estructura_Organica_de_la_Institucion_2023.pdf"
          }
          target="_blank"
          rel="noopener noreferrer"
          download
          className="p-3 rounded-lg border-2 text-center border-blue-dark bg-transparent hover:bg-blue-dark text-blue-dark hover:text-white duration-300 font-bold"
        >
          Descargar PDF
        </Link>
      </div>
      <div className="w-full py-10 flex flex-row justify-center">
        <div className="w-10/12 flex flex-col lg:flex-row justify-center sm:gap-10">
          <div className="w-full lg:w-3/12  flex justify-center">
            <div className="hidden lg:flex w-full h-full bg-white border-2 border-gray-300 flex-col gap-8 rounded-lg p-5">
              {directions.map((item: any, index) => (
                <Link
                  href={`/organizationalstructure/${item.id}`}
                  className={`${
                    params.id === item.id
                      ? "text-blue-dark font-bold"
                      : "text-black font-medium"
                  }  text-lg hover:text-blue-dark`}
                  key={index}
                >
                  {locale === "es" ? item.nameEs : item.nameEn}
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-9/12 text-black overflow-auto rounded-lg flex justify-center items-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

const formatName = (str: string) => {
  const removedAccents = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return removedAccents.split(" ").join("_").toLowerCase();
};
