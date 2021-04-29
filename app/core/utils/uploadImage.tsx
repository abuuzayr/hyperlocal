import axios from "axios"
import { getAntiCSRFToken } from "blitz"

const getHeightWidth = (img, width) => {
  if (width && width > 0) {
    const ratio = img.naturalWidth / width
    return { width, height: Math.round((img.naturalHeight / ratio + Number.EPSILON) * 100) / 100 }
  }
  return { width: img.naturalWidth, height: img.naturalHeight }
}

// code below is from: https://github.com/alefduarte/image-resize-compress/blob/master/src/fromBlob.js
const fromBlob = (imgBlob, width) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(imgBlob)
    reader.onload = () => {
      const img = new Image()
      img.src = (reader.result as string) || ""
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const size = getHeightWidth(img, width)
        canvas.width = size.width
        canvas.height = size.height
        canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height)
        canvas.toBlob(
          (blob) =>
            resolve(
              // @ts-ignore
              new Blob([blob], {
                type: "image/webp",
              })
            ),
          "image/webp",
          80
        )
      }
    }
  })
}

export default async function uploadImage(file, width, toast) {
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
    const blob: any = await fromBlob(file, width)
    var formData = new FormData()
    const filename = `${new Date().getTime()}_${encodeURI(file["name"])}`
    formData.append("image", blob, filename)
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
