import { resolver } from "blitz"
import db, { Prisma } from "db"

interface GetListingsInput extends Pick<Prisma.ListingFindManyArgs, "where"> {}

export default resolver.pipe(async ({ where }: GetListingsInput) => {
  return db.listing.count({ where })
})
