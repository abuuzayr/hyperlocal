import { useRef, Suspense } from "react"
import { useRouter } from "blitz"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  Spinner,
  HStack,
} from "@chakra-ui/react"
import Add from "app/core/components/Add"
import Edit from "app/core/components/Edit"
import DeleteButton from "app/core/components/DeleteButton"

const ListingModal = (props) => {
  const { isOpen, onClose } = props
  const toast = useToast()
  const router = useRouter()
  const initialRef = useRef<HTMLInputElement>(null)

  const CREATE = router.query?.add && router.query?.add === "listing"
  const UPDATE = router.query?.edit

  const onCloseAndClear = () => {
    onClose()
    if (router.query?.add || router.query?.edit) {
      router.push("/", undefined, { shallow: true })
    }
  }

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onCloseAndClear} size={"xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton position="absolute" right={3} top={3} />
        <ModalHeader>{CREATE ? "Add a new listing" : "Edit listing"}</ModalHeader>
        <ModalBody pb={6}>
          {CREATE && <Add {...props} toast={toast} onCloseAndClear={onCloseAndClear} />}
          {UPDATE && (
            <WrappedEdit
              {...props}
              toast={toast}
              onCloseAndClear={onCloseAndClear}
              listingId={UPDATE}
            />
          )}
          <Button onClick={onCloseAndClear} mt={2}>
            Cancel
          </Button>
          {UPDATE && (
            <DeleteButton listingId={UPDATE} onDelete={() => onClose() && router.push("/")} />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const WrappedEdit = (props) => (
  <Suspense
    fallback={
      <HStack w={"100%"}>
        <Spinner mx="auto" />
      </HStack>
    }
  >
    <Edit {...props} />
  </Suspense>
)

export default ListingModal
