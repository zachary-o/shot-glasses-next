import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const continentSchema = z
  .object({
    continentEng: z.string(),
    continentUkr: z.string(),
  })
  .refine(
    (continent) =>
      continent.continentEng !== "" || continent.continentUkr !== "",
    "Continent is required."
  );

const countrySchema = z
  .object({
    nameEng: z.string(),
    nameUkr: z.string(),
  })
  .refine(
    (country) => country.nameEng !== "" || country.nameUkr !== "",
    "Country is required."
  );

export const shotGlassFormSchema = z.object({
  image: z
    .array(z.instanceof(File))
    .min(1, { message: "Image is required." })
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE, {
      message: "Max image size is 5MB.",
    }),
  cityEng: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." }),
  cityUkr: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." }),
  latitude: z
    .string()
    .refine(
      (val) => {
        return val !== "";
      },
      { message: "Latitude is required." }
    )
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num >= -90 && num <= 90;
      },
      { message: "Latitude must be a number between -90 and 90." }
    ),
  longitude: z
    .string()
    .refine(
      (val) => {
        return val !== "";
      },
      { message: "Longitude is required." }
    )
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num >= -180 && num <= 180;
      },
      { message: "Longitude must be a number between -180 and 180." }
    ),
  purchaseDate: z.date().optional(),
  country: countrySchema,
  continent: continentSchema,
});
