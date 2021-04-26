import { useEffect } from "react"
import { useRouter } from "blitz"
import Error from "app/core/components/Error"

const ErrorRedirectHome = ({ statusCode, title }) => {
  const router = useRouter()
  useEffect(() => {
    if (router.query && !router.query.retry) router.push("/?retry=1")
  }, [])
  return <Error statusCode={statusCode} title={title}></Error>
}

export default ErrorRedirectHome
