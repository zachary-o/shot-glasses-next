"use client"

import { continentsArr, geoList } from "@/geoData"
import { useQueryFilters } from "@/hooks/useQueryFilters"
import { Continent, Country } from "@/types"
import ContinentsCheckboxGroup from "./ContinentsCheckboxGroup"
import { CountriesSelect } from "./CountriesSelect"

const Filters = () => {
  const { updateParams } = useQueryFilters()

  const handleContinentChange = (newSelected: Continent[]) => {
    const continentsEng = newSelected.map((c) => c.continentEng)
    updateParams("continents", continentsEng);
  }

  const handleCountryChange = (newSelected: Country[]) => {
    const countriesEng = newSelected.map((c) => c.nameEng)
    updateParams("countries", countriesEng);
  }

  return (
    <div className="flex flex-col gap-4 w-50">
      <ContinentsCheckboxGroup
        isMulti={true}
        onValueChange={(newSelected) =>
          handleContinentChange(newSelected as Continent[])
        }
        options={continentsArr}
      />
      <CountriesSelect
        isMulti={true}
        options={geoList}
        onValueChange={(newSelected) =>
          handleCountryChange(newSelected as Country[])
        }
        placeholder="Select options"
        maxCount={3}
      />
    </div>
  )
}

export default Filters
