"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Collapse } from "@material-tailwind/react";
import OgticRules from "./rules";
import SocialMedia from "./socialMedia";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

export default function FooterMobile() {
  const t = useTranslations("Footer");
  // Año actual
  const date = new Date();
  const year = date.getFullYear();
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);
  const rotate = open ? "rotate-90 duration-300" : "rotate-0 duration-300";

  const normas = [
    {
      name: "Norma para el desarrollo y gestión de los portales web y la transparencia de los organismos del Estado Dominicano",
      url: "https://nortic.ogtic.gob.do/instituciones/PRODOMINICANA",
      src: "https://be.nortic.ogtic.gob.do/StampProcesses/Stamp/638",
    },
    {
      name: "Norma sobre Publicación de Datos Abiertos del Gobierno Dominicano",
      url: "https://nortic.ogtic.gob.do/instituciones/PRODOMINICANA",
      src: "https://be.nortic.ogtic.gob.do/StampProcesses/Stamp/252",
    },
    {
      name: "Norma para la Gestión de las Redes Sociales en los Organismos Gubernamentales",
      url: "https://nortic.ogtic.gob.do/instituciones/PRODOMINICANA",
      src: "https://be.nortic.ogtic.gob.do/StampProcesses/Stamp/666",
    },
  ];

  const socialMedia = [
    {
      name: "facebook",
      url: "https://www.facebook.com/Prodominicana",
      src: "/svg/social/footer/facebook.svg",
    },
    {
      name: "x",
      url: "https://x.com/prodominicana",
      src: "/svg/social/footer/x.svg",
    },
    {
      name: "instagram",
      url: "https://www.instagram.com/prodominicana",
      src: "/svg/social/footer/instagram.svg",
    },
    {
      name: "youtube",
      url: "https://www.youtube.com/@ProDominicana",
      src: "/svg/social/footer/youtube.svg",
    },
  ];

  return (
    <div className="flex flex-col xl:hidden">
      <div className="w-full h-full bg-white flex flex-col p-10 space-y-10">
        <div className="w-full max-w-screen-xl grid grid-cols-2 items-center gap-4 px-4 mx-auto">
          <div className="flex justify-start">
            <Image
              alt="logo"
              src="/prodominicana.svg"
              width={600}
              height={600}
              className="w-[152px] h-[56px]"
            />
          </div>
          <div className="flex justify-start ">
            <Image
              alt="logo"
              src="/svg/logos/LogoGobHorAzul.svg"
              width={600}
              height={600}
              className="w-[152px] h-[75px] md:h-[75px] "
            />
          </div>
        </div>
        <div className="w-full max-w-screen-xl grid grid-cols-2 gap-4 text-blue-950 px-4 mx-auto">
          <div className="space-y-4">
            <h1 className="font-bold text-lg">{t("aboutUs.title")}</h1>
            <Link
              href="/whoarewe"
              className="text-sm font-semibold space-y-1 block"
            >
              <p>{t("aboutUs.name")}</p>
              <p>{t("aboutUs.fullName")}</p>
            </Link>
          </div>
          <div className="space-y-4">
            <h1 className="font-bold text-lg">{t("contactUs.title")}</h1>
            <div className="text-sm font-semibold space-y-1">
              <Link
                href="tel:8095333522"
                className="text-blue-950 hover:text-cyan-600 duration-300 block"
              >
                {t("contactUs.phone")}
              </Link>
              <Link
                href="mailto:servicios@prodominicana.gob.do"
                className="text-blue-950 hover:text-cyan-600 duration-300 block"
              >
                {t("contactUs.emailMobile")}
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="font-bold text-lg">{t("findUs.title")}</h1>
            <div className="text-sm font-semibold space-y-1">
              <Link
                href="https://www.google.com/maps/place/ProDominicana/@18.4506423,-69.9756687,17z"
                target="_blank"
                className="text-blue-950 hover:text-cyan-600 duration-300 block"
              >
                <p>{t("findUs.address")}</p>
                <p>{t("findUs.city")}</p>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="font-bold text-lg">{t("stayInformed.title")}</h1>
            <div className="text-sm font-semibold space-y-2">
              <Link
                href="/"
                className="text-blue-950 hover:text-cyan-600 duration-300 block"
              >
                {t("stayInformed.useTerms")}
              </Link>
              <Link
                href="/"
                className="text-blue-950 hover:text-cyan-600 duration-300 block"
              >
                {t("stayInformed.privacyPolicy")}
              </Link>
              <Link
                href="/"
                className="text-blue-950 hover:text-cyan-600 duration-300 block"
              >
                {t("stayInformed.frequentlyQuestions")}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full bg-white flex flex-col divide-y">
        <div className="w-full h-full">
          <button
            onClick={toggleOpen}
            className="w-full h-full flex justify-between items-center text-blue-950 text-left font-bold text-lg px-10 py-5"
          >
            <p>{t("extra.certifications")}</p>

            <div>
              <ChevronRightIcon className={`${rotate} rotate-0 w-5 h-5`} />
            </div>
          </button>
          <Collapse open={open} className="w-full">
            <div className="grid grid-cols-2 place-items-center xl:flex flex-row flex-wrap h-full w-full gap-x-5 gap-y-4 px-10 pb-5">
              {normas.map(({ name, url, src }, index) => (
                <OgticRules title={name} url={url} source={src} key={index} />
              ))}
              <Image
                alt="AENOR"
                src={"/images/sellos/AENOR.png"}
                width={600}
                height={600}
                className="size-[100px] object-cover"
              />
              <Image
                alt="ISO"
                src={"/images/sellos/IQNET.png"}
                width={600}
                height={600}
                className="size-[100px] object-cover"
              />
            </div>
          </Collapse>
        </div>

        <div className="w-full flex flex-col space-y-4  p-5 items-center  text-white bg-blue-950">
          <div className="w-full flex-col flex justify-start items-center h-full">
            <p className="text-center">
              {" "}
              © {year} {t("extra.copyright")}{" "}
            </p>
            <Image
              alt="prodomsvg"
              src={"/svg/logos/Prodominicana.svg"}
              width={150}
              height={150}
            />
          </div>
          <div className="w-full flex space-x-4 justify-center items-center h-full">
            <h1 className="text-white font-bold text-lg flex">
              {t("extra.socialMediaText")}
            </h1>
            {socialMedia.map(({ name, url, src }, index) => (
              <SocialMedia url={url} image={src} alt={name} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
