import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(async ({ where }) => {
  return db.listing.count({ where })
})
