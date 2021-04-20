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
} from "@chakra-ui/react"
import { Search2Icon } from "@chakra-ui/icons"
import { IconType } from "react-icons"
import { FiShoppingBag } from "react-icons/fi"
import { FaRegHandSpock } from "react-icons/fa"
import { RiAppsLine } from "react-icons/ri"
import { BsPeople } from "react-icons/bs"

interface StatsCardProps {
  title: string
  stat: string
  icon: IconType
  color: string
}
function StatsCard(props: StatsCardProps) {
  const { title, stat, icon, color } = props
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"3px solid"}
      borderColor={useColorModeValue(color, "gray.500")}
      rounded={"lg"}
      cursor={"pointer"}
      color={useColorModeValue(color, "gray.200")}
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
          <StatNumber fontSize={"2xl"} fontWeight={"medium"} textAlign={"right"}>
            {stat}
          </StatNumber>
        </Box>
      </Flex>
    </Stat>
  )
}

const Categories = () => {
  return (
    <Box maxW="7xl" mx={"auto"} mt={-10} px={{ base: 2, sm: 12, md: 17 }}>
      <Box maxW="3xl" mx={"auto"} my={8}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Search2Icon color="gray.300" boxSize={6} padding={10} />}
          />
          <Input
            textAlign={"center"}
            fontSize={{ base: "lg", md: "2xl" }}
            py={{ base: 6, md: 10 }}
            placeholder={"What do you want to discover?"}
            shadow={"xl"}
          />
        </InputGroup>
      </Box>
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={"Products"} stat={"5,000"} icon={FiShoppingBag} color={"#2ecc71"} />
        <StatsCard title={"Services"} stat={"1,000"} icon={FaRegHandSpock} color={"#3498db"} />
        <StatsCard title={"Apps"} stat={"7"} icon={RiAppsLine} color={"#9b59b6"} />
        <StatsCard title={"Communities"} stat={"7"} icon={BsPeople} color={"#e74c3c"} />
      </SimpleGrid>
    </Box>
  )
}

export default Categories
