import { useEffect } from "react"
import { useRouter } from "blitz"
import Error from "app/core/components/Error"

const ErrorRedirectHome = ({ statusCode, title }) => {
  const router = useRouter()
  useEffect(() => {
    if (router.query && !router.query.retry) {
      window.location.replace("/?retry=1")
    }
  }, [])
  return (
    <Error
      statusCode={statusCode}
      title={title}
      text={
        router.query && !router.query.retry ? "Hang on, we're reloading the page for you.." : ""
      }
    ></Error>
  )
}

export default ErrorRedirectHome
