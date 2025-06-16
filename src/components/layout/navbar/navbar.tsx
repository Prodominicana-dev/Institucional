"use client";
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  NewspaperIcon,
  PhotoIcon,
  ScaleIcon,
  UserIcon,
  VideoCameraIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { IconButton, Select } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import NavbarMenu from "./navbarMenu";
import ToolsMenu from "./toolsMenu";
import AboutIcon from "../../icons/aboutIcon";
import OrganizationIcon from "../../icons/organizationIcon";
import NavbarLink from "./navbarLink";
import NavbarButton from "./navbarButton";
import GovPagesInfo from "./govPagesInfo";
import { useTranslations } from "next-intl";
import LanguagePicker from "./languagePicker";
import HistoryIcon from "@/components/icons/historyIcon";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const t = useTranslations("navbar");
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleClick = () => {
    if (search.trim()) {
      router.push(`/search?query=${encodeURIComponent(search.trim())}`);
      clearSearch();
    }
  };

  const handleKeyPress: (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => void = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  const clearSearch = () => {
    setSearch("");
  };

  const aboutListItems = [
    {
      title: t("aboutUs.menuList.whoWeAre"),
      description: t("aboutUs.menuList.whoWeAreDesc"),
      icon: AboutIcon,
      link: "/whoarewe",
    },
    {
      title: t("aboutUs.menuList.history"),
      description: t("aboutUs.menuList.historyDesc"),
      icon: HistoryIcon,
      link: "/history",
    },
    {
      title: t("aboutUs.menuList.CEODispach"),
      description: t("aboutUs.menuList.CEODispachDesc"),
      icon: UserIcon,
      link: "/ceo",
    },
    {
      title: t("aboutUs.menuList.organizationalChart"),
      description: t("aboutUs.menuList.organizationalChartDesc"),
      icon: OrganizationIcon,
      link: "/organizationalstructure",
    },
    {
      title: t("aboutUs.menuList.legal"),
      description: t("aboutUs.menuList.legalDesc"),
      icon: ScaleIcon,
      link: "/legalframework",
    },
  ];

  const newsListItems = [
    {
      title: t("news.menuList.news"),
      description: t("news.menuList.newsDesc"),
      icon: NewspaperIcon,
      link: "/news",
    },
    {
      title: t("news.menuList.event"),
      description: t("news.menuList.eventDesc"),
      icon: CalendarDaysIcon,
      link: "/events",
    },
    {
      title: t("news.menuList.prodomTV"),
      description: t("news.menuList.prodomTVDesc"),
      icon: VideoCameraIcon,
      link: "/tv",
    },
    {
      title: t("news.menuList.gallery"),
      description: t("news.menuList.galleryDesc"),
      icon: PhotoIcon,
      link: "/gallery",
    },
  ];

  const servicesListItems = [
    {
      title: t("services.menuList.invest"),
      description: t("services.menuList.investDesc"),
      icon: NewspaperIcon,
      link: "/services/invest",
    },
    {
      title: t("services.menuList.export"),
      description: t("services.menuList.exportDesc"),
      icon: CalendarDaysIcon,
      link: "/services/export",
    },
  ];

  return (
    <nav className="hidden xl:block">
      <GovPagesInfo />
      <div className="h-24 w-full bg-white flex justify-center">
        <div className="flex items-center justify-between w-10/12">
          <Link href={"/"} className="w-52 cursor-pointer">
            <Image
              alt="prodominicana"
              width={1920}
              height={1080}
              src={"/prodominicanaFull.svg"}
            />
          </Link>
          <div className="flex flex-col space-y-4 w-3/12 ">
            <div className="w-full flex items-center justify-center gap-4">
              <div className="h-[40px] w-[246px] border-2 border-blue-950 rounded-full p-2 flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Buscar"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="h-full w-8/12 text-blue-950 bg-white outline-none pl-2"
                />
                <IconButton
                  className="bg-red-700 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer"
                  onClick={handleClick}
                >
                  <MagnifyingGlassIcon className="size-5" />
                </IconButton>
              </div>
              <ToolsMenu />
              <LanguagePicker />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[56px] bg-blue-950 flex justify-center">
        <div className="w-11/12 flex items-center h-full">
          <div className="flex flex-wrap w-full h-full items-center justify-center">
            <Link
              href={"/"}
              className="h-full flex justify-center items-center px-4 bg-red-700 xl:px-3 2xl:px-4"
            >
              <Image
                alt="prodominicana"
                width={50}
                height={50}
                src={"/svg/icons/HomeProdominicana.svg"}
                className="w-10 xl:w-8 2xl:w-10 cursor-pointer"
              />
            </Link>

            <div className="flex items-center h-full">
              <NavbarMenu
                title={t("aboutUs.title")}
                navListMenuItems={aboutListItems}
                className="text-base xl:text-sm 2xl:text-base"
              />
              <ChevronDownIcon className="h-5 w-5 -translate-x-4 hover:text-white text-cyan-600 xl:h-4 xl:w-4 2xl:h-5 2xl:w-5" />
              <NavbarMenu
                title={t("services.title")}
                navListMenuItems={servicesListItems}
                className="text-base xl:text-sm 2xl:text-base"
              />
              <ChevronDownIcon className="h-5 w-5 -translate-x-4 hover:text-white text-cyan-600 xl:h-4 xl:w-4 2xl:h-5 2xl:w-5" />
              <NavbarMenu
                title={t("news.title")}
                navListMenuItems={newsListItems}
                className="text-base xl:text-sm 2xl:text-base"
              />
              <ChevronDownIcon className="h-5 w-5 -translate-x-4 hover:text-white text-cyan-600 xl:h-4 xl:w-4 2xl:h-5 2xl:w-5" />
            </div>

            <NavbarLink
              title={t("shetrades")}
              link={"/shetrades"}
              className="h-full px-3 xl:px-2 xl:text-sm 2xl:px-3 2xl:text-base flex items-center"
            />
            <NavbarLink
              title={t("transparency")}
              link={"https://old.prodominicana.gob.do/transparencia"}
              className="h-full px-3 xl:px-2 xl:text-sm 2xl:px-3 2xl:text-base flex items-center"
            />
            <NavbarLink
              title={t("contact")}
              link={"/contact"}
              className="h-full px-3 xl:px-2 xl:text-sm 2xl:px-3 2xl:text-base flex items-center"
            />
            <NavbarLink
              title={t("complaint")}
              link={"/complaint"}
              className="h-full px-3 xl:px-2 xl:text-sm 2xl:px-3 2xl:text-base flex items-center"
            />

            {/* Botones */}
            <div className="h-full flex space-x-3 xl:space-x-2 2xl:space-x-3 text-white items-center">
              <NavbarButton
                title={t("investButton")}
                link={"/invest"}
                icon={"/svg/icons/InvestIcon.svg"}
                className="h-[36px] xl:h-[30px] xl:text-sm 2xl:h-[36px] 2xl:text-base flex items-center"
              />
              <NavbarButton
                title={t("exportButton")}
                link={"/export"}
                icon={"/svg/icons/ExportIcon.svg"}
                className="h-[36px] xl:h-[30px] xl:text-sm 2xl:h-[36px] 2xl:text-base flex items-center"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
