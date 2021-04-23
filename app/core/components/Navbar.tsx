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
} from "@chakra-ui/react"
import { AddIcon, TriangleDownIcon } from "@chakra-ui/icons"
import { FiShoppingBag } from "react-icons/fi"
import { FaRegHandSpock } from "react-icons/fa"
import { RiAppsLine } from "react-icons/ri"
import { BsPeople } from "react-icons/bs"

const Links = []

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
)

const Navbar = ({ onAddOpen, loaded }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  return (
    <Box px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={8} alignItems={"center"}>
          <Box>
            <Avatar size={"sm"} src={"/logo_only.png"} />
          </Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <Menu>
            {loaded && (
              <MenuButton>
                <Button
                  color={"red.500"}
                  bg={"white"}
                  size={"sm"}
                  mr={3}
                  border={"2px"}
                  borderColor={"red.500"}
                  leftIcon={<TriangleDownIcon />}
                >
                  Discover
                </Button>
              </MenuButton>
            )}
            <MenuList>
              <MenuItem onClick={() => router.push("?category=products")}>
                <Icon as={FiShoppingBag} mr={5} /> Products
              </MenuItem>
              <MenuItem onClick={() => router.push("?category=services")}>
                <Icon as={FaRegHandSpock} mr={5} /> Services
              </MenuItem>
              <MenuItem onClick={() => router.push("?category=app")}>
                <Icon as={RiAppsLine} mr={5} /> Apps
              </MenuItem>
              <MenuItem onClick={() => router.push("?category=community")}>
                <Icon as={BsPeople} mr={5} /> Communities
              </MenuItem>
            </MenuList>
          </Menu>

          <Button
            variant={"solid"}
            bg={"red.500"}
            color={"white"}
            size={"sm"}
            leftIcon={<AddIcon />}
            _hover={{
              bg: "transparent",
              color: "red.500",
            }}
            onClick={onAddOpen}
          >
            Add
          </Button>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}

export default Navbar
