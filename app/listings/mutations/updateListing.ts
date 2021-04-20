import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateListing = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateListing),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const listing = await db.listing.update({ where: { id }, data })

    return listing
  }
)
