import {
  BuildingLibraryIcon,
  ChevronUpIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Collapse } from "@material-tailwind/react";

export default function GovPagesInfo() {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);

  const t = useTranslations("GovPagesInfo");
  return (
    <div>
      <div className="h-[27px] w-full bg-blue-dark xl:bg-blue-dark flex justify-center space-x-1">
        <div className="xl:w-10/12 flex items-center justify-between space-x-1">
          <Image
            alt="Bandera Dominicana"
            width={1920}
            height={1080}
            src={"/images/rd.jpg"}
            className="w-7 xl:w-10 p-2"
          />
          <p className="text-white xl:text-white text-[9px] xl:text-xs text-nowrap">
            {t("label")}
          </p>
          <button
            onClick={toggleOpen}
            className="w-full h-full xl:flex items-center text-sky-600 text-left font-bold text-xs underline cursor-pointer "
          >
            <span className="hidden xl:flex">{t("buttonText")}</span>

            <ChevronUpIcon
              className={`w-3 h-3 duration-300 transform ${
                open ? "rotate-0" : "rotate-180"
              }`}
            />
          </button>
        </div>
      </div>
      <Collapse
        open={open}
        className="flex justify-center bg-blue-dark xl:bg-blue-dark"
      >
        <div className="w-11/12 xl:w-10/12 h-[150px] xl:h-[150px] grid grid-rows-2 gap-3 pb-3 xl:grid-cols-2">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-600 size-11 xl:size-14 flex items-center justify-center">
              <BuildingLibraryIcon className="size-6 xl:size-8 text-white" />
            </div>
            <div className="w-10/12 space-y-2 text-[9px] text-white xl:text-xs xl:text-white ">
              <p className="font-bold">{t("domainTitle")}</p>
              <p>{t("domainLabel")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-600 size-11 xl:size-14 flex items-center justify-center">
              <LockClosedIcon className="size-6 xl:size-8 text-white" />
            </div>
            <div className="w-10/12 space-y-2 text-[9px] text-white xl:text-xs xl:text-white">
              <p className="font-bold">{t("secureDomainTitle")}</p>
              <p>{t("secureDomainLabel")}</p>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
}
