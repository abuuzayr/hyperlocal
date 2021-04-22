import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { LabeledSelectField } from "app/core/components/LabeledSelectField"
import { LabeledImageField } from "app/core/components/LabeledImageField"
import * as z from "zod"
import { HStack } from "@chakra-ui/react"

export function ListingForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <HStack spacing={3}>
        <LabeledTextField name="name" label="Name" placeholder="Name" required />
        <LabeledTextField name="namep" label="NameP" placeholder="NameP" visibility="hidden" />
        <LabeledSelectField
          name="category"
          label="Category"
          placeholder="Select Category"
          required
          options={["Products", "Services", "App", "Community"]}
        />
      </HStack>
      <LabeledTextField
        label="Tagline (80 characters)"
        name="tagline"
        placeholder="Keep it short and sweet!"
        required
        maxLength={80}
      />
      <HStack spacing={3} w={"100%"}>
        <LabeledImageField label="Feature image" name="img" helperText="Max size: 5MB" />
        <LabeledImageField label="Logo" name="logo" helperText="Max size: 500KB" />
      </HStack>
      <LabeledTextField
        label="Tags"
        name="tags"
        placeholder="e.g. Sneakers, Music, Food"
        helperText="Only 3 tags will be shown"
      />
      <HStack spacing={3}>
        <LabeledTextField label="Website URL" name="website" placeholder="Website" />
        <LabeledTextField label="Social Media URL" name="social" placeholder="social" />
      </HStack>
    </Form>
  )
}
