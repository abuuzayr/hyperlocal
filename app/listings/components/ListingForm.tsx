import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { LabeledSelectField } from "app/core/components/LabeledSelectField"
import { LabeledImageField } from "app/core/components/LabeledImageField"
import * as z from "zod"
import { Stack } from "@chakra-ui/react"
export { FORM_ERROR } from "app/core/components/Form"

export function ListingForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <Stack direction={["column", "row"]} spacing={3}>
        <LabeledTextField name="name" label="Name" placeholder="Name" required />
        <LabeledTextField name="namep" label="NameP" placeholder="NameP" visibility="hidden" />
        <LabeledSelectField
          name="category"
          label="Category"
          placeholder="Select Category"
          required
          options={[
            "Products (Physical products)",
            "Services (Intangible items)",
            "App (Web/mobile apps)",
            "Community",
          ]}
        />
      </Stack>
      <LabeledTextField
        label="Tagline - description of the listing in 80 characters"
        name="tagline"
        placeholder="Keep it short and sweet!"
        required
        maxLength={80}
      />
      <Stack direction={["column", "row"]} spacing={3} w={"100%"}>
        <LabeledImageField
          label="Feature image (top of card) - 5MB max"
          name="img"
          helperText="image should be 3:2, e.g. 600wx400h"
        />
        <LabeledImageField
          label="Logo - 500KB max"
          name="logo"
          helperText="image should be square, e.g. 100x100"
        />
      </Stack>
      <LabeledTextField
        label="Tags (comma delimited labels, keywords)"
        name="tags"
        placeholder="e.g. Sneakers, Music, Food"
        helperText="You can write several but only the first 3 tags will be shown"
        maxLength={160}
      />
      <Stack direction={["column", "row"]} spacing={3}>
        <LabeledTextField label="Website URL" name="website" placeholder="Website" />
        <LabeledTextField label="Social Media URL" name="social" placeholder="social" />
      </Stack>
    </Form>
  )
}
