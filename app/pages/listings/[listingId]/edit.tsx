import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getListing from "app/listings/queries/getListing"
import updateListing from "app/listings/mutations/updateListing"
import { ListingForm, FORM_ERROR } from "app/listings/components/ListingForm"

export const EditListing = () => {
  const router = useRouter()
  const listingId = useParam("listingId", "string")
  const [listing, { setQueryData }] = useQuery(getListing, { id: listingId })
  const [updateListingMutation] = useMutation(updateListing)

  return (
    <>
      <Head>
        <title>Edit Listing {listing.id}</title>
      </Head>

      <div>
        <h1>Edit Listing {listing.id}</h1>
        <pre>{JSON.stringify(listing)}</pre>

        <ListingForm
          submitText="Update Listing"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateListing}
          initialValues={listing}
          onSubmit={async (values) => {
            try {
              const updated = await updateListingMutation({
                id: listing.id,
                ...values,
              })
              await setQueryData(updated)
              // router.push(Routes.ShowListingPage({ [listingId]: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditListingPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditListing />
      </Suspense>

      <p>
        <Link href={Routes.ListingsPage()}>
          <a>Listings</a>
        </Link>
      </p>
    </div>
  )
}

EditListingPage.authenticate = true
EditListingPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditListingPage
