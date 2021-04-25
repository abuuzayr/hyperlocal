import { useLayoutEffect } from "react"
import {
  AppProps,
  ErrorComponent,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  Head,
} from "blitz"
import { ErrorBoundary } from "react-error-boundary"
import LoginForm from "app/auth/components/LoginForm"

import { ChakraProvider, extendTheme, Box, BoxProps } from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import "@fontsource/inter/400.css"
import "@fontsource/inter/700.css"
import "@fontsource/libre-franklin/700.css"

import { usePanelbear } from "app/core/hooks/usePanelbear"

export const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  fonts: {
    heading: "Libre Franklin",
    body: "Inter",
  },
  scrollBehavior: "smooth",
})
const MotionBox = motion.custom<BoxProps>(Box)

export default function App({ Component, pageProps, router }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const { reset } = useQueryErrorResetBoundary()
  // Load Panelbear only once during the app lifecycle
  usePanelbear(process.env.NEXT_PUBLIC_PANELBEAR_SITE_ID, {})

  useLayoutEffect(() => {
    // @ts-ignore
    window.$crisp = []
    // @ts-ignore
    window.CRISP_WEBSITE_ID = "95d50119-42ab-4fdb-b6d6-9142ed39684c"
    let d = document
    let s = d.createElement("script")

    s.src = "https://client.crisp.chat/l.js"
    // @ts-ignore
    s.async = 1
    d.getElementsByTagName("head")[0].appendChild(s)
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>hyperlocal.sg - Awesome stuff made by Singaporeans</title>
        <meta
          name={"description"}
          content={
            "hyperlocal.sg - Awesome apps, services, products and communities made by Singaporeans"
          }
        />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <AnimatePresence initial={false} exitBeforeEnter>
        <MotionBox
          as="main"
          animate="enter"
          exit="exit"
          flexGrow={1}
          initial="initial"
          key={router.route}
          variants={{
            initial: { opacity: 0, y: -50 },
            enter: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 50 },
          }}
        >
          <ErrorBoundary
            FallbackComponent={RootErrorFallback}
            resetKeys={[router.asPath]}
            onReset={reset}
          >
            {getLayout(<Component {...pageProps} />)}
          </ErrorBoundary>
        </MotionBox>
      </AnimatePresence>
    </ChakraProvider>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
