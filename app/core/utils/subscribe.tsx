import axios from "axios"
import { getAntiCSRFToken } from "blitz"

export default async function subscribe(email, toast) {
  const antiCSRFToken = getAntiCSRFToken()
  if (antiCSRFToken) {
    try {
      const subscribed = await axios.post(
        "/api/subscribe",
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "anti-csrf": antiCSRFToken,
          },
          validateStatus: function (status) {
            return (status >= 200 && status < 300) || status === 409
          },
        }
      )
      if (subscribed.status === 409) {
        toast({
          title: "Email exists",
          description: `This email is already subscribed. Please check your spam inbox for the confirmation email if you have not confirmed your email.`,
          status: "warning",
          duration: 6000,
          isClosable: true,
        })
        return false
      }
      toast({
        title: "Email subscribed!",
        description: `Thank you for subscribing! Please check your inbox or spam for the confirmation email in a short while.`,
        status: "success",
        duration: 6000,
        isClosable: true,
      })
      return true
    } catch (e) {
      toast({
        title: "Subscription error",
        description: `Error adding email, please try again`,
        status: "error",
        duration: 6000,
        isClosable: true,
      })
      return false
    }
  }
}
