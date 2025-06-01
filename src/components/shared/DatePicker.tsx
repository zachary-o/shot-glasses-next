"use client";

import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, localeMap } from "@/lib/utils";
import { useLocale } from "next-intl";

export function DatePicker({
  value,
  onValueChange,
}: {
  value: Date | undefined;
  onValueChange: (value: Date) => void;
}) {
  const localeStr = useLocale();
  const dateFnsLocale = localeMap[localeStr] ?? enUS;
  const handleDateChange = (value: Date) => {
    onValueChange(value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "bg-transparent w-full justify-start text-left font-normal cursor-pointer hover:bg-transparent",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="text-muted-foreground hover:text-muted-foreground" />
          {value ? (
            format(value, "PPP")
          ) : (
            <span className="text-muted-foreground hover:text-muted-foreground">
              Pick a date
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              handleDateChange(selectedDate);
            }
          }}
          initialFocus
          locale={dateFnsLocale}
        />
      </PopoverContent>
    </Popover>
  );
}
