"use client"

import React from "react"
import ContinentsCheckboxGroup from "./ContinentsCheckboxGroup"
import { CountriesSelect } from "./CountriesSelect"
import { continentsArr, geoList } from "@/geoData"

const Filters = () => {
  return (
    <div className="flex flex-col gap-4">
      <ContinentsCheckboxGroup
        isMulti={true}
        value={[]}
        onValueChange={() => {}}
        options={continentsArr}
      />
      <CountriesSelect
        isMulti={false}
        options={geoList}
        value={[]}
        onValueChange={() => {}}
        placeholder="Select options"
        maxCount={3}
      />
    </div>
  )
}

export default Filters
