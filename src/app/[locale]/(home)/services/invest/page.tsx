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
import { HashLoader } from "react-spinners";
import FeedbackForm from "@/components/chatbox/FeedbackForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TestimonialsCarousel from "@/components/services/TestimonialsCarousel";

export default function Page() {
  const params = useParams<{ locale: string }>();
  const t = useTranslations("navbar");
  const [invest, setInvest] = useState<any>();
  const { data, isLoading, error } = useInvestmentServices();
  const [typeOptions, setTypeOptions] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<any>("");
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const { data: typeService, isLoading: loadingTypeService } = useServiceType();

  console.log("Investment Services Data:", data);
  console.log("Investment Services Error:", error);
  console.log("Investment Services Loading:", isLoading);
  
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
        <HashLoader />
      </div>
    );
  return (
    <div className="bg-white pt-20 md:pt-20 lg:pt-20 xl:pt-0 py-10 flex justify-center">
      <div className="w-10/12 flex flex-col gap-10">
        <div className="w-full flex flex-col md:flex-row justify-between gap-2">
          <Typography className="text-blue-900 w-full line-clamp-2 uppercase font-extrabold text-xl lg:text-3xl font-opensans">
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
            className="md:w-4/12 z-40"
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
          {invest && invest.length > 0 ? (
            invest.map((item: any, index: number) => (
              <ServiceCard key={index} item={item} locale={params.locale} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-500 text-xl">
                {params.locale === "es" 
                  ? "No hay servicios disponibles en este momento" 
                  : "No services available at this time"}
              </p>
            </div>
          )}
        </div>
        
        {/* Carrusel de Testimonios */}
        <TestimonialsCarousel serviceType="investment" locale={params.locale} />
        
        {/* Botón de Feedback */}
        <div className="w-full flex justify-center py-10">
          <button
            onClick={() => setFeedbackOpen(true)}
            className="bg-red-700 hover:bg-red-800 text-white font-bold font-montserrat py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 text-lg"
          >
            <span className="text-2xl">👋</span>
            {params.locale === "es" ? "Cuéntanos tu experiencia" : "Tell us your experience"}
          </button>
        </div>
      </div>
      
      {/* Modal de Feedback */}
      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              {params.locale === "es" ? "Tu opinión nos importa" : "Your opinion matters to us"}
            </DialogTitle>
          </DialogHeader>
          <FeedbackForm 
            serviceType="investment"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
