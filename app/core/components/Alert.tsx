import { useRef } from "react"
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
  AlertDialogContent,
  Text,
} from "@chakra-ui/react"

const alerts = {
  edit: [
    "Edit a listing",
    "You may edit a listing by clicking on the edit button on the bottom left corner of a listing card. You may only edit listings on the same browser that it was created on.",
    "If you do however need to edit a listing and you are not its creator, do drop us a note in the chat with the details to change.",
  ],
  delete: [
    "Delete a listing",
    "You may edit a listing by clicking on the edit button on the bottom left corner of a listing card, and then clicking on the Delete button on the botton right of the modal that appears. You may only delete listings on the same browser that it was created on.",
    "If you do however need to delete a listing and you are not its creator, do drop us a note in the chat with the listing to delete.",
  ],
}

const Alert = ({ alertText, setAlertText }) => {
  const okRef = useRef(null)
  const text = alerts[alertText] || []

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={okRef}
      onClose={() => setAlertText("")}
      isOpen={alertText}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{text[0]}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          {text.slice(1, text.length).map((t) => (
            <Text mt={2}>{t}</Text>
          ))}
        </AlertDialogBody>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Alert
