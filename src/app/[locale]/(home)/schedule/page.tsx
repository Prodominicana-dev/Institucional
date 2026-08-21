"use client";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { Timeline, Typography } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { useAllSchedule } from "@/services/schedule/service";
import ScheduleTimeLineItem from "@/components/home/scheduleItem";

export default function Page() {
  const [schedule, setSchedule] = useState<any>([]);
  const params = useParams<{ locale: string }>();
  const { data, isLoading } = useAllSchedule();
  const t = useTranslations("Schedule");

  useEffect(() => {
    if (data && !isLoading) {
      setSchedule(data);
    }
  }, [data, isLoading]);

  return (
    <div className="pt-16 md:pt-16 xl:pt-24 pb-20 flex justify-center">
      <div className="w-11/12 xl:w-8/12 space-y-10">
        <div className="flex w-full">
          <div className="size-16 absolute flex items-center justify-center bg-red-700 rounded-l-lg">
            <CalendarDaysIcon className="text-white h-10 w-10" />
          </div>
          <div className="w-full h-16 flex items-center justify-center bg-blue-950 rounded-lg">
            <Typography className="text-white font-bold text-xl xl:text-2xl font-opensans">
              {t("pageTitle")}
            </Typography>
          </div>
        </div>

        {isLoading ? (
          <div className="w-full h-[40vh] flex justify-center items-center">
            <HashLoader />
          </div>
        ) : schedule.length === 0 ? (
          <Typography className="text-center text-zinc-500 font-opensans">
            {t("empty")}
          </Typography>
        ) : (
          <Timeline>
            {schedule.map((item: any, index: number) => (
              <ScheduleTimeLineItem
                key={item.id ?? index}
                date={item.date}
                locale={params.locale}
                title={params.locale === "es" ? item.title : item.titleEn}
              />
            ))}
          </Timeline>
        )}
      </div>
    </div>
  );
}
