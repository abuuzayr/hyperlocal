import { BlitzPage, useRouterQuery } from "blitz"
import { useState, useEffect } from "react"
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
  const query = useRouterQuery()
  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    if (query?.add && query?.add === "listing") disclosure.onOpen()
  }, [query])
  return (
    <>
      <Navbar onAddOpen={disclosure.onOpen} />
      <div className="container">
        <Hero />
        <Categories toggle={toggle} />
        <GridComponent toggle={toggle} />
        <Section onAddOpen={disclosure.onOpen} />
      </div>
      <Footer />
      <Add {...disclosure} toggle={toggle} setToggle={setToggle} />
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
