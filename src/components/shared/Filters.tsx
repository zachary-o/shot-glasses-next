"use client";

import { continentsArr, geoList } from "@/geoData";
import { Continent, Country } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import ContinentsCheckboxGroup from "./ContinentsCheckboxGroup";
import { CountriesSelect } from "./CountriesSelect";

const Filters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleContinentChange = (newSelected: Continent[]) => {
    const continentsEng: string[] = newSelected.map(
      (country) => country.continentEng
    );
    const current = new URLSearchParams(searchParams.toString());
    if (continentsEng.length > 0) {
      current.set("continents", continentsEng.join(","));
    } else {
      current.delete("continents");
    }

    const queryString = current.toString();
    router.push(`?${queryString}`);
  };

  const handleCountryChange = (newSelected: Country[]) => {
    const countriesEng: string[] = newSelected.map(
      (country) => country.nameEng
    );
    const current = new URLSearchParams(searchParams.toString());
    if (countriesEng.length > 0) {
      current.set("countries", countriesEng.join(","));
    } else {
      current.delete("countries");
    }

    const queryString = current.toString();
    router.push(`?${queryString}`);
  };

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
  );
};

export default Filters;
