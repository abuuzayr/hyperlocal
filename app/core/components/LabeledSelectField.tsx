import { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Select } from "@chakra-ui/react"

export interface LabeledSelectFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["select"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Helper text. */
  helperText?: string
  options: string[]
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledSelectField = forwardRef<HTMLSelectElement, LabeledSelectFieldProps>(
  ({ name, label, helperText, options, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: props.type === "number" ? Number : undefined,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError
    const { size, ...propsWithoutSize } = props

    return (
      <FormControl
        {...outerProps}
        isInvalid={touched && normalizedError}
        isRequired={props.required}
      >
        <FormLabel mb={1} fontSize={"xs"}>
          Category
        </FormLabel>
        <Select {...input} disabled={submitting} {...propsWithoutSize} ref={ref}>
          {options.map((option) => (
            <option value={option.toLowerCase().split("(")[0].trim()} key={option}>
              {option}
            </option>
          ))}
        </Select>
        <FormHelperText fontSize="xs">{helperText}</FormHelperText>
        <FormErrorMessage>{normalizedError}</FormErrorMessage>
      </FormControl>
    )
  }
)

export default LabeledSelectField
