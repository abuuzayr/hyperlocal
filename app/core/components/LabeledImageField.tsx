import { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"
import { FormControl, FormLabel, Input, FormErrorMessage, FormHelperText } from "@chakra-ui/react"

export interface LabeledImageFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Helper text. */
  helperText?: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledImageField = forwardRef<HTMLInputElement, LabeledImageFieldProps>(
  ({ name, label, helperText, outerProps, ...props }, ref) => {
    const {
      input: { value, onChange, ...input },
      meta: { touched, error, submitError, submitting },
    } = useField(name)

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError
    const { size, ...propsWithoutSize } = props

    return (
      <FormControl
        {...outerProps}
        isInvalid={touched && normalizedError}
        isRequired={props.required}
      >
        <FormLabel fontSize="xs" mb={1}>
          {label}
        </FormLabel>
        <Input
          {...input}
          type="file"
          onChange={({ target }) => onChange(target.files)}
          disabled={submitting}
          {...propsWithoutSize}
          ref={ref}
          border="none"
          p={0}
          borderRadius={0}
        />
        <FormHelperText fontSize="xs">{helperText}</FormHelperText>
        <FormErrorMessage>{normalizedError}</FormErrorMessage>
      </FormControl>
    )
  }
)

export default LabeledImageField
