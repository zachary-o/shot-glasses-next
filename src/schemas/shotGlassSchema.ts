import { z } from "zod"

const MAX_FILE_SIZE = 5 * 1024 * 1024

const continentSchema = z.object({
  continentEng: z.string(),
  continentUkr: z.string(),
})

const countrySchema = z.object({
  nameEng: z.string(),
  nameUkr: z.string(),
  // continent: continentSchema,
})

export const shotGlassFormSchema = z.object({
  image: z
    .any()
    .refine((file) => file?.length == 1, "Image is required.")
    .refine(
      (file) => file?.[0].size <= MAX_FILE_SIZE,
      "Max image size is 5MB."
    ),
  cityEng: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." }),
  cityUkr: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." }),
  latitude: z.string().refine(
    (val) => {
      const num = parseFloat(val)
      return !isNaN(num) && num >= -90 && num <= 90
    },
    { message: "Latitude must be a number between -90 and 90." }
  ),
  longitude: z.string().refine(
    (val) => {
      const num = parseFloat(val)
      return !isNaN(num) && num >= -180 && num <= 180
    },
    { message: "Longitude must be a number between -180 and 180." }
  ),
  purchaseDate: z.date().optional(),
  country: countrySchema,
  continent: continentSchema,
})
