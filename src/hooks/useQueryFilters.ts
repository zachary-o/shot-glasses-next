"use client"

import { useRouter, useSearchParams } from "next/navigation"
import qs from "qs"

export const useQueryFilters = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateParams = (key: string, value: string[] | undefined) => {
    const current = qs.parse(searchParams.toString())

    if (value && value.length > 0) {
      current[key] = value
    } else {
      delete current[key]
    }

    const queryString = qs.stringify(current, {
      arrayFormat: "comma",
      encode: false,
    })
    
    router.push(`?${queryString}`)
  }

  return { updateParams }
}
