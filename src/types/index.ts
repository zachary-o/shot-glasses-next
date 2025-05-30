import { multiSelectVariants } from "@/components/shared/CountriesSelect"
import { type VariantProps } from "class-variance-authority"

export type GeoType = {
  nameEng: string
  nameUkr: string
  continentEng: string
  continentUkr: string
}

export type Continent = Pick<GeoType, "continentEng" | "continentUkr">

export type Country = Pick<GeoType, "nameEng" | "nameUkr">
export interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: {
    /** The text to display for the option. */
    nameEng: string
    /** The unique value associated with the option. */
    nameUkr: string
    continentEng: string
    continentUkr: string
  }[]
  isMulti: boolean
  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: Country | Country[]) => void

  /** The default selected values when the component mounts. */
  defaultValue?: string[]

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string
}
