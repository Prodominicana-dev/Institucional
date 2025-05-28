"use client";
import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { es } from "date-fns/locale";
import { format } from "date-fns";

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
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(
              date instanceof Date ? date : new Date(date),
              "dd MMMM yyyy",
              { locale: es }
            )
          ) : (
            <span>Fecha</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          locale={es}
          mode="single"
          defaultMonth={new Date(year, monthNumber, day)}
          selected={date}
          onSelect={setDate}
          fromYear={2000}
          toYear={year + 1}
          showOutsideDays
          required={true}
        />
      </PopoverContent>
    </Popover>
  );
}
