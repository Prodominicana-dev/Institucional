import { CalendarDaysIcon, CalendarIcon } from "@heroicons/react/24/outline";
import {
  Timeline,
  TimelineBody,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useTranslations } from "next-intl";

export default function Schedule() {
  const t = useTranslations("Schedule");
  return (
    <div className="w-full lg:w-4/12 lg:h-16 space-y-10">
      <div className="flex w-full h-full">
        <div className="w-16 h-16 absolute  flex items-center justify-center bg-red-700  rounded-l-lg">
          <CalendarDaysIcon className="text-white h-10 w-10" />
        </div>
        <div className="w-full h-16 flex items-center justify-center bg-blue-950 rounded-lg">
          <Typography
            className="text-white font-bold text-2xl font-opensans"
            placeholder={undefined}
          >
            {t("title")}
          </Typography>
        </div>
      </div>
      <Timeline>
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader className="h-3">
            <TimelineIcon className="bg-cyan-600" />
            <div className="flex space-x-5 items-center relative ml-2">
              <div className="flex items-center justify-center relative">
                <CalendarIcon className="text-red-700 h-8 w-8 absolute" />
                <div className="absolute text-red-700 text-xs pt-2 font-semibold">
                  22
                </div>
              </div>
              <Typography
                className="text-red-700 leading-none"
                placeholder={undefined}
              >
                DE DICIEMBRE 2023 | 09:23
              </Typography>
            </div>
          </TimelineHeader>
          <TimelineBody className="pb-8">
            <Typography
              variant="small"
              placeholder={undefined}
              className="font-semibold uppercase text-zinc-500 text-xl"
            >
              FIRMA ACUERDO CON PROINDUSTRIA PARA AGILIZAR TRÁMITES A
              INVERSIONISTAS
            </Typography>
          </TimelineBody>
        </TimelineItem>
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader className="h-3">
            <TimelineIcon className="bg-cyan-600" />
            <div className="flex space-x-5 items-center relative ml-2">
              <div className="flex items-center justify-center relative">
                <CalendarIcon className="text-red-700 h-8 w-8 absolute" />
                <div className="absolute text-red-700 text-xs pt-2 font-semibold">
                  22
                </div>
              </div>
              <Typography
                className="text-red-700 leading-none"
                placeholder={undefined}
              >
                DE DICIEMBRE 2023 | 09:23
              </Typography>
            </div>
          </TimelineHeader>
          <TimelineBody className="pb-8">
            <Typography
              variant="small"
              placeholder={undefined}
              className="font-semibold uppercase text-zinc-500 text-xl"
            >
              RONDA DE NEGOCIOS CON MÁS 46 COMPRADORES INTERNACIONALES
            </Typography>
          </TimelineBody>
        </TimelineItem>
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader className="h-3">
            <TimelineIcon className="bg-cyan-600" />
            <div className="flex space-x-5 items-center relative ml-2">
              <div className="flex items-center justify-center relative">
                <CalendarIcon className="text-red-700 h-8 w-8 absolute" />
                <div className="absolute text-red-700 text-xs pt-2 font-semibold">
                  22
                </div>
              </div>
              <Typography
                className="text-red-700 leading-none"
                placeholder={undefined}
              >
                DE DICIEMBRE 2023 | 09:23
              </Typography>
            </div>
          </TimelineHeader>
          <TimelineBody className="pb-8">
            <Typography
              variant="small"
              placeholder={undefined}
              className="font-semibold uppercase text-zinc-500 text-xl"
            >
              AMERICA’S FOOD AND BEVERAGE 2023
            </Typography>
          </TimelineBody>
        </TimelineItem>
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader className="h-3">
            <TimelineIcon className="bg-cyan-600" />
            <div className="flex space-x-5 items-center relative ml-2">
              <div className="flex items-center justify-center relative">
                <CalendarIcon className="text-red-700 h-8 w-8 absolute" />
                <div className="absolute text-red-700 text-xs pt-2 font-semibold">
                  22
                </div>
              </div>
              <Typography
                className="text-red-700 leading-none"
                placeholder={undefined}
              >
                DE DICIEMBRE 2023 | 09:23
              </Typography>
            </div>
          </TimelineHeader>
          <TimelineBody className="pb-8">
            <Typography
              variant="small"
              placeholder={undefined}
              className="font-semibold uppercase text-zinc-500 text-xl"
            >
              FIRMA ACUERDO INTERINSTITUCIONAL CON INPOSDOM A FAVOR DE LA
              MIPYMES
            </Typography>
          </TimelineBody>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
