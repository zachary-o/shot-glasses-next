"use client"

import { useQueryFilters } from "@/hooks/useQueryFilters"
import { cn } from "@/lib/utils"

const sortOptions = [
  { value: "cityAsc", label: "City A-Z" },
  { value: "cityDesc", label: "City Z-A" },
  { value: "countryAsc", label: "Country A-Z" },
  { value: "countryDesc", label: "Country Z-A" },
  //   { value: "popularityAsc", label: "Popularity ⬆" },
  //   { value: "popularityDesc", label: "Popularity ⬇" },
]

const SortDropdown = () => {
  const { updateParams } = useQueryFilters()

  const handleSortItems = (option: string) => {
    updateParams("sortBy", option ? [option] : undefined)
  }

  return (
    <select
      className={cn(
        "appearance-none w-[150px] h-9 rounded-md border bg-transparent px-3 py-1",
        "focus-visible:outline-none focus-visible:border-transparent",
        "focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:ring-offset-0"
      )}
      name="sortOptions"
      onChange={(e) => handleSortItems(e.target.value)}
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default SortDropdown
