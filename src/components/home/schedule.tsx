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
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSchedule } from "@/services/schedule/service";

export default function Schedule({ locale }: { locale: string }) {
  const [schedule, setSchedule] = useState<any>([]);
  const { data, isLoading, isError } = useSchedule();
  const t = useTranslations("Schedule");

  useEffect(() => {
    if (data && !isLoading) {
      setSchedule(data);
    }
  }, [data, isLoading]);
  return (
    <div className="w-full xl:w-4/12 h-full space-y-10">
      <div className="flex w-full h-full">
        <div className="size-16 absolute  flex items-center justify-center bg-red-700  rounded-l-lg">
          <CalendarDaysIcon className="text-white h-10 w-10" />
        </div>
        <div className="w-full h-16 flex items-center justify-center bg-blue-950 rounded-lg">
          <Typography
            className="text-white font-bold text-xl xl:text-2xl font-opensans"
            placeholder={undefined}
          >
            {t("title")}
          </Typography>
        </div>
      </div>
      <Timeline>
        {schedule.map((item: any, index: number) => (
          <ScheduleTimeLineItem
            key={index}
            date={item.date}
            locale={locale}
            title={locale === "es" ? item.title : item.titleEn}
          />
        ))}
      </Timeline>
    </div>
  );
}

function ScheduleTimeLineItem({ date, title, locale }: any) {
  const formatDate = new Date(date).toLocaleString(locale, {
    month: "long",
    year: "numeric",
  });
  const day = new Date(date).getDate();
  return (
    <TimelineItem>
      <TimelineConnector />
      <TimelineHeader className="h-3">
        <TimelineIcon className="bg-cyan-600" />
        <div className="flex space-x-5 items-center relative ml-2">
          <div className="flex items-center justify-center relative">
            <CalendarIcon className="text-red-700 h-8 w-8 absolute" />
            <div className="absolute text-red-700 text-xs pt-2 font-semibold">
              {day}
            </div>
          </div>
          <Typography
            className="text-red-700 leading-none pt-1"
            placeholder={undefined}
          >
            {formatDate}
          </Typography>
        </div>
      </TimelineHeader>
      <TimelineBody className="pb-8">
        <Typography
          variant="small"
          placeholder={undefined}
          className="font-semibold uppercase text-zinc-500 xl:text-xl"
        >
          {title}
        </Typography>
      </TimelineBody>
    </TimelineItem>
  );
}
