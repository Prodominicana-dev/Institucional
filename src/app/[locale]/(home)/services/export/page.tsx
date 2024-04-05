"use client";
import { InvestmentDialog } from "@/components/invest/dialog";
import {
  useExportServices,
  useInvestmentServices,
} from "@/services/service/service";
import { useServiceType } from "@/services/service/type/service";
import { Spinner, Typography } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function Page({ params }: { params: { locale: string } }) {
  const t = useTranslations("navbar");
  const [invest, setInvest] = useState<any>();
  const { data, isLoading } = useExportServices();
  const [open, setOpen] = useState(false);
  const [typeOptions, setTypeOptions] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<any>("");

  const { data: typeService, isLoading: loadingTypeService } = useServiceType();

  useEffect(() => {
    if (!loadingTypeService && typeService) {
      console.log(typeService);
      const options = typeService.map((item: any) => {
        return {
          value: params.locale === "es" ? item.nameEs : item.nameEn,
          label: params.locale === "es" ? item.nameEs : item.nameEn,
        };
      });
      setTypeOptions(options);
    }
  }, [typeService, loadingTypeService]);

  useEffect(() => {
    if (!data) return;
    if (selectedType === "") {
      setInvest(data);
    } else {
      const filtered = data?.filter((item: any) => {
        return (
          (params.locale === "es" ? item.typeEs : item.typeEn) === selectedType
        );
      });
      setInvest(filtered);
    }
  }, [selectedType]);

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (!isLoading && data) {
      setInvest(data);
    }
  }, [data, isLoading]);
  if (isLoading || loadingTypeService)
    return (
      <div className="w-full min-h-[85vh] bg-white flex justify-center items-center">
        <Spinner className="size-7" />
      </div>
    );
  return (
    <div className="bg-white py-10 flex justify-center">
      <div className="w-10/12 flex flex-col gap-10">
        <div className="w-full flex flex-col md:flex-row justify-between gap-2">
          <Typography
            placeholder={undefined}
            className="text-blue-900 w-full line-clamp-2 uppercase font-extrabold text-xl lg:text-3xl font-opensans"
          >
            {t("services.menuList.export")}
          </Typography>
          <Select
            placeholder={
              params.locale === "es"
                ? "Filtrar por tipo de servicio..."
                : "FIlter by service type..."
            }
            isClearable
            onChange={(e: any) => {
              setSelectedType(e === null ? "" : e.value);
            }}
            className="w-4/12 z-50"
            options={typeOptions}
            theme={(theme) => ({
              ...theme,
              borderRadius: 2,
              colors: {
                ...theme.colors,
                primary: "black",
              },
            })}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {invest?.map((item: any, index: number) => (
            <div key={index}>
              <div
                onClick={handleOpen}
                className="w-full py-3 flex flex-row gap-1 border-2 border-blue-dark group hover:bg-red-700 duration-300 hover:cursor-pointer rounded-lg px-5"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/service/images/${item.id}/${item.image}`} // Use the preview URL directly
                  alt={""}
                  width="500"
                  height="500"
                  className="size-24 rounded-full object-center scale-75  duration-300" // Add bg-white for visibility
                />
                <div className="flex flex-col justify-center">
                  <h1 className="font-montserrat font-bold w-full text-xl line-clamp-3 break-words text-balance text-black group-hover:text-white duration-300">
                    {params.locale === "es" ? item.es.name : item.en.name}
                  </h1>
                  <p className="font-light font-montserrat text-black group-hover:text-white duration-300">
                    {params.locale === "es" ? item.typeEs : item.typeEn}
                  </p>
                </div>
              </div>

              <InvestmentDialog
                investment={params.locale === "es" ? item.es : item.en}
                type={params.locale === "es" ? item.typeEs : item.typeEn}
                locale={params.locale}
                open={open}
                handler={handleOpen}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
