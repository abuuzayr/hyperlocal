import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateListing = z
  .object({
    id: z.string(),
    name: z.string(),
    category: z.string(),
    tagline: z.string().max(80),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(UpdateListing), async ({ id, ...data }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const listing = await db.listing.update({ where: { id }, data })

  return listing
})
