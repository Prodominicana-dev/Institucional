"use client";
import LanguagePicker from "@/components/layout/navbar/languagePicker";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Collapse } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Page() {
  const date = new Date();
  const year = date.getFullYear();
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);
  const t = useTranslations("shetrades");
  const footer = useTranslations("Footer");
  const navbarMenuItems = [
    {
      title: t("navbarMenuItems.home"),
      link: "#home",
    },
    {
      title: t("navbarMenuItems.about"),
      link: "#about",
    },
    {
      title: t("navbarMenuItems.trainings"),
      link: "#trainings",
    },
    {
      title: t("navbarMenuItems.initiatives"),
      link: "#initiatives",
    },
    {
      title: t("navbarMenuItems.benefits"),
      link: "#benefits",
    },
    {
      title: t("navbarMenuItems.register"),
      link: "https://forms.office.com/e/WW3rJ2Nett",
    },
  ];

  const about = {
    title: t("about.title"),
    desc: t("about.desc"),
    benefits: [
      {
        name: t("about.benefits.0.name"),
        icon: "/svg/shetrades/AboutIcon1.svg",
      },
      {
        name: t("about.benefits.1.name"),
        icon: "/svg/shetrades/AboutIcon2.svg",
      },
      {
        name: t("about.benefits.2.name"),
        icon: "/svg/shetrades/AboutIcon3.svg",
      },
    ],
  };

  const trainings = [
    {
      name: t("trainings.list.0.name"),
    },
    {
      name: t("trainings.list.1.name"),
    },
    {
      name: t("trainings.list.2.name"),
    },
    {
      name: t("trainings.list.3.name"),
    },
    {
      name: t("trainings.list.4.name"),
    },
    {
      name: t("trainings.list.5.name"),
    },
  ];

  const initiatives = [
    {
      title: t("initiatives.list.0.name"),
      icon: "/svg/shetrades/InitiativeIcon1.svg",
    },
    {
      title: t("initiatives.list.1.name"),
      icon: "/svg/shetrades/InitiativeIcon2.svg",
    },
    {
      title: t("initiatives.list.2.name"),
      icon: "/svg/shetrades/InitiativeIcon3.svg",
    },
    {
      title: t("initiatives.list.3.name"),
      icon: "/svg/shetrades/InitiativeIcon4.svg",
    },
    {
      title: t("initiatives.list.4.name"),
      icon: "/svg/shetrades/InitiativeIcon5.svg",
    },
    {
      title: t("initiatives.list.5.name"),
      icon: "/svg/shetrades/InitiativeIcon2.svg",
    },
  ];
  const benefits = [
    {
      title: t("benefits.list.0.title"),
      desc: t("benefits.list.0.desc"),
    },
    {
      title: t("benefits.list.1.title"),
      desc: t("benefits.list.1.desc"),
    },
    {
      title: t("benefits.list.2.title"),
      desc: t("benefits.list.2.desc"),
    },
    {
      title: t("benefits.list.3.title"),
      desc: t("benefits.list.3.desc"),
    },
    {
      title: t("benefits.list.4.title"),
      desc: t("benefits.list.4.desc"),
    },
  ];

  return (
    <div className="bg-white h-full">
      <div>
        <div className="bg-red-700 p-5 flex xl:justify-center items-center">
          <Link href={"/"} className="w-6/12 lg:w-4/12">
            <Image
              src="/svg/shetrades/itcshetrades-white.svg"
              alt="2020"
              width={100}
              height={100}
              className="w-full"
            />
          </Link>
          <div className="absolute right-5 flex gap-3">
            <div className="bg-white p-[2px] sm:p-1 rounded-sm flex justify-center items-center">
              <LanguagePicker />
            </div>
            <button onClick={toggleOpen} className="block xl:hidden">
              <Bars3Icon className="text-white w-6 " />
            </button>
          </div>
        </div>
        <Collapse
          open={open}
          className="px-5 bg-[#042236] flex flex-col items-center xl:hidden"
        >
          {navbarMenuItems.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="text-white hover:text-white/60 font-bold p-5 duration-300 uppercase"
            >
              {item.title}
            </Link>
          ))}
        </Collapse>
        <div className="bg-[#042236] xl:flex justify-center gap-10 uppercase hidden">
          {navbarMenuItems.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="text-white hover:text-white/60 font-bold p-5 text-lg duration-300"
            >
              {item.title}
            </Link>
          ))}
        </div>

        <section
          id="home"
          className="bg-white flex items-center justify-between py-10 lg:py-0"
        >
          <div className="w-full lg:w-6/12 flex flex-col items-center justify-center gap-4">
          <div className="w-full flex flex-row items-center justify-center lg:flex-row gap-5 lg:gap-16">
              <Image
                src="/prodominicana.svg"
                alt="2020"
                width={100}
                height={100}
                className="w-5/12 xl:w-4/12"
              />
              <Image
                src="/svg/shetrades/itcshetradesplain.svg"
                alt="2020"
                width={100}
                height={100}
                className="w-5/12 xl:w-4/12"
              />
              </div>
            <div className="w-10/12 lg:w-8/12 flex flex-col items-center text-center gap-5 ">
              
              <div className="space-y-5 text-blueGray-400 text-xs lg:text-lg">
                <p>{t("home.title")}</p>
                <p>{t("home.desc")}</p>
              </div>
              <Link
                href="https://forms.office.com/e/HzumTc6evE"
                target="_blank"
                className="bg-red-700 text-white lg:text-lg py-3 px-5 self-center rounded-full"
              >
                {t("home.buttonText")}
              </Link>
            </div>
          </div>
          <div className="hidden lg:block w-6/12">
            <Image
              src="/images/shetrades/home.jpg"
              alt="2020"
              width={6720}
              height={4480}
              className="h-[50vh] xl:h-[70vh] object-cover"
            />
          </div>
        </section>
        <section
          id="about"
          className="w-full flex flex-col items-center bg-blue-300 relative py-20"
        >
          <div className="w-10/12 flex justify-between">
            <div className="w-full xl:w-4/12 flex flex-col justify-center gap-10 text-white">
              <h1 className="p-5 border-l-2 border-white text-6xl font-light">
                {t("about.title")}
              </h1>
              <p className="text-lg">{t("about.desc")}</p>
              <div className="flex justify-between">
                {about.benefits.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-3 w-3/12"
                  >
                    <Image
                      src={item.icon}
                      alt="2020"
                      width={100}
                      height={100}
                      className="w-24"
                    />
                    <p className="uppercase text-center text-white">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <Image
              src={"/svg/shetrades/About.svg"}
              alt="2020"
              width={2000}
              height={2000}
              className="hidden xl:block w-6/12"
            />
          </div>
        </section>
        <section id="trainings" className="bg-white py-20 flex justify-center">
          <div className="lg:w-11/12 xl:w-10/12 flex flex-col lg:flex-row gap-5 justify-center items-center">
            <div className="xl:w-4/12 lg:w-6/12 flex justify-center">
              <div className="size-72 lg:size-96 bg-red-700 rounded-full flex flex-col justify-center items-center text-white origin-bottom">
                <div className="-translate-y-5 flex flex-col justify-center items-center">
                  <Image
                    src="/svg/shetrades/trainingsIcon.svg"
                    alt="2020"
                    width={100}
                    height={100}
                    className="w-20"
                  />
                  <h1 className="uppercase text-2xl lg:text-4xl ">
                    {t("trainings.title")}
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex justify-center ">
              <ul className="w-8/12 list-disc text-xl space-y-5 text-black">
                {trainings.map((item, index) => (
                  <li key={index}>{item.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section id="initiatives" className="w-full relative">
          <Image
            src={"/images/prodominicanabuilding.jpg"}
            width={6000}
            height={2195}
            alt="building"
            className="absolute inset-0 object-cover object-center w-full h-full -z-10"
          />
          <div className="bg-[#042236]/80 z-10 flex flex-col items-center text-center text-white py-20 h-full gap-5">
            <div className="text-2xl lg:text-5xl flex flex-col sm:flex-row gap-2 font-light uppercase">
              {t("initiatives.title")}{" "}
              <h1 className="font-bold">{t("initiatives.title2")}</h1>
            </div>
            <div className="w-10/12 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-6 gap-20 h-full items-center">
              {initiatives.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-5 text-center h-4/6"
                >
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="size-20"
                  />
                  <p className="text-sm text-center h-3/6">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="benefits"
          className="bg-white py-20 flex flex-col items-center gap-5"
        >
          <h1 className="uppercase text-4xl">{t("benefits.title")}</h1>
          <div className="w-8/12">
            <ul className="list-[upper-roman] marker:text-lightBlue-400 marker:font-light marker:text-3xl sm:marker:text-5xl text-xl space-y-10">
              {benefits.map((item, index) => (
                <li key={index}>
                  <p className="text-gray-600 break-words">
                    <strong className="text-trueGray-600">
                      {item.title}: {""}
                    </strong>
                    {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      <div className="bg-[#042236] py-5 flex flex-col sm:flex-row justify-center items-center text-white gap-2">
        <p className="text-center">
          {" "}
          © {year} {footer("extra.copyright")}{" "}
        </p>
        <Link href={"/"}>
          <Image
            alt="prodomsvg"
            src={"/svg/logos/Prodominicana.svg"}
            width={150}
            height={150}
            className="w-20"
          />
        </Link>
      </div>
    </div>
  );
}
