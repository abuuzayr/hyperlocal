import { Document, Html, DocumentHead, Main, BlitzScript /*DocumentContext*/ } from "blitz"
import { ColorModeScript } from "@chakra-ui/react"
import { theme } from "./_app"

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }

  render() {
    return (
      <Html lang="en">
        <DocumentHead />
        <body>
          <ColorModeScript initialColorMode={theme.initialColorMode} />
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
