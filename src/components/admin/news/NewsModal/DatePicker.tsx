"use client";
import { CalendarIcon } from "lucide-react";
import { es } from "date-fns/locale";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
}) {
  const year = new Date().getFullYear();
  const selected = date instanceof Date ? date : new Date(date);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "h-11 w-full justify-start rounded-xl border-input bg-background px-3.5 font-normal shadow-sm transition-colors hover:bg-accent/40",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 size-4 text-muted-foreground" />
          {date ? (
            format(selected, "dd MMMM yyyy", { locale: es })
          ) : (
            <span>Selecciona una fecha</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto rounded-xl p-0">
        <Calendar
          locale={es}
          mode="single"
          defaultMonth={selected}
          selected={selected}
          onSelect={(value) => value && setDate(value)}
          fromYear={2000}
          toYear={year + 1}
          showOutsideDays
          required
        />
      </PopoverContent>
    </Popover>
  );
}
