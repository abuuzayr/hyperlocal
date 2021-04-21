import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes, invokeWithMiddleware } from "blitz"
import { useDisclosure } from "@chakra-ui/react"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import Hero from "app/core/components/Hero"
import Navbar from "app/core/components/Navbar"
import Footer from "app/core/components/Footer"
import Categories from "app/core/components/Categories"
import GridComponent from "app/core/components/Grid"
import Section from "app/core/components/Section"
import Add from "app/core/components/Add"

import getListingCount from "app/listings/queries/getListingCount"

export async function getServerSideProps({ params, req, res }) {
  const counts = {}
  await Promise.all(
    ["product", "service", "app", "community"].map(async (category) => {
      counts[category] = await invokeWithMiddleware(
        getListingCount,
        { where: { category } },
        { req, res }
      )
    })
  )
  return {
    props: {
      counts,
    },
  }
}

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = ({ counts }) => {
  const disclosure = useDisclosure()
  return (
    <>
      <Navbar onAddOpen={disclosure.onOpen} />
      <div className="container">
        <Hero />
        <Categories counts={counts} />
        <GridComponent />
        <Section onAddOpen={disclosure.onOpen} />
      </div>
      <Footer />
      <Add {...disclosure} />
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
