"use client";
import ServiceCard from "@/components/services/serviceCard";
import { useInvestmentServices } from "@/services/service/service";
import { useServiceType } from "@/services/service/type/service";
import { Spinner, Typography } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function Page() {
  const params = useParams<{ locale: string }>();
  const t = useTranslations("navbar");
  const [invest, setInvest] = useState<any>();
  const { data, isLoading } = useInvestmentServices();
  const [typeOptions, setTypeOptions] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<any>("");

  const { data: typeService, isLoading: loadingTypeService } = useServiceType();

  useEffect(() => {
    if (!loadingTypeService && typeService) {
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

  useEffect(() => {
    if (!isLoading && data) {
      setInvest(data);
    }
  }, [data, isLoading]);
  if (isLoading || loadingTypeService)
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
    <div className="bg-white py-10 flex justify-center">
      <div className="w-10/12 flex flex-col gap-10">
        <div className="w-full flex flex-col md:flex-row justify-between gap-2">
          <Typography
            placeholder={undefined}
            className="text-blue-900 w-full line-clamp-2 uppercase font-extrabold text-xl lg:text-3xl font-opensans"
          >
            {t("services.menuList.invest")}
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
            className="md:w-4/12 z-50"
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
            <ServiceCard key={index} item={item} locale={params.locale} />
          ))}
        </div>
      </div>
    </div>
  );
}
