"use client"

import PictureUploader from "@/components/shared/PictureUploader"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { shotGlassFormSchema } from "@/schemas/shotGlassSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { MultiSelect } from "./MultiSelect"

const AdminForm = () => {
  const form = useForm<z.infer<typeof shotGlassFormSchema>>({
    resolver: zodResolver(shotGlassFormSchema),
    defaultValues: {},
  })

  async function onSubmit(values: z.infer<typeof shotGlassFormSchema>) {
    try {
      // Simulate a successful contact form submission
      console.log(values)
      toast.success("Your message has been sent successfully!")
    } catch (error) {
      console.error("Error submitting contact form", error)
      toast.error("Failed to send your message. Please try again.")
    }
  }

  const frameworksList = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PictureUploader />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h5>Additional info</h5>
        <FormField
          control={form.control}
          name="cityEng"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
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
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="latitude"
                  placeholder="Latitude"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="longitude"
                  placeholder="Longitude"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <h5>Country</h5>
          <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MultiSelect
                      options={frameworksList}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select options"
                      variant="inverted"
                      maxCount={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
      </form>
    </Form>
  )
}

export default AdminForm
