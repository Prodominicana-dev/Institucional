"use client";
import React from "react";
import {
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Day_Picker({
  date,
  setDate,
  fromDate,
}: {
  date: Date;
  setDate: any;
  fromDate?: Date;
}) {
  // Month in Date format
  const month = new Date();
  month.setMonth(month.getMonth() - 1);

  // Month in number
  const monthNumber = new Date().getMonth();

  // Year
  const year = new Date().getFullYear();

  const day = new Date().getDate();

  return (
    <Popover placement="bottom-start">
      <PopoverHandler>
        <Input
          crossOrigin={""}
          label=""
          className="!border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500"
          labelProps={{
            className: "hidden",
          }}
          onChange={() => null}
          value={date ? format(date, "dd MMMM yyyy", { locale: es }) : ""}
        />
      </PopoverHandler>
      <PopoverContent placeholder={undefined} className="z-[9999]">
        <DayPicker
          locale={es}
          mode="single"
          defaultMonth={new Date(year, monthNumber, day)}
          selected={date}
          onSelect={setDate}
          fromYear={2000}
          toYear={year + 1}
          showOutsideDays
          required={true}
          className="border-0"
        />
      </PopoverContent>
    </Popover>
  );
}
