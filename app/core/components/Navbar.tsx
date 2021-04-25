import { ReactNode } from "react"
import { useRouter } from "blitz"
import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Avatar,
  Icon,
  IconButton,
  useColorMode,
} from "@chakra-ui/react"
import { AddIcon, TriangleDownIcon } from "@chakra-ui/icons"
import { FiShoppingBag } from "react-icons/fi"
import { FaRegHandSpock } from "react-icons/fa"
import { RiAppsLine } from "react-icons/ri"
import { BsPeople } from "react-icons/bs"
import { IoMoon, IoSunny } from "react-icons/io5"

const Navbar = ({ onAddOpen, loaded }) => {
  const router = useRouter()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={8} alignItems={"center"}>
          <Box>
            <Avatar size={"sm"} src={"/logo_only.png"} />
          </Box>
        </HStack>

        <Flex alignItems={"center"}>
          <Link
            href="#discover"
            _hover={{
              textDecoration: "none",
            }}
          >
            <a>
              <Button
                color={"red.500"}
                bg={"transparent"}
                size={"sm"}
                mr={3}
                border={"2px"}
                borderColor={"red.500"}
                _hover={{
                  bg: "transparent",
                  borderColor: "transparent",
                }}
              >
                Discover
              </Button>
            </a>
          </Link>
          <Button
            variant={"solid"}
            bg={"red.500"}
            color={"white"}
            size={"sm"}
            mr={3}
            leftIcon={<AddIcon />}
            _hover={{
              bg: "transparent",
              color: "red.500",
            }}
            onClick={onAddOpen}
          >
            Add
          </Button>
          <IconButton
            size={"sm"}
            variant={"ghost"}
            aria-label={"Toggle Color Mode"}
            onClick={toggleColorMode}
            icon={colorMode == "light" ? <IoMoon size={18} /> : <IoSunny size={18} />}
          />
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar
