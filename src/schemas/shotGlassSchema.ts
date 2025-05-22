import { z } from "zod"

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]

export const shotGlassFormSchema = z.object({
  image: z
    .any()
    .refine((file) => file?.length == 1, "Image is required")
    .refine((file) => file.size <= MAX_FILE_SIZE, "Max image size is 5MB.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  cityEng: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  cityUkr: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  latitude: z
    .number()
    .min(-90, { message: "Latitude must be ≥ -90" })
    .max(90, { message: "Latitude must be ≤ 90" }),
  longitude: z
    .number()
    .min(-180, { message: "Longitude must be ≥ -180" })
    .max(180, { message: "Longitude must be ≤ 180" }),
  purchaseDate: z.date().optional(),
  country: z
    .array(z.string().min(1))
    .min(1)
    .nonempty("Please select at least one country."),
})
