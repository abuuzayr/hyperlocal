import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteListing = z
  .object({
    id: z.string(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeleteListing), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const listing = await db.listing.deleteMany({ where: { id } })

  return listing
})
