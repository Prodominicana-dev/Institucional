import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { Timeline, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useSchedule } from "@/services/schedule/service";
import ScheduleTimeLineItem from "./scheduleItem";

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
          <Typography className="text-white font-bold text-xl xl:text-2xl font-opensans">
            {t("title")}
          </Typography>
        </div>
      </div>
      <Timeline>
        {schedule.map((item: any, index: number) => (
          <ScheduleTimeLineItem
            key={item.id ?? index}
            date={item.date}
            locale={locale}
            title={locale === "es" ? item.title : item.titleEn}
          />
        ))}
      </Timeline>
      <div className="w-full flex justify-center">
        <Link
          href="/schedule"
          className="w-40 text-center py-2 text-lg bg-transparent border-2 rounded-full border-blue-950 text-blue-950 font-gotham hover:bg-blue-950 hover:text-white hover:border-transparent transition-all duration-500 ease-in-out"
        >
          {t("buttonText")}
        </Link>
      </div>
    </div>
  );
}
