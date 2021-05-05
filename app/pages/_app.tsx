import {
  AppProps,
  AuthenticationError,
  AuthorizationError,
  CSRFTokenMismatchError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  Head,
} from "blitz"
import { ErrorBoundary } from "react-error-boundary"
import LoginForm from "app/auth/components/LoginForm"
import ErrorRedirectHome from "app/core/components/ErrorRedirectHome"
import Error from "app/core/components/Error"
import { useIsomorphicLayoutEffect } from "app/core/hooks/useIsomorphicLayoutEffect"

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

  useIsomorphicLayoutEffect(() => {
    // @ts-ignore
    window.$crisp = []
    // @ts-ignore
    window.CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID
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
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
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
        <meta name="application-name" content="hyperlocal.sg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="hyperlocal.sg" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-tap-highlight" content="no" />

        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.png" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://hyperlocal.sg" />
        <meta name="twitter:title" content="hyperlocal.sg" />
        <meta
          name="twitter:description"
          content="Awesome apps, services, products and communities made by Singaporeans"
        />
        <meta name="twitter:image" content="https://hyperlocal.sg/social.png" />
        <meta name="twitter:creator" content="@DavidWShadow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="hyperlocal.sg" />
        <meta
          property="og:description"
          content="Awesome apps, services, products and communities made by Singaporeans"
        />
        <meta property="og:site_name" content="hyperlocal.sg" />
        <meta property="og:url" content="https://hyperlocal.sg" />
        <meta property="og:image" content="https://hyperlocal.sg/social.png" />
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
      <Error statusCode={error.statusCode} title="Sorry, you are not authorized to access this" />
    )
  } else if (error instanceof CSRFTokenMismatchError) {
    return (
      <ErrorRedirectHome statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  } else {
    return <Error statusCode={error.statusCode || 400} title={error.message || error.name} />
  }
}
