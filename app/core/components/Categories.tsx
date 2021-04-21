import { Suspense } from "react"
import { useRouter, useRouterQuery, useQuery, Link } from "blitz"
import {
  Box,
  Icon,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
} from "@chakra-ui/react"
import { Search2Icon } from "@chakra-ui/icons"
import { DebounceInput } from "react-debounce-input"
import { IconType } from "react-icons"
import { FiShoppingBag } from "react-icons/fi"
import { FaRegHandSpock } from "react-icons/fa"
import { RiAppsLine } from "react-icons/ri"
import { BsPeople } from "react-icons/bs"
import getListingCount from "app/listings/queries/getListingCount"

interface StatsCardProps {
  title: string
  stat: string
  icon: IconType
  color: string
}
const StatCount = ({ category }) => {
  const [count] = useQuery(getListingCount, { where: { category } })
  return (
    <StatNumber fontSize={"2xl"} fontWeight={"medium"} textAlign={"right"}>
      {count}
    </StatNumber>
  )
}
const WrappedStatNumber = (props) => (
  <Suspense fallback={<Spinner />}>
    <StatCount {...props} />
  </Suspense>
)
function StatsCard(props: StatsCardProps) {
  const { title, stat, icon, color } = props
  const router = useRouter()
  const query = useRouterQuery()
  const active = query.hasOwnProperty("category") && query.category === stat
  const nextQuery = {
    ...router.query,
    category: stat,
  }
  if (active) delete nextQuery["category"]
  return (
    <Link
      shallow
      href={{
        query: nextQuery,
      }}
    >
      <Stat
        as={"a"}
        px={{ base: 2, md: 4 }}
        py={"5"}
        shadow={"xl"}
        border={"3px solid"}
        borderColor={color}
        rounded={"lg"}
        cursor={"pointer"}
        color={active ? "white" : color}
        bg={active ? color : "white"}
        _hover={{
          bg: color,
          color: "white",
        }}
      >
        <Flex justifyContent={"space-between"}>
          <Box my={"auto"} alignContent={"center"}>
            <Icon as={icon} boxSize={10} />
          </Box>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={"medium"} isTruncated textAlign={"right"}>
              {title}
            </StatLabel>
            <WrappedStatNumber category={stat} />
          </Box>
        </Flex>
      </Stat>
    </Link>
  )
}

const Categories = () => {
  const router = useRouter()
  return (
    <Box maxW="7xl" mx={"auto"} px={{ base: 2, sm: 12, md: 17 }}>
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={"Products"} stat={"product"} icon={FiShoppingBag} color={"#2ecc71"} />
        <StatsCard title={"Services"} stat={"service"} icon={FaRegHandSpock} color={"#3498db"} />
        <StatsCard title={"Apps"} stat={"app"} icon={RiAppsLine} color={"#9b59b6"} />
        <StatsCard title={"Communities"} stat={"community"} icon={BsPeople} color={"#e74c3c"} />
      </SimpleGrid>
      <Box maxW="3xl" mx={"auto"} my={8} mb={-2}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Search2Icon color="gray.300" boxSize={6} padding={10} />}
          />
          <DebounceInput
            element={Input}
            minLength={2}
            debounceTimeout={300}
            onChange={(e) => {
              const query = {
                ...router.query,
                search: e.target.value,
              }
              if (!e.target.value) delete query["search"]
              router.push(
                `${router.pathname}${Object.keys(query).length ? "?" : ""}${new URLSearchParams(
                  query
                )}`,
                undefined,
                {
                  shallow: true,
                }
              )
            }}
            textAlign={"center"}
            fontSize={{ base: "lg", md: "2xl" }}
            py={6}
            placeholder={"What do you want to discover?"}
            shadow={"xl"}
            borderTop={"none"}
            borderRight={"none"}
            borderLeft={"none"}
            borderWidth={"2px"}
            borderRadius={"none"}
            borderColor={"red.300"}
            borderBottomStyle={"dashed"}
            _focus={{
              outline: "none",
            }}
            _hover={{
              borderColor: "red.500",
            }}
          />
        </InputGroup>
      </Box>
    </Box>
  )
}

export default Categories
