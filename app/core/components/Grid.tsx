import { Suspense, useRef, useEffect, useState, Fragment } from "react"
import { useInfiniteQuery, useRouterQuery } from "blitz"
import {
  Container,
  Stack,
  Box,
  SkeletonCircle,
  SkeletonText,
  Center,
  Spinner,
  Button,
  Icon,
} from "@chakra-ui/react"
import { IoInfiniteOutline } from "react-icons/io5"
import Card from "app/core/components/Card"
import getListings from "app/listings/queries/getListings"

const GridSkeleton = () => {
  return (
    <>
      {Array(...Array(12)).map((v, i) => (
        <Center py={0} d="inline-block" maxW={"445px"} w={"full"} key={i}>
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

const GridComponentWithQuery = ({ toggle }) => {
  const query = useRouterQuery()
  const where = {}
  if (
    query.category &&
    ["products", "services", "app", "community"].includes(query.category as string)
  ) {
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

  const [
    listingPages,
    { isFetchingNextPage, fetchNextPage, hasNextPage, refetch },
  ] = useInfiniteQuery(getListings, (page = { take: 25, skip: 0, where }) => page, {
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })

  useEffect(() => {
    refetch()
  }, [toggle])

  interface SX {
    columnCount?: number[]
    columnGap?: string
    display?: string | string[]
    gridTemplateColumns?: string
    gap?: string
  }
  let sx: SX = { columnCount: [1, 2, 4], columnGap: "1.5rem" }
  if (listingPages[0].count <= 4) {
    sx = { display: ["block", "grid"], gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }
  }

  return (
    <>
      {listingPages && (
        <>
          <Box w="100%" mx="auto" sx={sx}>
            {listingPages.map((page, i) => (
              <Fragment key={i}>
                {page.listings.map((card) => (
                  <Card data={card} key={card.id} />
                ))}
              </Fragment>
            ))}
          </Box>
          <Box textAlign="center">
            {isFetchingNextPage ? (
              <Spinner />
            ) : hasNextPage ? (
              <Button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || !!isFetchingNextPage}
                colorScheme="red"
                variant="outline"
                borderRadius={0}
                border="none"
                _hover={{
                  bg: "red.100",
                }}
              >
                <Icon as={IoInfiniteOutline} mr={2} boxSize={25} />
                Load more cards
              </Button>
            ) : null}
          </Box>
        </>
      )}
    </>
  )
}

const WrappedGridComponent = (props) => (
  <Suspense fallback={<GridSkeleton />}>
    <GridComponentWithQuery {...props} />
  </Suspense>
)

const GridComponent = (props) => {
  const [scrolled, setScrolled] = useState(false)
  const gridRef = useRef(null)
  const query = useRouterQuery()
  useEffect(() => {
    if (scrolled) return
    if (query.hasOwnProperty("category") && gridRef && gridRef.current) {
      window.scrollTo({
        top: gridRef?.current?.["offsetTop"],
        left: 0,
        behavior: "smooth",
      })
      setScrolled(true)
    }
  }, [gridRef])
  return (
    <div ref={gridRef}>
      <Container as={Stack} maxW={"7xl"} py={10} id="listings-grid">
        <WrappedGridComponent {...props} />
      </Container>
    </div>
  )
}

export default GridComponent
