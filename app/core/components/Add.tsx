import axios from "axios"
import { useRef } from "react"
import { useMutation, getAntiCSRFToken } from "blitz"
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
  const { isOpen, onClose, toggle, setToggle } = props
  const toast = useToast()
  const [createListingMutation] = useMutation(createListing)
  const initialRef = useRef<HTMLInputElement>(null)
  const uploadImage = async (file) => {
    if (file.size / 1024 > 5000) {
      toast({
        title: "Size error",
        description: "File size exceeds 5MB, please select another file",
        status: "error",
        duration: 6000,
        isClosable: true,
      })
      return false
    }
    toast({
      title: `Uploading ${file["name"]}...`,
      status: "info",
      isClosable: true,
    })
    const antiCSRFToken = getAntiCSRFToken()
    if (antiCSRFToken) {
      var formData = new FormData()
      const filename = `${new Date().getTime()}_${encodeURI(file["name"])}`
      formData.append("image", file, filename)
      try {
        const imageUrl = await axios.post("/api/uploadImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "anti-csrf": antiCSRFToken,
          },
        })
        if (imageUrl) {
          toast.closeAll()
          return filename
        }
      } catch (e) {
        toast({
          title: "File upload error",
          description: `Error uploading ${file["name"]}, please try again`,
          status: "error",
          duration: 6000,
          isClosable: true,
        })
        return false
      }
    }
  }

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new listing</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <ListingForm
            submitText="Add"
            schema={CreateListing}
            initialValues={{ namep: "" }}
            onSubmit={async (values) => {
              const { img: imgFileList, logo: logoFileList } = values
              if (imgFileList) {
                const filename = await uploadImage(imgFileList[0])
                if (!filename) return
                values["img"] = `${process.env.CF_WORKER_URL}/${filename}`.replace(/\s/g, "+")
              }
              if (logoFileList) {
                const filename = await uploadImage(logoFileList[0])
                if (!filename) return
                values["logo"] = `${process.env.CF_WORKER_URL}/${filename}`.replace(/\s/g, "+")
              }
              try {
                const { namep, ...valuesWithoutHoneypot } = values
                await createListingMutation(valuesWithoutHoneypot)
                onClose()
                toast({
                  title: "Listing created.",
                  description: "Thank you for your contribution!",
                  status: "success",
                  duration: 6000,
                  isClosable: true,
                })
                setToggle(!toggle)
              } catch (error) {
                if (error.code === "P2002" && error.meta?.target?.includes("name")) {
                  // This error comes from Prisma
                  return {
                    name: `Name already exists for the category`,
                  }
                } else {
                  return { [FORM_ERROR]: error.toString() }
                }
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
