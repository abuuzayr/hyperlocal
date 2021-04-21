import { Suspense } from "react"
import { useQuery, useRouter, useRouterQuery } from "blitz"
import {
  Container,
  Stack,
  Box,
  SkeletonCircle,
  SkeletonText,
  Center,
  useColorModeValue,
} from "@chakra-ui/react"
import Card from "app/core/components/Card"
import getListings from "app/listings/queries/getListings"

const GridSkeleton = () => {
  return (
    <>
      {Array(...Array(12)).map((v, i) => (
        <Center py={0} d="inline-block" maxW={"445px"} w={"full"} key={v}>
          <Box
            p={6}
            overflow={"hidden"}
            bg={"white"}
            boxShadow={"2xl"}
            rounded={"md"}
            mb={4}
            h={300}
          >
            <SkeletonCircle size="20" mx={"auto"} my={10} />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
        </Center>
      ))}
    </>
  )
}

const GridComponentWithQuery = (props) => {
  const query = useRouterQuery()
  const where = {}
  if (query.category) {
    where["category"] = query.category
  }
  if (query.search) {
    where["OR"] = [
      {
        tags: {
          contains: query.search,
          mode: "insensitive",
        },
      },
      {
        name: {
          contains: query.search,
          mode: "insensitive",
        },
      },
      {
        tagline: {
          contains: query.search,
          mode: "insensitive",
        },
      },
    ]
  }
  const [{ listings }] = useQuery(getListings, { where, orderBy: [], skip: 0, take: 12 })

  return <>{listings && listings.map((card) => <Card data={card} />)}</>
}

const WrappedGridComponent = (props) => (
  <Suspense fallback={<GridSkeleton />}>
    <GridComponentWithQuery {...props} />
  </Suspense>
)

const GridComponent = () => (
  <Container as={Stack} maxW={"7xl"} py={10}>
    <Box w="100%" mx="auto" sx={{ columnCount: [1, 2, 4], columnGap: "1.5rem" }}>
      <WrappedGridComponent />
    </Box>
  </Container>
)

export default GridComponent
