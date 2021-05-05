import { useRef } from "react"
import { useMutation, useQuery } from "blitz"
import { useToast, Text } from "@chakra-ui/react"
import { ListingForm, FORM_ERROR } from "app/listings/components/ListingForm"
import updateListing from "app/listings/mutations/updateListing"
import { CreateOrUpdateListing } from "app/auth/validations"
import uploadImage from "app/core/utils/uploadImage"
import getListing from "app/listings/queries/getListing"

const Edit = (props) => {
  const { onCloseAndClear, toggle, setToggle, listingId } = props
  const toast = useToast()
  const [listing, { setQueryData }] = useQuery(getListing, { id: listingId })
  const [updateListingMutation] = useMutation(updateListing)
  const initialRef = useRef<HTMLInputElement>(null)
  const cleanListing = Object.keys(listing).reduce((obj, value) => {
    if (!listing[value] || ["img", "logo", "createdAt", "updatedAt", "likes"].includes(value))
      return obj
    return {
      ...obj,
      [value]: listing[value],
    }
  }, {})

  return (
    <ListingForm
      submitText="Update"
      schema={CreateOrUpdateListing}
      initialValues={{ ...cleanListing, namep: "" }}
      onSubmit={async (values) => {
        const { img: imgFileList, logo: logoFileList } = values
        if (imgFileList) {
          const { filename, imgHeight } = await uploadImage(imgFileList[0], 400, toast)
          if (!filename) return
          values["img"] = `${process.env.NEXT_PUBLIC_CF_WORKER_URL}/${filename}`.replace(/\s/g, "+")
          values["imgHeight"] = imgHeight
        }
        if (logoFileList) {
          const { filename } = await uploadImage(logoFileList[0], 100, toast)
          if (!filename) return
          values["logo"] = `${process.env.NEXT_PUBLIC_CF_WORKER_URL}/${filename}`.replace(
            /\s/g,
            "+"
          )
        }
        try {
          const { namep, ...valuesWithoutHoneypot } = values
          const updated = await updateListingMutation({ id: listingId, ...valuesWithoutHoneypot })
          onCloseAndClear()
          toast({
            title: "Listing updated.",
            description: "Thank you very much!",
            status: "success",
            duration: 6000,
            isClosable: true,
          })
          setToggle(!toggle)
          await setQueryData(updated)
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
  )
}

export default Edit
