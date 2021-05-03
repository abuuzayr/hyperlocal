import { useRef } from "react"
import { useMutation, useQuery } from "blitz"
import { useToast, Button } from "@chakra-ui/react"
import deleteListing from "app/listings/mutations/deleteListing"

const DeleteButton = (props) => {
  const { onDelete, listingId } = props
  const toast = useToast()
  const [deleteListingMutation] = useMutation(deleteListing)

  return (
    <Button
      onClick={async () => {
        if (window.confirm("This listing will be deleted permanently")) {
          onDelete()
          await deleteListingMutation({ id: listingId })
          toast({
            title: "Listing successfully deleted.",
            status: "warning",
            duration: 6000,
            isClosable: true,
          })
        }
      }}
      variant="ghost"
      color="orange.500"
      borderColor="orange.500"
      mt={2}
      float="right"
      _hover={{
        bg: "orange.500",
        color: "white",
      }}
    >
      Delete
    </Button>
  )
}

export default DeleteButton
