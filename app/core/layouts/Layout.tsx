import { ReactNode } from "react"
import { Head } from "blitz"
import Navbar from "app/core/components/Navbar"
import Footer from "app/core/components/Footer"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>
          {title
            ? `${title} | hyperlocal.sg`
            : "hyperlocal.sg - Awesome stuff made by Singaporeans"}
        </title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default Layout
