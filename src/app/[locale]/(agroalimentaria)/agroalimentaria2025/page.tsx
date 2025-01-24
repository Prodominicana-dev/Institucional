"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Countdown from "react-countdown";
import { useLocale, useTranslations } from "next-intl";
import { Menu, UnstyledButton } from "@mantine/core";
import { usePathname, useRouter } from "@/navigation";
import { useParams } from "next/navigation";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";

export default function Page() {
  const t = useTranslations("agroalimentaria2025");
  const locale = useLocale();
  const forms = [
    {
      title: t("buyers.title"),
      url: t("buyers.url"),
    },
    {
      title: t("exporters.title"),
      url: t("exporters.url"),
    },
  ];
  return (
    <div className="w-full h-full bg-white">
      <Image
        width={3840}
        height={2160}
        quality={100}
        draggable={false}
        alt="agrotop"
        src="/images/agroalimentaria/agrotop.png"
        className="w-full"
      />
      <div className="overflow-auto xl:overflow-hidden w-full h-full flex flex-col items-center justify-center xl:gap-10">
        <div className="w-10/12 xl:w-8/12 pb-2 xl:pb-0">
          <LanguagePicker />
          {locale === "es" ? (
            <Image
              width={1920}
              height={1080}
              draggable={false}
              alt="agroesp"
              src={`/svg/logos/agroalimentaria2025esp.svg`}
              className="w-full"
            />
          ) : (
            <Image
              width={1920}
              height={1080}
              draggable={false}
              alt="agroeng"
              src={`/svg/logos/agroalimentaria2025eng.svg`}
              className="w-full"
            />
          )}
        </div>
        <div className="flex flex-col xl:flex-row justify-center items-center gap-10">
          <div className="flex flex-col w-10/12 xl:w-4/12 gap-10">
            <div className="text-gray-500 flex flex-col gap-4 w-full">
              <p className="text-xs xl:text-lg">{t("description")}</p>
              <h1 className="text-sm font-bold uppercase xl:text-lg">
                {t("participate")}
              </h1>
            </div>
            <div className="flex flex-wrap justify-center xl:justify-start gap-5">
              {forms.map((form) => (
                <FormButton
                  key={form.title}
                  title={form.title}
                  url={form.url}
                />
              ))}
            </div>
          </div>
          <DateTimeLocation />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center font-bold gap-3 text-[#CB6431] text-lg xl:text-3xl">
            <div>28 -31</div>
            <Divider color="bg-[#CB6431]" />
            <div className="uppercase">{t("month")}</div>
            <Divider color="bg-[#CB6431]" />
            <div>2025</div>
          </div>
          <Link
            href={"https://maps.app.goo.gl/N2V84C5w5NZEiZez9"}
            target="_blank"
            className="w-full text-sm xl:text-lg text-center text-gray-500 hover:text-[#519A4C] duration-300"
          >
            Centro de Convenciones Hotel Dominican Fiesta, <br /> Santo Domingo,
            República Dominicana
          </Link>
        </div>
      </div>
      <Image
        width={3840}
        height={2160}
        draggable={false}
        alt="agrotop"
        src="/images/agroalimentaria/agrobottom.png"
        className="w-full"
      />
    </div>
  );
}

function Divider({ color }: { color?: string }) {
  return <div className={`w-1 h-6 xl:h-7 rounded-full ${color}`} />;
}
function DateTimeLocation() {
  const t = useTranslations("agroalimentaria2025");
  return (
    <div className="flex flex-col items-center gap-5 xl:w-4/12 text-white">
      <HubCountDown />
      <div className="flex items-center gap-5 w-full">
        <Image
          width={1920}
          height={1080}
          draggable={false}
          alt="hubCanvas"
          src="/svg/logos/jad.svg"
          className="w-32 xl:w-5/12"
        />
        <Divider color="bg-[#519A4C] xl:h-20 w-[2px]" />
        <Image
          width={1920}
          height={1080}
          draggable={false}
          alt="hubCanvas"
          src="/prodominicanaFull.svg"
          className="w-32 xl:w-5/12"
        />
      </div>
    </div>
  );
}

function FormButton({ title, url }: { title: string; url: string }) {
  return (
    <Link
      href={url}
      target="_blank"
      className="bg-[#519A4C] hover:bg-[#ADCB54] duration-300 text-white font-bold px-6 py-3 rounded-full text-center"
    >
      {title}
    </Link>
  );
}

function HubCountDown() {
  const t = useTranslations("agroalimentaria2025");
  const TimeUnit = ({ value, label, color }: any) => (
    <div className={`flex flex-col items-center gap-2 xl:w-20`}>
      <span
        className={`text-2xl xl:text-6xl font-extrabold ${color}`}
        suppressHydrationWarning
      >
        {value}
      </span>
      <div className="text-sm xl:text-base text-gray-400">{label}</div>
    </div>
  );

  function Point() {
    return (
      <span className="bg-[#519A4C] size-2 xl:size-3 rounded-full -translate-y-3" />
    );
  }
  const renderer = ({
    formatted: { days, hours, minutes, seconds, completed, zeroPad },
  }: any) => {
    if (completed) return <span>You are good to go!</span>;
    return (
      <div className="text-white flex items-center gap-5">
        <div className="text-white flex items-center gap-3 xl:gap-5">
          <TimeUnit value={days} label={t("days")} color={"text-[#E9963E]"} />
          <Point />
          <TimeUnit value={hours} label={t("hours")} color={"text-[#F7CC46]"} />
          <Point />
          <TimeUnit
            value={minutes}
            label={t("minutes")}
            color={"text-[#ADCB54]"}
          />
          <Point />
          <TimeUnit
            value={seconds}
            label={t("seconds")}
            color={"text-[#CB6431]"}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-5" suppressHydrationWarning>
      <Countdown date={new Date("2025-05-28T09:00:00")} renderer={renderer} />
    </div>
  );
}
const data = [
  { label: "Español", code: "Esp", langcode: "es" },
  { label: "English", code: "Eng", langcode: "en" },
];

function LanguagePicker() {
  const locale = useParams().locale;
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(
    data.find((item) => item.langcode === locale) || data[0]
  );
  const items = data.map((item) => (
    <Menu.Item onClick={() => setSelected(item)} key={item.label}>
      {item.label}
    </Menu.Item>
  ));

  const pathname = usePathname();

  function switchLocale(locale: string) {
    router.replace(pathname, { locale: locale });
  }
  useEffect(() => {
    switchLocale(selected.langcode);
  }, [selected]);

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
    >
      <Menu.Target>
        <Button
          data-expanded={opened || undefined}
          placeholder={undefined}
          className="flex items-center gap-2 rounded-full capitalize border-2 border-white bg-transparent hover:bg-white/10 duration-200 w-min px-5 py-2 text-[#519A4C] text-base"
        >
          <GlobeAltIcon className="size-5 text-[#519A4C]" />
          {selected.code}
        </Button>
      </Menu.Target>
      <Menu.Dropdown className="flex flex-col items-center justify-center bg-white">
        {items}
      </Menu.Dropdown>
    </Menu>
  );
}
