import { BlitzPage, useRouterQuery } from "blitz"
import { useState } from "react"
import { useDisclosure } from "@chakra-ui/react"
import Layout from "app/core/layouts/Layout"
import Hero from "app/core/components/Hero"
import Categories from "app/core/components/Categories"
import GridComponent from "app/core/components/Grid"
import Section from "app/core/components/Section"
import ListingModal from "app/core/components/ListingModal"
import { useIsomorphicLayoutEffect } from "app/core/hooks/useIsomorphicLayoutEffect"

const Home: BlitzPage = () => {
  const disclosure = useDisclosure()
  const query = useRouterQuery()
  const [toggle, setToggle] = useState(false)
  useIsomorphicLayoutEffect(() => {
    if (
      (query?.add && query?.add === "listing") ||
      (query?.edit && parseInt(query?.edit as string))
    ) {
      if (!disclosure.isOpen) disclosure.onOpen()
    }
  }, [query])
  return (
    <>
      <div className="container">
        <Hero />
        <Categories toggle={toggle} />
        <GridComponent toggle={toggle} />
        <Section onAddOpen={disclosure.onOpen} />
      </div>
      <ListingModal {...disclosure} toggle={toggle} setToggle={setToggle} />
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
