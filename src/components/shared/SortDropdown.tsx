"use client"

import { useQueryFilters } from "@/hooks/useQueryFilters"
import { useLocale } from "next-intl"
import { cn } from "@/lib/utils"

const sortOptions = (locale: string) => {
  return [
    { value: "cityAsc", label: locale === "en" ? "City A-Z" : "Місто А-Я" },
    { value: "cityDesc", label: locale === "en" ? "City Z-A" : "Місто Я-А" },
    {
      value: "countryAsc",
      label: locale === "en" ? "Country A-Z" : "Країна А-Я",
    },
    {
      value: "countryDesc",
      label: locale === "en" ? "Country Z-A" : "Країна Я-А",
    },
  ]
}

const SortDropdown = ({ className }: { className?: string }) => {
  const { updateParams } = useQueryFilters()
  const locale = useLocale()

  const handleSortItems = (option: string) => {
    updateParams("sortBy", option ? [option] : undefined)
  }

  return (
    <select
      className={cn(
        "appearance-none w-[230px] h-9 rounded-md border bg-transparent px-2 py-1 text-sm text-muted-foreground",
        "focus-visible:outline-none focus-visible:border-transparent",
        "focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:ring-offset-0",
        className
      )}
      name="sortOptions"
      onChange={(e) => handleSortItems(e.target.value)}
    >
      {sortOptions(locale).map((option) => (
        <option className="text-black" key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default SortDropdown
