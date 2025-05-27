"use client"

import { format } from "date-fns"
import { enUS } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn, localeMap } from "@/lib/utils"
import { useLocale } from "next-intl"

export function DatePicker({
  onValueChange,
}: {
  onValueChange: (value: Date) => void
}) {
  const localeStr = useLocale()
  const dateFnsLocale = localeMap[localeStr] ?? enUS
  const [date, setDate] = React.useState<Date>()

  const handleDateChange = (date: Date) => {
    onValueChange(date)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              setDate(selectedDate)
              handleDateChange(selectedDate)
            }
          }}
          initialFocus
          locale={dateFnsLocale}
        />
      </PopoverContent>
    </Popover>
  )
}
