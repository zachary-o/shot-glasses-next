import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Country, MultiSelectProps } from "@/types"
import { cva } from "class-variance-authority"
import { ChevronDown, XCircle, XIcon } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { forwardRef, useEffect, useState } from "react"
import { Checkbox } from "../ui/checkbox"

export const multiSelectVariants = cva(
  "m-1 cursor-pointer bg-[var(--color-red)]",
)

export const CountriesSelect = forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      isMulti,
      options,
      onValueChange,
      maxCount = 3,
      modalPopover = false,
      className,
    },
    ref,
  ) => {
    const locale = useLocale()
    const t = useTranslations("HomePage")
    const searchParams = useSearchParams()

    const [selectedValues, setSelectedValues] = useState<Country[]>([])
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)
    const [search, setSearch] = useState("")

    const filteredOptions = options
      .filter((opt) => {
        const name = locale === "en" ? opt.nameEng : opt.nameUkr
        return name.toLowerCase().includes(search.toLowerCase())
      })
      .sort((a, b) =>
        locale === "en"
          ? a.nameEng.localeCompare(b.nameEng)
          : a.nameUkr.localeCompare(b.nameUkr, "uk"),
      )

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true)
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues]
        newSelectedValues.pop()
        onValueChange(newSelectedValues)
      }
    }

    useEffect(() => {
      const selected = searchParams.get("countries")?.split(",") || []
      const matched = options.filter((opt) => selected.includes(opt.nameEng))
      setSelectedValues(matched)
    }, [searchParams, options])

    const handleToggle = (option: Country) => {
      if (isMulti) {
        const newSelectedValues = selectedValues.some(
          (item) => item.nameEng === option.nameEng,
        )
          ? selectedValues.filter((item) => item.nameEng !== option.nameEng)
          : [...selectedValues, option]
        setSelectedValues(newSelectedValues)
        onValueChange(newSelectedValues)
      } else {
        const isSame =
          selectedValues.length > 0 &&
          selectedValues[0].nameEng === option.nameEng
        setSelectedValues(isSame ? [] : [option])
        onValueChange(isSame ? [] : option)
      }
    }

    const handleClear = () => {
      setSelectedValues([])
      onValueChange([])
    }

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev)
    }

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount)
      onValueChange(newSelectedValues)
    }

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            onClick={handleTogglePopover}
            className={cn(
              "flex w-full p-2 rounded-md border h-9 items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto",
              className,
            )}
          >
            {selectedValues.length > 0 ? (
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-wrap items-center gap-0.5">
                  {selectedValues.slice(0, maxCount).map((selectedValue) => {
                    const option = options.find(
                      (obj) => obj.nameEng === selectedValue.nameEng,
                    )
                    return (
                      <Badge
                        className="bg-[var(--color-red)] max-w-[115px]"
                        key={selectedValue.nameEng}
                        variant="destructive"
                      >
                        <span className="truncate">
                          {locale === "en" ? option?.nameEng : option?.nameUkr}
                        </span>
                        <XCircle
                          className="ml-2 h-4 w-4 cursor-pointer shrink-0"
                          onClick={(event) => {
                            event.stopPropagation()
                            handleToggle({
                              nameEng: selectedValue.nameEng,
                              nameUkr: selectedValue.nameUkr,
                            })
                          }}
                        />
                      </Badge>
                    )
                  })}
                  {selectedValues.length > maxCount && (
                    <Badge
                      className={cn(
                        "bg-transparent text-foreground border-foreground/1 hover:bg-transparent",
                      )}
                    >
                      {`+ ${selectedValues.length - maxCount} more`}
                      <XCircle
                        className="ml-2 h-4 w-4 cursor-pointer shrink-0"
                        onClick={(event) => {
                          event.stopPropagation()
                          clearExtraOptions()
                        }}
                      />
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <XIcon
                    className="h-4 mx-2 cursor-pointer text-muted-foreground"
                    onClick={(event) => {
                      event.stopPropagation()
                      handleClear()
                    }}
                  />
                  <Separator
                    orientation="vertical"
                    className="flex min-h-6 h-full"
                  />
                  <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full mx-auto">
                <span className="text-sm text-muted-foreground">
                  {t(
                    `${isMulti ? "countriesPlaceholderMulti" : "countriesPlaceholderSingle"}`,
                  )}
                </span>
                <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[230px] lg:w-[200px] p-0"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command shouldFilter={false} className="flex flex-col max-h-[300px]">
            <CommandInput
              placeholder={t("searchPlaceholder")}
              value={search}
              onKeyDown={handleInputKeyDown}
              onValueChange={setSearch}
            />

            {/* Scrollable list */}
            <CommandList className="max-h-[240px] overflow-y-auto">
              <CommandEmpty>{t("countriesNoResults")}</CommandEmpty>
              <CommandGroup>
                {filteredOptions.map((optionObj) => {
                  const isSelected = selectedValues
                    .map((item: Country) => item.nameEng)
                    .includes(optionObj.nameEng)
                  return (
                    <CommandItem
                      key={optionObj.nameEng}
                      onSelect={() => {
                        handleToggle({
                          nameEng: optionObj.nameEng,
                          nameUkr: optionObj.nameUkr,
                        })
                      }}
                      className="cursor-pointer hover:!bg-[#FEE4E1]"
                    >
                      <Checkbox checked={isSelected} />
                      <span>
                        {locale === "en"
                          ? optionObj.nameEng
                          : optionObj.nameUkr}
                      </span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>

            {/* Sticky footer buttons */}
            <div className="border-t border-border bg-background sticky bottom-0 z-10">
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between">
                  {selectedValues.length > 0 && (
                    <>
                      <CommandItem
                        onSelect={handleClear}
                        className="flex-1 justify-center cursor-pointer"
                      >
                        {t("countriesClear")}
                      </CommandItem>
                      <Separator
                        orientation="vertical"
                        className="flex min-h-6 h-full"
                      />
                    </>
                  )}
                  <CommandItem
                    onSelect={() => setIsPopoverOpen(false)}
                    className="flex-1 justify-center cursor-pointer max-w-full"
                  >
                    {t("countriesDropdownClose")}
                  </CommandItem>
                </div>
              </CommandGroup>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    )
  },
)

CountriesSelect.displayName = "CountriesSelect"
