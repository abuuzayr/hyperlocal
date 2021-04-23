import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getListings from "app/listings/queries/getListings"

const ITEMS_PER_PAGE = 100

export const ListingsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ listings, hasMore }] = usePaginatedQuery(getListings, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {listings.map((listing) => (
          <li key={listing.id}>
            {/* <Link href={Routes.ShowListingPage({ [listingId]: listing.id })}>
              <a>{listing.name}</a>
            </Link> */}
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ListingsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Listings</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewListingPage()}>
            <a>Create Listing</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ListingsList />
        </Suspense>
      </div>
    </>
  )
}

ListingsPage.authenticate = true
ListingsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ListingsPage
