import { useState, useEffect } from "react"
import { useMutation } from "blitz"
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
  Tooltip,
  Link,
} from "@chakra-ui/react"
import { ExternalLinkIcon, InfoOutlineIcon } from "@chakra-ui/icons"
import { IoShareSocialOutline } from "react-icons/io5"
import { RiHeart2Line, RiHeart2Fill } from "react-icons/ri"
import updateListing from "app/listings/mutations/updateListing"

const categoryColors = {
  products: "#2ecc71",
  services: "#3498db",
  app: "#9b59b6",
  community: "#e74c3c",
}

const Card = (props) => {
  const {
    category,
    tagline,
    img,
    logo,
    name,
    tags,
    social,
    website,
    likes: originalLikes,
    id,
  } = props.data
  const [liked, setLiked] = useState<number[]>([])
  const [likes, setLikes] = useState<number>(originalLikes)
  const [updateListingMutation] = useMutation(updateListing)

  const addLike = async () => {
    try {
      await updateListingMutation({
        ...props.data,
        likes: likes + 1,
      })
      setLikes(likes + 1)
      const newLiked = Array.from(new Set([...liked, id]))
      setLiked(newLiked)
      if (localStorage) {
        if (localStorage.getItem("_liked")) {
          localStorage.setItem("_liked", JSON.stringify(newLiked))
        } else {
          localStorage.setItem("_liked", JSON.stringify([id]))
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (localStorage && localStorage.getItem("_liked")) {
      setLiked(JSON.parse(localStorage.getItem("_liked") || "[]"))
    }
  }, [])

  const boxBgColor = useColorModeValue("gray.100", "gray.900")
  const iconBgColor = useColorModeValue("white", "gray.700")
  const badgeBgColor = useColorModeValue("gray.50", "gray.400")

  return (
    <Center py={0} d="inline-block" maxW={"445px"} w={"full"}>
      <Box
        p={6}
        overflow={"hidden"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"2xl"}
        rounded={"md"}
        mb={4}
        position={"relative"}
      >
        {img ? (
          <Box
            h={"180px"}
            bg={boxBgColor}
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
            <Image src={img} objectFit="cover" />
            <Stack direction="column" position={"absolute"} top={3} right={3} textAlign={"center"}>
              <Icon
                as={liked.includes(id) ? RiHeart2Fill : RiHeart2Line}
                color={liked.includes(id) ? "red.500" : "white"}
                boxSize={8}
                cursor={"pointer"}
                _hover={{
                  color: "red.500",
                }}
                mb={-2}
                onClick={addLike}
              />
              <Text fontSize={10} mt={0} as="div">
                {likes}
              </Text>
            </Stack>
          </Box>
        ) : (
          <Box h={"60px"} mt={-6} mx={-6} mb={6} pos={"relative"} overflow={"hidden"}>
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
            <Image src={img} objectFit="cover" />
            <Stack direction="column" position={"absolute"} top={3} right={3} textAlign={"center"}>
              <Icon
                as={liked.includes(id) ? RiHeart2Fill : RiHeart2Line}
                color={liked.includes(id) || !img ? "red.500" : "white"}
                boxSize={8}
                cursor={"pointer"}
                _hover={{
                  color: "red.500",
                }}
                mb={-2}
                onClick={addLike}
              />
              <Text fontSize={10} mt={0} as="div">
                {likes}
              </Text>
            </Stack>
          </Box>
        )}
        {logo && (
          <HStack justifyContent={"center"} mb={3} mt={"-50px"}>
            <Avatar src={logo} alt={"Author"} bg={iconBgColor} />
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
          {tags &&
            tags.split(",").map((tag, i) => (
              <Badge
                px={2}
                py={1}
                bg={badgeBgColor}
                color={"gray.900"}
                fontWeight={"400"}
                key={`${tag}-${i}`}
              >
                {tag}
              </Badge>
            ))}
        </Stack>
        <Stack mt={4} direction={"row"} spacing={4}>
          {social && (
            <Link
              flex={1}
              href={social}
              target="_blank"
              rel="noopener nofollow"
              _hover={{
                textTransform: "none",
              }}
            >
              <Button
                w={"full"}
                fontSize={"sm"}
                rounded={"md"}
                _focus={{
                  bg: "gray.200",
                }}
              >
                <Icon as={IoShareSocialOutline} mr={2} boxSize={5} />
                Follow
              </Button>
            </Link>
          )}
          {website && (
            <Link
              flex={1}
              href={website}
              target="_blank"
              rel="noopener nofollow"
              _hover={{
                textTransform: "none",
              }}
            >
              <Button
                w={"full"}
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
            </Link>
          )}
        </Stack>
        <Tooltip
          hasArrow
          label="See an issue with this listing? Email us at hello@hyperlocal.sg or chat with us!"
        >
          <InfoOutlineIcon
            h={15}
            position="absolute"
            bg={"transparent"}
            right={2}
            bottom={2}
            p={0}
            color="gray.500"
          />
        </Tooltip>
      </Box>
    </Center>
  )
}

export default Card
