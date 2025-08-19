"use client";
import { useDirections } from "@/services/structure-organizational/service";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Collapse, Spinner } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

interface RootLayoutProps {
  children: React.ReactNode;
  params: any;
}
export default function RootLayout({ children }: RootLayoutProps) {
  const { locale } = useParams();
  const params = useParams();
  const t = useTranslations("organizationalChart");
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);
  const { data, isLoading } = useDirections();
  const [activeDirection, setActiveDirection] = useState("");
  const [directions, setDirections] = useState([]);
  useEffect(() => {
    if (!isLoading && data) {
      setDirections(data);
    }
  }, [data, isLoading]);

  // console.log(" direction:", directions);

  // console.log(" activeDirection:", activeDirection);
  // console.log(" data:", data);

  
  useEffect(() => {
    findActiveDirection();
  }, [directions]);

  function findActiveDirection() {
    const direction: any = directions.find(
      (item: any) => item.id === params.id
    );
    if (direction) {
      setActiveDirection(
        params.locale === "es" ? direction.nameEs : direction.nameEn
      );
    }
  }

  if (isLoading) {
    return (
      <div className="w-full h-[85vh] bg-white flex justify-center items-center">
        <HashLoader />
      </div>
    );
  }
  return (
    <div className="w-full bg-white flex flex-col items-center py-10">
      <div className="w-10/12 flex flex-col sm:flex-row justify-between gap-5 mt-14 md:mt-24 xl:mt-0">
        <h1 className="text-2xl sm:text-4xl font-bold text-blue-dark">
          {t("title")}
        </h1>
        <Link
          href={"/documents/ORGANIGRAMA_GENERAL_2025.pdf"}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="p-3 rounded-lg border-2 text-center border-blue-dark bg-transparent hover:bg-blue-dark text-blue-dark hover:text-white duration-300 font-bold"
        >
          {t("buttonText")}
        </Link>
        <div className="lg:hidden space-y-2">
          <button
            onClick={toggleOpen}
            className="w-full py-3 border-2 border-gray-300 rounded-lg px-4 flex justify-between items-center"
          >
            <p className="text-black text-lg font-bold font-montserrat">
              {activeDirection}
            </p>
            <ChevronRightIcon
              className={`size-6 ${
                open ? "transform rotate-90" : ""
              } duration-300`}
            />
          </button>
          <Collapse open={open}>
            <div className="w-full flex flex-col px-2 gap-3">
              {directions.map((item: any, index) => (
                <Link
                  href={`/organizationalstructure/${item.id}`}
                  onClick={() => {
                    setActiveDirection(
                      params.locale === "es" ? item.nameEs : item.nameEn
                    );
                    setOpen(false);
                  }}
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
          </Collapse>
        </div>
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
