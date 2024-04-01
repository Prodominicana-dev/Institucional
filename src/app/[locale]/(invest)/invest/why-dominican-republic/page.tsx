import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export default function Page() {
  const t = useTranslations("invest.why");
  const reasons = [
    {
      title: t("reasons.0.title"),
      desc: t("reasons.0.description"),
      icon: "/svg/invest/reasonIcon.svg",
    },
    {
      title: t("reasons.1.title"),
      desc: t("reasons.1.description"),
      icon: "/svg/invest/reasonIcon1.svg",
    },
    {
      title: t("reasons.2.title"),
      desc: t("reasons.2.description"),
      icon: "/svg/invest/reasonIcon2.svg",
    },
    {
      title: t("reasons.3.title"),
      desc: t("reasons.3.description"),
      icon: "/svg/invest/reasonIcon3.svg",
    },
    {
      title: t("reasons.4.title"),
      desc: t("reasons.4.description"),
      icon: "/svg/invest/reasonIcon4.svg",
    },
    {
      title: t("reasons.5.title"),
      desc: t("reasons.5.description"),
      icon: "/svg/invest/reasonIcon5.svg",
    },
  ];
  return (
    <div className="bg-white h-full">
      <div className="relative">
        <Image
          width={3840}
          height={2160}
          src="/images/invest/flags.jpg"
          alt="Turismo"
          className="object-cover object-center w-full h-[40vh] sm:h-[70vh]"
        />
        <div className="absolute inset-0 xl:p-32 pb-20 flex items-end justify-center lg:justify-start">
          <div className="w-8/12 xl:w-6/12 text-center text-white flex flex-col gap-[2px]">
            <div className="uppercase bg-blue-dark w-full font-light text-xl sm:text-3xl p-2">
              {t("title1")}
            </div>
            <div className="uppercase bg-blue-dark w-full font-bold text-xl sm:text-5xl p-2">
              {t("title2")}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center py-10 bg-white">
        <div className="flex flex-col gap-10 w-10/12">
          <p className="text-xl text-zinc-600 font-medium">
            {t("description")}
          </p>
          <div className="flex flex-col gap-10">
            {reasons.map((reason, index) => (
              <ReasonCard
                title={reason.title}
                desc={reason.desc}
                icon={reason.icon}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReasonCard({ title, desc, icon }: any) {
  return (
    <div className="flex flex-col sm:flex-row gap-5 sm:gap-0">
      <div className="sm:w-3/12 flex sm:justify-center items-center">
        <Image
          width={100}
          height={100}
          src={icon}
          alt={title}
          className="object-cover size-14"
        />
      </div>
      <div className="sm:w-9/12 text-xl">
        <p className="text-gray-600">
          <strong className="uppercase text-blue-dark">{title} </strong>
          {desc}
        </p>
      </div>
    </div>
  );
}
