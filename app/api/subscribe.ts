import { getSession } from "blitz"
import axios from "axios"

const subscribe = async (req, res) => {
  try {
    await getSession(req, res)
    if (req.method === "POST") {
      if (!(req.body && req.body.email)) {
        res.status(400).end(`Please provide an email address`)
      }
      try {
        const subscribed = await axios.post(
          `https://emailoctopus.com/api/1.5/lists/91bd0a9b-a6fe-11eb-a3d0-06b4694bee2a/contacts`,
          {
            api_key: process.env.EMAILOCTOPUS_API_KEY,
            email_address: req.body.email,
          }
        )
        res.status(200).end("Email subscribed!")
      } catch (e) {
        if (e.response.status === 409) {
          res.status(409).end(e?.response?.data?.error?.message)
        } else {
          res.status(400).end(JSON.stringify(e?.response?.data))
        }
      }
    } else {
      // Handle any other HTTP method
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (e) {
    console.log(e)
    res.status(401).end("Not allowed")
  }
}

export default subscribe
