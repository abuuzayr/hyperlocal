import { useState, useEffect } from "react"
import { useMutation, Link as InternalLink, Image as NextImage } from "blitz"
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  HStack,
  Avatar,
  useColorModeValue,
  Badge,
  Button,
  Icon,
  Tooltip,
  Link,
} from "@chakra-ui/react"
import { ExternalLinkIcon, InfoOutlineIcon, EditIcon } from "@chakra-ui/icons"
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
    imgHeight,
    logo,
    name,
    tags,
    social,
    website,
    likes: originalLikes,
    id,
    createdAt,
  } = props.data
  const [liked, setLiked] = useState<number[]>([])
  const [likes, setLikes] = useState<number>(originalLikes)
  const [updateListingMutation] = useMutation(updateListing)
  const [isOwner, setIsOwner] = useState(false)

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
    if (localStorage) {
      if (localStorage.getItem("_liked")) {
        setLiked(JSON.parse(localStorage.getItem("_liked") || "[]"))
      }
      if (localStorage.getItem("_listings")) {
        try {
          const owns = JSON.parse(localStorage.getItem("_listings") || "")
          if (owns.hasOwnProperty(id) && owns[id] === new Date(createdAt).getTime()) {
            setIsOwner(true)
          }
        } catch (e) {
          console.log(e)
        }
      }
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
            h={imgHeight ? `${imgHeight < 180 ? imgHeight : 180}px` : "180px"}
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
              zIndex={9}
            >
              {category}
            </Text>
            <NextImage
              src={img}
              layout="fill"
              objectFit="cover"
              alt={`featured image for ${name}`}
            />
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
              zIndex={9}
            >
              {category}
            </Text>
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
            <Avatar src={logo} name={`icon for ${name}`} bg={iconBgColor} loading="lazy" />
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
        <Stack align={"center"} justify={"center"} direction={"row"} mt={4} flexWrap="wrap">
          {tags &&
            tags
              .split(",")
              .slice(0, 3)
              .map((tag, i) => (
                <Badge
                  px={2}
                  py={1}
                  bg={badgeBgColor}
                  color={"gray.900"}
                  fontWeight={"400"}
                  key={`${tag}-${i}`}
                  mb={2}
                >
                  {tag}
                </Badge>
              ))}
        </Stack>
        <Stack mt={2} direction={"row"} flexWrap="wrap" mb={-2}>
          {social && (
            <Link
              flex={1}
              href={social}
              target="_blank"
              rel="noopener nofollow"
              _hover={{
                textTransform: "none",
              }}
              mb={2}
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
              mb={2}
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
          placement="left"
          label="Issue with this listing? Chat with us!"
          fontSize="xs"
        >
          <InfoOutlineIcon
            h={15}
            position="absolute"
            bg={"transparent"}
            right={2}
            bottom={2}
            p={0}
            color="gray.500"
            display={["none", "none", "inline-block"]}
          />
        </Tooltip>
        {isOwner && (
          <InternalLink href={`/?edit=${id}`} scroll={false}>
            <a>
              <EditIcon
                h={4}
                position="absolute"
                bg={"transparent"}
                left={2}
                bottom={2}
                p={0}
                color="gray.500"
              />
            </a>
          </InternalLink>
        )}
      </Box>
    </Center>
  )
}

export default Card
