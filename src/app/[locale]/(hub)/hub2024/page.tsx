"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Countdown from "react-countdown";
import { useTranslations } from "next-intl";
import { Menu, UnstyledButton } from "@mantine/core";
import { usePathname, useRouter } from "@/navigation";
import { useParams } from "next/navigation";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";

export default function Page() {
  const t = useTranslations("hub");
  const forms = [
    {
      title: t("buyers.title"),
      url: t("buyers.url"),
    },
    {
      title: t("exporters.title"),
      url: t("exporters.title"),
    },
  ];
  return (
    <div className="w-full h-full xl:h-screen">
      <video autoPlay loop muted className="w-full h-full object-cover">
        <source src="/videos/hub.mp4" type="video/mp4" />
      </video>
      <div className="z-10 absolute inset-0 w-full h-full bg-[#051628]/95"></div>
      <Image
        width={3840}
        height={2160}
        draggable={false}
        alt="hubCanvas"
        src="/images/hubCanvas.png"
        className="z-20 absolute inset-0 w-full h-full object-cover"
      />
      <div className="z-30 absolute inset-0 overflow-auto xl:overflow-hidden w-full h-full flex flex-col xl:flex-row xl:justify-center items-center gap-10 xl:gap-20 py-10 px-2">
        <div className="flex flex-col w-10/12 xl:w-4/12 gap-10">
          <LanguagePicker />
          <div className="flex gap-10 w-full">
            <Image
              width={1920}
              height={1080}
              draggable={false}
              alt="hubCanvas"
              src="/svg/logos/camaraSantoDomingo.svg"
              className="w-32 xl:w-5/12"
            />
            <Image
              width={1920}
              height={1080}
              draggable={false}
              alt="hubCanvas"
              src="/svg/logos/prodominicanaMultiColor.svg"
              className="w-32 xl:w-5/12"
            />
          </div>
          <div className="text-white flex flex-col gap-4 w-full">
            <p className="text-xl xl:text-2xl">{t("title")}</p>
            <Image
              width={1920}
              height={1080}
              draggable={false}
              alt="hubText"
              src="/svg/hubText.svg"
              className="w-96"
            />
            <p className="text-xs xl:text-sm">{t("description")}</p>
            <h1 className="text-sm uppercase xl:text-xl">{t("participate")}</h1>
          </div>
          <div className="flex flex-wrap justify-center xl:justify-start gap-5">
            {forms.map((form) => (
              <FormButton key={form.title} title={form.title} url={form.url} />
            ))}
          </div>
        </div>
        <DateTimeLocation />
      </div>
    </div>
  );
}

function DateTimeLocation() {
  const t = useTranslations("hub");
  function Divider() {
    return <div className="w-1 h-6 xl:h-7 rounded-full bg-cyan-500" />;
  }
  return (
    <div className="flex flex-col items-center gap-5 xl:w-3/12 text-white">
      <HubCountDown />
      <div className="flex items-center font-medium gap-3 text white text-lg xl:text-3xl">
        <div>3</div>
        <Divider />
        <div>4</div>
        <Divider />
        <div>5</div>
        <Divider />
        <div className="uppercase">{t("month")}</div>
        <div className="w-1 h-6 xl:h-8 rounded-full bg-white" />
        <div>2024</div>
      </div>
      <Link
        href={"https://maps.app.goo.gl/a2AKB874zJbiCBac6"}
        target="_blank"
        className="w-full text-sm xl:text-xl text-center uppercase hover:text-cyan-400 duration-300"
      >
        Hotel El Embajador, <br /> Santo Domingo, Rep. DOM.
      </Link>
    </div>
  );
}

function FormButton({ title, url }: { title: string; url: string }) {
  return (
    <Link
      href={url}
      target="_blank"
      className="bg-cyan-500 hover:bg-cyan-500/80 duration-300 text-[#051628] font-bold px-6 py-3 rounded-full text-center"
    >
      {title}
    </Link>
  );
}

function HubCountDown() {
  const t = useTranslations("hub");
  const TimeUnit = ({ value, label }: any) => (
    <div className="flex flex-col items-center gap-2 xl:w-20">
      <span
        className="text-2xl xl:text-6xl font-extrabold"
        suppressHydrationWarning
      >
        {value}
      </span>
      <div className="text-sm xl:text-base">{label}</div>
    </div>
  );

  function Point() {
    return (
      <span className="bg-cyan-500 size-2 xl:size-3 rounded-full -translate-y-3" />
    );
  }
  const renderer = ({
    formatted: { days, hours, minutes, seconds, completed, zeroPad },
  }: any) => {
    if (completed) return <span>You are good to go!</span>;
    return (
      <div className="text-white flex items-center gap-5">
        <div className="text-white flex items-center gap-3 xl:gap-5">
          <TimeUnit value={days} label={t("days")} />
          <Point />
          <TimeUnit value={hours} label={t("hours")} />
          <Point />
          <TimeUnit value={minutes} label={t("minutes")} />
          <Point />
          <TimeUnit value={seconds} label={t("seconds")} />
        </div>
      </div>
    );
  };

  return (
    <div className="flex gap-5" suppressHydrationWarning>
      <Countdown date={new Date("2024-09-04T09:00:00")} renderer={renderer} />
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
          className="flex items-center gap-2 rounded-full capitalize border-2 border-white bg-transparent hover:bg-white/10 duration-200 w-min px-5 py-2 text-white text-base"
        >
          <GlobeAltIcon className="size-5 text-white" />
          {selected.code}
        </Button>
      </Menu.Target>
      <Menu.Dropdown className="flex flex-col items-center justify-center bg-white">
        {items}
      </Menu.Dropdown>
    </Menu>
  );
}
