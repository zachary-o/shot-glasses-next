"use client"

import { Input } from "@/components/ui/input"
import { useQueryFilters } from "@/hooks/useQueryFilters"
import { Search } from "lucide-react"
import React, { useState } from "react"

const SearchInput = () => {
  const { updateParams } = useQueryFilters()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      updateParams("search", searchQuery ? [searchQuery] : undefined)
    }
  }

  return (
    <div className="relative w-[300px]">
      <Search
        className="absolute top-1/2 translate-y-[-50%] left-3"
        size={20}
        color="#8a0b00"
      />
      <Input
        className="pl-10"
        type="search"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default SearchInput
