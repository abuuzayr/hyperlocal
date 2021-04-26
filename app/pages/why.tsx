import { BlitzPage, useRouter } from "blitz"
import { Heading, Container, Text } from "@chakra-ui/react"
import Layout from "app/core/layouts/Layout"

const Why: BlitzPage = () => {
  const router = useRouter()
  return (
    <>
      <div className="container">
        <Container textAlign="center" py={10}>
          <Heading>Why, hello there, stranger!</Heading>
          <Text>Are you lost? Because I sure as hell am...</Text>
        </Container>
      </div>
    </>
  )
}

Why.suppressFirstRenderFlicker = true
Why.getLayout = (page) => <Layout title="Why">{page}</Layout>

export default Why
