"use client";

import PictureUploader from "@/components/shared/PictureUploader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { continentsArr, geoList } from "@/geoData";
import { shotGlassFormSchema } from "@/schemas/shotGlassSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoadingBar } from "react-top-loading-bar";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import ContinentsCheckboxGroup from "./ContinentsCheckboxGroup";
import { CountriesSelect } from "./CountriesSelect";
import { DatePicker } from "./DatePicker";

const AdminForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { start, complete } = useLoadingBar();
  const form = useForm<z.infer<typeof shotGlassFormSchema>>({
    resolver: zodResolver(shotGlassFormSchema),
    defaultValues: {
      image: [],
      cityEng: "",
      cityUkr: "",
      latitude: "",
      longitude: "",
      purchaseDate: undefined,
      country: {
        nameEng: "",
        nameUkr: "",
      },
      continent: {
        continentEng: "",
        continentUkr: "",
      },
    },
  });

  async function onSubmit(values: z.infer<typeof shotGlassFormSchema>) {
    setIsSubmitting(true);
    start();
    try {
      const imageFile = values.image[0];
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "shotglass_upload");

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await cloudinaryRes.json();
      const imageUrl = data.secure_url;
      if (!imageUrl) throw new Error("Cloudinary upload failed.");

      const payload = {
        cityEng: values.cityEng,
        cityUkr: values.cityUkr,
        countryEng: values.country.nameEng,
        countryUkr: values.country.nameUkr,
        continentEng: values.continent.continentEng,
        continentUkr: values.continent.continentUkr,
        latitude: values.latitude,
        longitude: values.longitude,
        imageUrl,
      };

      const res = await fetch("/api/shotGlasses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Saving to DB failed.");

      toast.success("Shot glass has been added successfully!");
    } catch (error) {
      console.error("Error adding a shot glass", error);
      toast.error("Uploading failed. Please try again.");
    } finally {
      setIsSubmitting(false);
      complete();
      form.reset();
    }
  }

  const watchedValues = form.watch();
  console.log("Watched values:", watchedValues);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormControl>
                <PictureUploader
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h4 className="mb-2 font-bold text-[var(--color-black)]">
          Additional info
        </h4>
        <div className="flex flex-col gap-4 mb-4">
          <FormField
            control={form.control}
            name="cityEng"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="text-sm"
                    id="cityEng"
                    placeholder="City in English"
                    type="text"
                    autoComplete="cityEng"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cityUkr"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="text-sm"
                    id="cityUkr"
                    placeholder="City in Ukrainian"
                    type="text"
                    autoComplete="cityUkr"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => {
              const { onChange, ...rest } = field;
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-sm"
                      id="latitude"
                      placeholder="Latitude"
                      type="text"
                      inputMode="decimal"
                      {...rest}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => {
              const { onChange, ...rest } = field;
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-sm"
                      id="longitude"
                      placeholder="Longitude"
                      type="text"
                      inputMode="decimal"
                      {...rest}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="purchaseDate"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <h4 className="mb-2 font-bold text-[var(--color-black)]">Country</h4>
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormControl>
                <CountriesSelect
                  isMulti={false}
                  options={geoList}
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Select options"
                  maxCount={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h4 className="mb-2 font-bold text-[var(--color-black)]">Continent</h4>
        <FormField
          control={form.control}
          name="continent"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormControl>
                <ContinentsCheckboxGroup
                  isMulti={false}
                  value={field.value}
                  onValueChange={field.onChange}
                  options={continentsArr}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full bg-[var(--color-red)] mb-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default AdminForm;
