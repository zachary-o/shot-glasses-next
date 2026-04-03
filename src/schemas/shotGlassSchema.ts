import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

type T = (key: string) => string;

const continentSchema = (t: T) =>
  z
    .object({
      continentEng: z.string(),
      continentUkr: z.string(),
    })
    .refine(
      (continent) => continent.continentEng !== "" || continent.continentUkr !== "",
      t("continentRequired")
    );

const countrySchema = (t: T) =>
  z
    .object({
      nameEng: z.string(),
      nameUkr: z.string(),
    })
    .refine(
      (country) => country.nameEng !== "" || country.nameUkr !== "",
      t("countryRequired")
    );

export const shotGlassFormSchema = (t: T) =>
  z.object({
    image: z
      .array(z.instanceof(File))
      .min(1, { message: t("imageRequired") })
      .refine((files) => files[0]?.size <= MAX_FILE_SIZE, {
        message: t("imageMaxSize"),
      }),
    cityEng: z.string().min(2, { message: t("cityMinLength") }),
    cityUkr: z.string().min(2, { message: t("cityMinLength") }),
    latitude: z
      .string()
      .refine((val) => val !== "", { message: t("latitudeRequired") })
      .refine(
        (val) => {
          const num = parseFloat(val);
          return !isNaN(num) && num >= -90 && num <= 90;
        },
        { message: t("latitudeInvalid") }
      ),
    longitude: z
      .string()
      .refine((val) => val !== "", { message: t("longitudeRequired") })
      .refine(
        (val) => {
          const num = parseFloat(val);
          return !isNaN(num) && num >= -180 && num <= 180;
        },
        { message: t("longitudeInvalid") }
      ),
    purchaseDate: z.date().optional(),
    country: countrySchema(t),
    continent: continentSchema(t),
  });