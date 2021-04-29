import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getListing from "app/listings/queries/getListing"
import deleteListing from "app/listings/mutations/deleteListing"

export const Listing = () => {
  const router = useRouter()
  const listingId = useParam("listingId", "string")
  const [deleteListingMutation] = useMutation(deleteListing)
  const [listing] = useQuery(getListing, { id: listingId })

  return (
    <>
      <Head>
        <title>Listing {listing.id}</title>
      </Head>

      <div>
        <h1>Listing {listing.id}</h1>
        <pre>{JSON.stringify(listing, null, 2)}</pre>

        {/* <Link href={Routes.EditListingPage({ [listingId]: listing.id })}>
          <a>Edit</a>
        </Link> */}

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteListingMutation({ id: listing.id })
              router.push(Routes.ListingsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowListingPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ListingsPage()}>
          <a>Listings</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Listing />
      </Suspense>
    </div>
  )
}

ShowListingPage.authenticate = true
ShowListingPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowListingPage
