import { Stack, Flex, Button, Text, VStack, useBreakpointValue, Heading } from "@chakra-ui/react"

const Section = () => {
  return (
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
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Stack maxW={"2xl"} align={"flex-start"} spacing={6} textAlign={"left"}>
          <Heading
            color={"white"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
          >
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
  )
}

export default Section
