import axios from "axios"
import { getAntiCSRFToken } from "blitz"

export default async function uploadImage(file, toast) {
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
