import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createListing from "app/listings/mutations/createListing"
import { ListingForm, FORM_ERROR } from "app/listings/components/ListingForm"

const NewListingPage: BlitzPage = () => {
  const router = useRouter()
  const [createListingMutation] = useMutation(createListing)

  return (
    <div>
      <h1>Create New Listing</h1>

      <ListingForm
        submitText="Create Listing"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateListing}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const listing = await createListingMutation(values)
            router.push(`/listings/${listing.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.ListingsPage()}>
          <a>Listings</a>
        </Link>
      </p>
    </div>
  )
}

NewListingPage.authenticate = true
NewListingPage.getLayout = (page) => <Layout title={"Create New Listing"}>{page}</Layout>

export default NewListingPage
