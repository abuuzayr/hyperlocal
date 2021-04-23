import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateListing = z
  .object({
    name: z.string(),
    category: z.string(),
    tagline: z.string().max(80),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateListing), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const listing = await db.listing.create({ data: input })

  return listing
})
