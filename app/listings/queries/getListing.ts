import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetListing = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetListing), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const listing = await db.listing.findFirst({ where: { id } })

  if (!listing) throw new NotFoundError()

  return listing
})
