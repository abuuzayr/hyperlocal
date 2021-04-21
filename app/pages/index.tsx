import { BlitzPage } from "blitz"
import { useDisclosure } from "@chakra-ui/react"
import Layout from "app/core/layouts/Layout"
import Hero from "app/core/components/Hero"
import Navbar from "app/core/components/Navbar"
import Footer from "app/core/components/Footer"
import Categories from "app/core/components/Categories"
import GridComponent from "app/core/components/Grid"
import Section from "app/core/components/Section"
import Add from "app/core/components/Add"

const Home: BlitzPage = () => {
  const disclosure = useDisclosure()
  return (
    <>
      <Navbar onAddOpen={disclosure.onOpen} />
      <div className="container">
        <Hero />
        <Categories />
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
