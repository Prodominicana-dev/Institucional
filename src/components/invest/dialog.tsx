"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Stepper, Step } from "@material-tailwind/react";
import { createDirection } from "@/services/structure-organizational/service";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { es } from "date-fns/locale";
import Link from "next/link";
export function InvestmentDialog({
  investment,
  type,
  locale,
  open,
  handler,
}: {
  investment: any;
  type: string;
  locale: string;
  open: boolean;
  handler: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [horario, setHorario] = useState("");
  const [area, setArea] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [requirements, setRequirements] = useState("");
  const [process, setProcess] = useState("");
  const [time, setTime] = useState("");
  const [to, setTo] = useState("");
  const [access, setAccess] = useState("");
  const [channel, setChannel] = useState("");
  const [info, setInfo] = useState("");
  useEffect(() => {
    if (investment) {
      setTitle(investment.name);
      setDescription(investment.description);
      setHorario(investment.horario);
      setArea(investment.area);
      setEmail(investment.email);
      setPhone(investment.tel);
      setPrice(investment.price);
      setRequirements(investment.requirement);
      setProcess(investment.process);
      setTime(investment.time);
      setTo(investment.to);
      setAccess(investment.access);
      setChannel(investment.channel);
      setInfo(investment.info);
      console.log(investment);
    }
  }, [investment]);

  const dataIcons = [
    {
      icon: "/svg/invest/dialog/priceIcon.svg",
      title: { es: "Costo del servicio:", en: "Service Cost:" },
      data: price,
    },
    {
      icon: "/svg/invest/dialog/deliveryTimeIcon.svg",
      title: {
        es: "Tiempo de realización del servicio:",
        en: "Service Duration:",
      },
      data: time,
    },
    {
      icon: "/svg/invest/dialog/scheduleIcon.svg",
      title: {
        es: "Horario de prestación del servicio:",
        en: "Service Operating Hours:",
      },
      data: horario,
    },
    {
      icon: "/svg/invest/dialog/channelIcon.svg",
      title: {
        es: "Canales de prestación del servicio:",
        en: "Service Provision Channels:",
      },
      data: channel,
    },
    {
      icon: "/svg/invest/dialog/accessIcon.svg",
      title: { es: "Acceso al servicio", en: "Access to the Service" },
      data: access,
    },
  ];
  return (
    <>
      <Dialog
        placeholder={undefined}
        open={open}
        handler={() => {}}
        size="lg"
        className=""
      >
        <DialogBody
          placeholder={undefined}
          className="p-5 lg:p-10 overflow-y-auto text-pretty h-full"
        >
          <div className="flex flex-col font-montserrat text-black gap-4 ">
            <div className="flex flex-col gap-4 sticky">
              <div className="w-full flex gap-2 justify-between">
                {" "}
                <div className="flex flex-col w-11/12 lg:w-full">
                  <h1 className="font-bold text-xl md:text-2xl line-clamp-4 break-words lg:text-4xl text-red-700 ">
                    {title}
                  </h1>
                  <p className="font-light text-sm text-black">{type}</p>
                </div>
                <div className="w-1/12 flex justify-center items-start lg:items-center">
                  <button onClick={handler}>
                    <XMarkIcon className="text-red-700  size-8 hover:text-red-700/80 duration-300" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:gap-8 max-h-[70vh] overflow-y-auto no-scrollbar">
              <div className="w-full flex flex-col gap-2">
                <div
                  dangerouslySetInnerHTML={{ __html: description }}
                  className="font-normal line-clamp-4"
                ></div>
              </div>
              <div className="w-full flex flex-col items-center gap-2">
                <h1 className="w-full text-center lg:text-left font-bold uppercase">
                  {locale === "es" ? "Contacto" : "Contact"}
                </h1>
                <div className="w-full flex-col flex">
                  <div className="w-full text-left">
                    t: <Link href={`t:${phone}`}>{phone}</Link>
                  </div>
                  <div className="w-1/2 ">
                    e: <Link href={`mailto:${email}`}>{email}</Link>
                  </div>
                </div>
              </div>
              {requirements && (
                <div className="w-full flex flex-col gap-2">
                  <h1 className="w-full text-center lg:text-left font-bold uppercase">
                    {locale === "es"
                      ? "REQUERIMIENTOS PARA OBTENER EL SERVICIO"
                      : "Requirements for Service Acquisition"}
                  </h1>
                  <div
                    dangerouslySetInnerHTML={{ __html: requirements }}
                    className="font-normal "
                  ></div>
                </div>
              )}
              {process && (
                <div className="w-full flex flex-col gap-2">
                  <h1 className="w-full text-center lg:text-left font-bold uppercase">
                    {locale === "es"
                      ? "PROCEDIMIENTO PARA OBTENER EL SERVICIO"
                      : "Procedure for Service Acquisition"}
                  </h1>
                  <div
                    dangerouslySetInnerHTML={{ __html: requirements }}
                    className="font-normal"
                  ></div>
                </div>
              )}
              {info && (
                <div className="w-full flex flex-col gap-2">
                  <h1 className="w-full text-center lg:text-left font-bold uppercase">
                    {locale === "es"
                      ? "INFORMACIÓN ADICIONAL"
                      : "Additional Information"}
                  </h1>
                  <div
                    dangerouslySetInnerHTML={{ __html: info }}
                    className="font-normal"
                  ></div>
                </div>
              )}
              <div className="w-full flex justify-center">
                <div className="flex flex-row flex-wrap justify-center gap-5 w-10/12">
                  {dataIcons.map(({ icon, title, data }, index) => (
                    <div key={index} className=" w-full lg:w-1/5">
                      {locale === "es" &&
                      title.es.toLocaleLowerCase().includes("acceso") ? (
                        <Link
                          href={data}
                          target="_blank"
                          className="w-full flex flex-col items-center gap-1 hover:scale-110 duration-75"
                        >
                          <Image
                            src={icon}
                            alt={locale === "es" ? title.es : title.en}
                            width={400}
                            height={400}
                            className="size-16"
                          />
                          <div>
                            <h1 className="font-bold text-sm text-center">
                              {locale === "es" ? title.es : title.en}
                            </h1>
                          </div>
                        </Link>
                      ) : (
                        <div className="w-full">
                          {locale === "es" ? (
                            <div className="w-full flex flex-col items-center gap-1">
                              <Image
                                src={icon}
                                alt={title.es}
                                width={400}
                                height={400}
                                className="size-16"
                              />
                              <div>
                                <h1 className="font-bold text-sm text-center">
                                  {title.es}
                                </h1>
                                <p className="font-normal text-sm text-center">
                                  {data}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="w-full">
                              {locale === "en" &&
                              title.en
                                .toLocaleLowerCase()
                                .includes("access") ? (
                                <Link
                                  href={data}
                                  target="_blank"
                                  className="w-full flex flex-col items-center gap-1 hover:scale-110 duration-75"
                                >
                                  <Image
                                    src={icon}
                                    alt={title.en}
                                    width={400}
                                    height={400}
                                    className="size-16"
                                  />
                                  <div>
                                    <h1 className="font-bold text-sm text-center">
                                      {title.en}
                                    </h1>
                                  </div>
                                </Link>
                              ) : (
                                <div className="w-full flex flex-col items-center gap-1">
                                  <Image
                                    src={icon}
                                    alt={title.en}
                                    width={400}
                                    height={400}
                                    className="size-16"
                                  />
                                  <div>
                                    <h1 className="font-bold text-sm text-center">
                                      {title.en}
                                    </h1>
                                    <p className="font-normal text-sm text-center">
                                      {data}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
