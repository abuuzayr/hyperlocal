import { ReactNode } from "react"
import { Link as InternalLink } from "blitz"
import { Box, Flex, HStack, Button, Link, Avatar, IconButton, useColorMode } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { IoMoon, IoSunny } from "react-icons/io5"

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={8} alignItems={"center"}>
          <Box>
            <InternalLink href="/">
              <a>
                <Avatar
                  size={"sm"}
                  src={"/logo_only.webp"}
                  name="hyperlocal.sg icon"
                  loading="lazy"
                />
              </a>
            </InternalLink>
          </Box>
        </HStack>

        <Flex alignItems={"center"}>
          <Link
            as={InternalLink}
            href={"/#discover"}
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
          <Link as={InternalLink} href={"/?add=listing"} scroll={false}>
            <a>
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
              >
                Add
              </Button>
            </a>
          </Link>
          <IconButton
            size={"lg"}
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
