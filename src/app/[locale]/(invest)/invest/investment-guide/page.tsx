"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function Page() {
  const investmentGuides = [
    {
      name: "Español",
      code: "es",
      link: "/documents/investmentGuides/InvestmentGuide_ES_2024.pdf",
    },
    {
      name: "English",
      code: "gb",
      link: "/documents/investmentGuides/InvestmentGuide_EN_2024.pdf",
    },
    {
      name: "Français",
      code: "fr",
      link: "/documents/investmentGuides/InvestmentGuide_FR.pdf",
    },
    {
      name: "Deutsch",
      code: "de",
      link: "/documents/investmentGuides/InvestmentGuide_DE.pdf",
    },
    {
      name: "Italiano",
      code: "it",
      link: "/documents/investmentGuides/InvestmentGuide_IT.pdf",
    },
    {
      name: "Türkçe",
      code: "tr",
      link: "/documents/investmentGuides/InvestmentGuide_TR.pdf",
    },
    {
      name: "العربية",
      code: "sa",
      link: "/documents/investmentGuides/InvestmentGuide_SA.pdf",
    },
    {
      name: "Русский",
      code: "ru",
      link: "/documents/investmentGuides/InvestmentGuide_RU.pdf",
    },
    {
      name: "普通话",
      code: "cn",
      link: "/documents/investmentGuides/InvestmentGuide_CN.pdf",
    },
    {
      name: "日本語",
      code: "jp",
      link: "/documents/investmentGuides/InvestmentGuide_JP.pdf",
    },
  ];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const t = useTranslations("invest.investmentguide");
  const [selectedInvestmentGuide, setSelectedInvestmentGuide] = React.useState(
    investmentGuides[0].link
  );
  return (
    <div className="w-full h-full relative">
      <video
        playsInline
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      >
        <source src={"/videos/invest/whyinvestindr.mp4"} type="video/mp4" />
      </video>
      <div className="bg-black/60 absolute inset-0 flex items-center justify-center pt-10">
        <div className="w-full items-center  flex flex-col gap-5">
          <div className="w-full flex flex-col items-center text-center text-white gap-3">
            <div className="uppercase w-full font-bold text-xl sm:text-5xl">
              {t("title")}
            </div>
            <div className="w-4/12 font-light text-xl">{t("description")}</div>
          </div>
          <button
            onClick={handleOpen}
            className="bg-white text-blue-dark font-bold px-10 py-3 text-center rounded-full text-xl"
          >
            {t("download")}
          </button>
        </div>
      </div>
      <Dialog open={open} onOpenChange={handleOpen}>
        {/* <DialogTitle>Idioma</DialogTitle> */}
        <DialogContent>
          <div className="flex flex-col gap-5 p-5">
            <div className="text-blue-dark uppercase w-full font-bold text-xl sm:text-3xl">
              {t("dialog.title")}
            </div>
            <div className="font-light text-xl">{t("dialog.subtitle")}</div>
            <div className="w-full flex flex-col gap-2">
              <Select
                onValueChange={(selectedIndex: any) => {
                  setSelectedInvestmentGuide(selectedIndex);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Idioma" />
                </SelectTrigger>
                <SelectContent>
                  {investmentGuides.map((investmentGuide, index) => (
                    <SelectItem key={index} value={investmentGuide.link}>
                      <div className="flex items-center gap-2">
                        <Image
                          width={100}
                          height={100}
                          src={`https://flagcdn.com/${investmentGuide.code}.svg`}
                          alt={investmentGuide.code}
                          className="ascpect-square size-8 object-cover rounded-full"
                        ></Image>
                        {investmentGuide.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <a
              href={selectedInvestmentGuide}
              download
              className="bg-blue-950 w-full py-3 text-xl text-white font-bold text-center rounded-xl"
            >
              {t("download")}
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
