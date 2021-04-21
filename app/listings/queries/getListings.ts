import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetListingsInput
  extends Pick<Prisma.ListingFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(async ({ where, orderBy, skip = 0, take = 100 }: GetListingsInput) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const { items: listings, hasMore, nextPage, count } = await paginate({
    skip,
    take,
    count: () => db.listing.count({ where }),
    query: (paginateArgs) => db.listing.findMany({ ...paginateArgs, where, orderBy }),
  })

  return {
    listings,
    nextPage,
    hasMore,
    count,
  }
})
