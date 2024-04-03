"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Input, Select, Option, Textarea } from "@material-tailwind/react";

export default function Page() {
  const t = useTranslations("invest.contact");
  return (
    <div>
      <div className="relative">
        <Image
          width={3840}
          height={2160}
          src="/images/puntacatalina.jpg"
          alt="Turismo"
          className="object-cover w-full h-[40vh] sm:h-[70vh]"
        />
      </div>
      <div className="bg-white h-full flex flex-col items-center py-10 gap-10">
        <div className="w-10/12 flex flex-col gap-2">
          <h1 className="uppercase text-4xl font-bold text-blue-dark">
            {t("title")}
          </h1>
          <p className="text-gray-400 text-lg">{t("description")}</p>
        </div>
        <div className="w-10/12 flex flex-col gap-10">
          <div className="flex flex-col sm:flex-row gap-5">
            <FormInput label={t("form.name")} placeholder="John" type="text" />
            <FormInput
              label={t("form.lastName")}
              placeholder="Doe"
              type="text"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-5">
            <FormInput
              label={t("form.jobTitle")}
              placeholder="CEO"
              type="text"
            />
            <FormInput
              label={t("form.company")}
              placeholder="Tesla"
              type="text"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-5">
            <FormInput
              label={t("form.email")}
              placeholder="example@email.com"
              type="email"
            />
            <FormInput
              label={t("form.phone")}
              placeholder="+1 000 000 0000"
              type="tel"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-full flex flex-col gap-2">
              <div className="font-bold text-xl text-blue-dark">
                {t("form.country")}
              </div>
              <Select
                className=" !border-t-blue-gray-200 focus:!border-t-blue-950 bg-white"
                containerProps={{ className: "h-12" }}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                placeholder={undefined}
              >
                <Option>Exportador</Option>
                <Option>Inversionista</Option>
                <Option>Otro</Option>
              </Select>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="font-bold text-xl text-blue-dark">
                {t("form.sector")}
              </div>
              <Select
                className=" !border-t-blue-gray-200 focus:!border-t-blue-950 bg-white"
                containerProps={{ className: "h-12" }}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                placeholder={undefined}
              >
                <Option>Exportador</Option>
                <Option>Inversionista</Option>
                <Option>Otro</Option>
              </Select>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="font-bold text-xl text-blue-dark">
              {t("form.message")}
            </div>
            <Textarea
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              className="w-full h-40 border-t-blue-gray-200 focus:border-t-blue-950 bg-white"
            ></Textarea>
          </div>
          <button className="bg-blue-950 w-full py-5 text-xl text-white font-bold text-center rounded-xl">
            {t("form.button")}
          </button>
        </div>
      </div>
    </div>
  );
}

function FormInput({
  label,
  placeholder,
  type,
  value,
  setValue,
  required,
}: {
  label: string;
  placeholder: string;
  type: string;
  value?: string;
  setValue?: any;
  required?: boolean;
}) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="font-bold text-xl text-blue-dark">{label}</div>
      <Input
        placeholder={placeholder}
        type={type}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className=" !border-t-blue-gray-200 focus:!border-t-blue-950 bg-white"
        containerProps={{ className: "h-12" }}
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        crossOrigin={undefined}
      />
    </div>
  );
}
