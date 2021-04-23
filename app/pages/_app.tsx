import {
  AppProps,
  ErrorComponent,
  useRouter,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from "blitz"
import { ErrorBoundary } from "react-error-boundary"
import LoginForm from "app/auth/components/LoginForm"

import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import "@fontsource/inter/400.css"
import "@fontsource/inter/700.css"
import "@fontsource/libre-franklin/700.css"

import { usePanelbear } from "app/core/hooks/usePanelbear"

const theme = extendTheme({
  fonts: {
    heading: "Libre Franklin",
    body: "Inter",
  },
  scrollBehavior: "smooth",
})

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()
  const { reset } = useQueryErrorResetBoundary()
  // Load Panelbear only once during the app lifecycle
  usePanelbear(process.env.NEXT_PUBLIC_PANELBEAR_SITE_ID, {})

  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary
        FallbackComponent={RootErrorFallback}
        resetKeys={[router.asPath]}
        onReset={reset}
      >
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
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
