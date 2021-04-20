// import Image from "next/image"
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  HStack,
  Avatar,
  useColorModeValue,
  Image,
  Badge,
  Button,
  Icon,
} from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { IoShareSocialOutline } from "react-icons/io5"
import { RiHeart2Line, RiHeart2Fill } from "react-icons/ri"

const categoryColors = {
  products: "#2ecc71",
  services: "#3498db",
  apps: "#9b59b6",
  communities: "#e74c3c",
}

const Card = (props) => {
  const { category, tagline, img, logo, name, tags, social, website } = props.data
  const liked = false
  return (
    <Center py={0} d="inline-block" maxW={"445px"} w={"full"}>
      <Box
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        {img ? (
          <Box
            h={"180px"}
            bg={"gray.100"}
            mt={-6}
            mx={-6}
            mb={6}
            pos={"relative"}
            overflow={"hidden"}
          >
            <Text
              color={"white"}
              bg={categoryColors[category]}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"xs"}
              letterSpacing={1.1}
              borderRadius={10}
              px={3}
              position={"absolute"}
              top={3}
              left={3}
            >
              {category}
            </Text>
            <Image src={img} layout={"cover"} />
            <Icon
              as={liked ? RiHeart2Fill : RiHeart2Line}
              color={liked ? "red.500" : "white"}
              position={"absolute"}
              top={3}
              right={3}
              boxSize={8}
              cursor={"pointer"}
              _hover={{
                color: "red.500",
              }}
            />
          </Box>
        ) : (
          <Box h={"50px"} mt={-6} mx={-6} mb={6} pos={"relative"} overflow={"hidden"}>
            <Text
              color={"white"}
              bg={categoryColors[category]}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"xs"}
              letterSpacing={1.1}
              borderRadius={10}
              px={3}
              position={"absolute"}
              top={3}
              left={3}
            >
              {category}
            </Text>
            <Image src={img} layout={"cover"} />
            <Icon
              as={liked ? RiHeart2Fill : RiHeart2Line}
              color={liked || !img ? "red.500" : "white"}
              position={"absolute"}
              top={3}
              right={3}
              boxSize={8}
              cursor={"pointer"}
              _hover={{
                color: "red.500",
              }}
            />
          </Box>
        )}
        {logo && (
          <HStack justifyContent={"center"} mb={3} mt={"-50px"}>
            <Avatar src={logo} alt={"Author"} />
          </HStack>
        )}
        <Stack textAlign={"center"}>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {name}
          </Heading>
          <Text color={useColorModeValue("gray.700", "gray.400")} px={3}>
            {tagline}
          </Text>
        </Stack>
        <Stack align={"center"} justify={"center"} direction={"row"} mt={4}>
          {tags.split(",").map((tag) => (
            <Badge px={2} py={1} bg={"gray.50"} fontWeight={"400"}>
              {tag}
            </Badge>
          ))}
        </Stack>
        <Stack mt={4} direction={"row"} spacing={4}>
          {social && (
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"md"}
              _focus={{
                bg: "gray.200",
              }}
            >
              <Icon as={IoShareSocialOutline} mr={2} boxSize={5} />
              Follow
            </Button>
          )}
          {website && (
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"md"}
              bg={"red.500"}
              color={"white"}
              _hover={{
                bg: "red.400",
              }}
              _focus={{
                bg: "red.400",
              }}
            >
              Website
              <ExternalLinkIcon ml={2} />
            </Button>
          )}
        </Stack>
      </Box>
    </Center>
  )
}

export default Card
