import { Stack, Flex, Button, Text, VStack, Heading, Container, Box } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"

const Section = ({ onAddOpen }) => {
  return (
    <>
      <Box p={4} mb={10} mt={4}>
        <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"} placeItems={"center"}>
          <Heading fontSize={["2xl", "3xl"]}>Know something we don't?</Heading>
          <Text color={"gray.600"} fontSize={["md", "lg", "xl"]}>
            Do you know of a product, service, app or community made by Singaporeans? Do share it
            with us by adding a listing here.
          </Text>
          <Button
            maxW={200}
            colorScheme={"red"}
            rounded={"md"}
            variant="outline"
            _hover={{ bg: "red.500", color: "white" }}
            onClick={onAddOpen}
          >
            <AddIcon mr={3} /> Add a new listing
          </Button>
        </Stack>
      </Box>
      <Flex
        w={"full"}
        h={300}
        backgroundImage={
          "url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80)"
        }
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
      >
        <VStack
          w={"full"}
          justify={"center"}
          px={[4, 8]}
          bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
        >
          <Stack maxW={"2xl"} align={"flex-start"} spacing={6} textAlign={"left"}>
            <Heading color={"white"} fontWeight={700} lineHeight={1.2} fontSize={["3xl", "4xl"]}>
              Learn something new. <br />
              Be inspired. <br />
              Stories from our founders.
            </Heading>
            <Stack direction={"row"} align={"center"}>
              <Button
                minW={120}
                bg={"red.500"}
                rounded={"md"}
                color={"white"}
                _hover={{ cursor: "default" }}
              >
                Coming soon
              </Button>
              <Text color={"white"} fontSize={"sm"} pl={3}>
                Sign up to our mailing list to be notified when we launch!
              </Text>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
    </>
  )
}

export default Section
