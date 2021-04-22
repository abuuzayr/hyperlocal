import { useRef } from "react"
import { useMutation } from "blitz"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from "@chakra-ui/react"
import { ListingForm } from "app/listings/components/ListingForm"
import createListing from "app/listings/mutations/createListing"
import { FORM_ERROR } from "app/core/components/Form"
import { CreateListing } from "app/auth/validations"

const Add = (props) => {
  const { isOpen, onClose } = props
  const toast = useToast()
  const [createListingMutation] = useMutation(createListing)

  const initialRef = useRef<HTMLInputElement>(null)

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new listing</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <ListingForm
            schema={CreateListing}
            initialValues={{ namep: "" }}
            onSubmit={async (values) => {
              try {
                await createListingMutation(values)
                onClose()
                toast({
                  title: "Listing created.",
                  description: "Thank you for your contribution!",
                  status: "success",
                  duration: 6000,
                  isClosable: true,
                })
              } catch (error) {
                return { [FORM_ERROR]: error.toString() }
              }
            }}
          />
          <Button onClick={onClose} mt={2}>
            Cancel
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Add
