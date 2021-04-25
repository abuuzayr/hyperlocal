import { ReactNode } from "react"
import { Link as InternalLink } from "blitz"
import {
  Link,
  Box,
  chakra,
  Container,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  Icon,
  IconButton,
  useColorModeValue,
  Image,
} from "@chakra-ui/react"
import { FiGithub, FiShare2 } from "react-icons/fi"
import { BiMailSend } from "react-icons/bi"
import { BsLightningFill } from "react-icons/bs"
import { IoStatsChart } from "react-icons/io5"

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  )
}

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }} spacing={8}>
          <Stack spacing={6}>
            <Box>
              <Image src={"/logo_word.png"} w={200} />
            </Box>
            <Stack direction={"row"} spacing={6}>
              <Link href="https://github.com/abuuzayr/hyperlocal" target="_blank">
                <a>
                  <IconButton
                    size={"sm"}
                    aria-label={"GitHub repository"}
                    icon={<FiGithub size={18} />}
                  />
                </a>
              </Link>
              <IconButton
                d={["block", "none"]}
                size={"sm"}
                aria-label={"Share"}
                icon={<FiShare2 size={18} />}
                onClick={() => {
                  try {
                    // @ts-ignore
                    navigator.share({
                      title: "hyperlocal.sg - Awesome stuff made by Singaporeans",
                      url: "https://hyperlocal.sg",
                    })
                  } catch (e) {}
                }}
              />
              <Link href="https://app.panelbear.com/share/104rkj82wxFYqkfp64s6fb/" target="_blank">
                <a>
                  <IconButton
                    size={"sm"}
                    aria-label={"Site statistics"}
                    icon={<IoStatsChart size={18} />}
                  />
                </a>
              </Link>
            </Stack>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>About</ListHeader>
            <InternalLink href={"/why"}>Why</InternalLink>
            <Link target="_blank" href={"#"}>
              Founder Stories<Text fontSize="sm"> - coming soon!</Text>
            </Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <InternalLink href={"/?add=listing"} scroll={false}>
              Add a listing
            </InternalLink>
            <Link target="_blank" href={"#"}>
              Edit a listing
            </Link>
            <Link target="_blank" href={"#"}>
              Delete a listing
            </Link>
            <Link target="_blank" href={"https://github.com/abuuzayr/hyperlocal/issues"}>
              Issues
            </Link>
            <Link target="_blank" href={"https://github.com/abuuzayr/hyperlocal"}>
              Contribute
            </Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Stay up to date</ListHeader>
            <Stack direction={"row"}>
              <Input
                placeholder={"Your email address"}
                bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                border={0}
                _focus={{
                  bg: "whiteAlpha.300",
                }}
              />
              <IconButton
                bg={useColorModeValue("green.400", "green.800")}
                color={useColorModeValue("white", "gray.800")}
                _hover={{
                  bg: "green.600",
                }}
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
            <Text fontSize={"xs"} mt={3}>
              No spam, we promise
            </Text>
            <Text fontSize={"xs"} mt={3}>
              Built with{" "}
              <Link href="https://blitzjs.com/" rel="nofollow noopener">
                <a>
                  <Icon as={BsLightningFill} boxSize={5} color="gold" d={"inline-block"} />
                </a>
              </Link>{" "}
              by{" "}
              <Link href="https://github.com/abuuzayr" textDecor="underline">
                <a>@abuuzayr</a>
              </Link>{" "}
              © {new Date().getFullYear()} hyperlocal.sg
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Footer
