import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

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
  latitude: z
    .number()
    .min(-90, { message: "Latitude must be ≥ -90." })
    .max(90, { message: "Latitude must be ≤ 90." }),
  longitude: z
    .number()
    .min(-180, { message: "Longitude must be ≥ -180." })
    .max(180, { message: "Longitude must be ≤ 180." }),
  purchaseDate: z.date().optional(),
  country: z.string().nonempty("Please select a country."),
  continent: z.string().nonempty("Please select a continent."),
});
