import { forwardRef, PropsWithoutRef } from "react"
import { useField } from "react-final-form"
import { FormControl, FormLabel, Input, FormErrorMessage, FormHelperText } from "@chakra-ui/react"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Helper text. */
  helperText?: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  visibility?: string
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, helperText, outerProps, visibility, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse: props.type === "number" ? Number : undefined,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    let setVisibility = {}
    if (visibility === "hidden") {
      setVisibility = {
        visibility: "hidden",
        position: "absolute",
        marginLeft: -90210,
      }
    }

    return (
      <FormControl
        {...outerProps}
        isInvalid={touched && normalizedError}
        isRequired={props.required}
        {...setVisibility}
      >
        <FormLabel fontSize="xs" mb={1}>
          {label}
        </FormLabel>
        <Input {...input} disabled={submitting} {...props} ref={ref} />
        <FormHelperText fontSize="xs">{props.helperText}</FormHelperText>
        <FormErrorMessage>{normalizedError}</FormErrorMessage>
      </FormControl>
    )
  }
)

export default LabeledTextField
