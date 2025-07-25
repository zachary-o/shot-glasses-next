import { Continent, ContinentsCheckboxGroupProps } from "@/types"
import { useLocale } from "next-intl"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Checkbox } from "../ui/checkbox"

const ContinentsCheckboxGroup = ({
  isMulti,
  value,
  onValueChange,
  options,
}: ContinentsCheckboxGroupProps) => {
  const locale = useLocale()
  const searchParams = useSearchParams()
  const [selectedValues, setSelectedValues] = useState<Continent[]>([])

  useEffect(() => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      const selected = searchParams.get("continents")?.split(",") || []
      const matched = options.filter((opt) =>
        selected.includes(opt.continentEng)
      )
      setSelectedValues(matched)
    } else {
      setSelectedValues(Array.isArray(value) ? value : [value])
    }
  }, [value, searchParams, options])

  const handleToggle = (option: Continent, checked: string | boolean) => {
    if (isMulti) {
      const newSelected = checked
        ? [...selectedValues, option]
        : selectedValues.filter((v) => v.continentEng !== option.continentEng)
      setSelectedValues(newSelected)
      onValueChange(newSelected)
    } else {
      const newSelected = checked
        ? option
        : { continentEng: "", continentUkr: "" }
      setSelectedValues([newSelected])
      onValueChange(newSelected)
    }
  }

  return (
    <>
      {options.map((item: Continent) => (
        <div className="flex items-center space-x-2" key={item.continentEng}>
          <Checkbox
            className="cursor-pointer"
            id={item.continentEng}
            checked={selectedValues.some(
              (v) => v.continentEng === item.continentEng
            )}
            onCheckedChange={(checked) => handleToggle(item, checked)}
          />
          <label className="cursor-pointer" htmlFor={item.continentEng}>
            {locale === "en" ? item.continentEng : item.continentUkr}
          </label>
        </div>
      ))}
    </>
  )
}

export default ContinentsCheckboxGroup
