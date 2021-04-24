import { getSession } from "blitz"
import axios from "axios"
import formidable from "formidable-serverless"
import fs from "fs"
import hasha from "hasha"

export const config = {
  api: {
    bodyParser: false,
  },
}

const uploadImage = async (req, res) => {
  try {
    await getSession(req, res)
    if (req.method === "POST") {
      const form = new formidable.IncomingForm()
      return new Promise<void>((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
          const imgObj = files["image"]
          try {
            console.log(
              "authObjURL: ",
              `https://${process.env.BUCKET_ID}:${process.env.BUCKET_KEY}@api.backblazeb2.com/b2api/v2/b2_authorize_account`
            )
            const authObj = await axios.get(
              `https://${process.env.BUCKET_ID}:${process.env.BUCKET_KEY}@api.backblazeb2.com/b2api/v2/b2_authorize_account`
            )
            console.log("authObj: ", authObj)
            console.log(
              "uploadUrlObj URL: ",
              `${authObj["data"]["apiUrl"]}/b2api/v2/b2_get_upload_url`
            )

            const uploadUrlObj = await axios.post(
              `${authObj["data"]["apiUrl"]}/b2api/v2/b2_get_upload_url`,
              { bucketId: authObj["data"]["allowed"]["bucketId"] },
              {
                headers: {
                  Authorization: authObj["data"]["authorizationToken"],
                },
              }
            )
            console.log("uploadUrlObj: ", uploadUrlObj)
            const fileHash = await hasha.fromFile(imgObj["path"], {
              algorithm: "sha1",
            })
            const uploadedObj = await axios({
              url: uploadUrlObj["data"]["uploadUrl"],
              method: "POST",
              data: fs.readFileSync(imgObj["path"]),
              headers: {
                Authorization: uploadUrlObj["data"]["authorizationToken"],
                "X-Bz-File-Name": imgObj["name"],
                "Content-Type": imgObj["type"],
                "Content-Length": imgObj["size"] + 40,
                "X-Bz-Content-Sha1": fileHash,
              },
            })
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.end(
              `${authObj["data"]["apiUrl"]}/b2api/v2/b2_download_file_by_id?fileId=${uploadedObj["data"]["fileId"]}`
            )
            resolve()
          } catch (e) {
            console.log(e)
            res.status(400).end(e)
            reject()
          }
        })
      })
    } else {
      // Handle any other HTTP method
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (CSRFTokenMismatchError) {
    res.status(401).end("Not allowed")
  }
}

export default uploadImage
