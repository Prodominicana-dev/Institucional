import { CalendarIcon } from "@heroicons/react/24/outline";
import {
  TimelineBody,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  Typography,
} from "@material-tailwind/react";
import React from "react";

export default function ScheduleTimeLineItem({ date, title, locale }: any) {
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
          <Typography className="text-red-700 leading-none pt-1">
            {formatDate}
          </Typography>
        </div>
      </TimelineHeader>
      <TimelineBody className="pb-8">
        <Typography
          variant="small"
          className="font-semibold uppercase text-zinc-500 xl:text-xl"
        >
          {title}
        </Typography>
      </TimelineBody>
    </TimelineItem>
  );
}
