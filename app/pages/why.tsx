import { BlitzPage, useRouter } from "blitz"
import { Heading, Container, Text } from "@chakra-ui/react"
import Layout from "app/core/layouts/Layout"
import Navbar from "app/core/components/Navbar"
import Footer from "app/core/components/Footer"

const Why: BlitzPage = () => {
  const router = useRouter()
  return (
    <>
      <Navbar onAddOpen={() => {}} />
      <div className="container">
        <Container textAlign="center" py={10}>
          <Heading>Why, hello there, stranger!</Heading>
          <Text>Are you lost? Because I sure as hell am...</Text>
        </Container>
      </div>
      <Footer />
    </>
  )
}

Why.suppressFirstRenderFlicker = true
Why.getLayout = (page) => <Layout title="Why">{page}</Layout>

export default Why
