"use client";
import ServiceCard from "@/components/services/serviceCard";
import { useExportServices } from "@/services/service/service";
import { Spinner, Typography } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ locale: string }>();
  const t = useTranslations("navbar");
  const [services, setServices] = useState<any>();
  const { data, isLoading } = useExportServices();

  useEffect(() => {
    if (!isLoading && data) {
      setServices(data);
    }
  }, [data, isLoading]);
  if (isLoading)
    return (
      <div className="w-full min-h-[85vh] bg-white flex justify-center items-center">
        <Spinner
          className="size-7"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      </div>
    );
  return (
    <div>
      <div className="relative h-[40vh] sm:h-[80vh]">
        <Image
          width={5378}
          height={3589}
          src={"/images/export/hit.jpg"}
          alt="directory"
          className="w-full h-full object-cover"
        />
        <div className="bg-black/30 absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-white text-center pt-10">
            <div className="uppercase w-full font-bold text-xl sm:text-5xl">
              Servicios
            </div>
            <div className="w-6/12 text-lg">
              Descubre los servicios de exportación de ProDominicana, tu aliado
              estratégico para conquistar mercados internacionales.
            </div>
          </div>
        </div>
      </div>
      <div className="h-full bg-white flex justify-center py-10">
        <div className="w-10/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services?.map((item: any, index: number) => (
            <ServiceCard key={index} item={item} locale={params.locale} />
          ))}
        </div>
      </div>
    </div>
  );
}
