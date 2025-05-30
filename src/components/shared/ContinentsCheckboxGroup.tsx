import { Continent } from "@/types"
import { useLocale } from "next-intl"
import { useState } from "react"
import { Checkbox } from "../ui/checkbox"

type ContinentsCheckboxGroupProps = {
  isMulti: boolean
  onValueChange: (value: Continent | Continent[] | null) => void
  options: Continent[]
}

const ContinentsCheckboxGroup = ({
  isMulti,
  onValueChange,
  options,
}: ContinentsCheckboxGroupProps) => {
  const locale = useLocale()

  const [selectedContinent, setSelectedContinent] = useState<Continent[]>([])

  const handleToggle = (option: Continent, checked: string | boolean) => {
    if (isMulti) {
      const newSelected = checked
        ? [...selectedContinent, option]
        : selectedContinent.filter((v) => v !== option)
      setSelectedContinent(newSelected)
      onValueChange(newSelected)
    } else {
      const newSelected = checked ? [option] : []
      setSelectedContinent(newSelected)
      onValueChange(checked ? option : null)
    }
  }

  return (
    <>
      {options.map((item: Continent) => (
        <div className="flex items-center space-x-2" key={item.continentEng}>
          <Checkbox
            id={item.continentEng}
            checked={selectedContinent.includes(item)}
            onCheckedChange={(checked) => handleToggle(item, checked)}
          />
          <label htmlFor={item.continentEng}>
            {locale === "en" ? item.continentEng : item.continentUkr}
          </label>
        </div>
      ))}
    </>
  )
}
export default ContinentsCheckboxGroup
