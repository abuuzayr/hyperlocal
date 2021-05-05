import { Link } from "blitz"
import { Box, Heading, Container, Text, Button, Stack, Icon } from "@chakra-ui/react"
import Navbar from "app/core/components/Navbar"
import Footer from "app/core/components/Footer"

const Error = ({ statusCode, title, text = "" }) => {
  return (
    <>
      <Navbar />
      <Container maxW={"3xl"}>
        <Stack as={Box} textAlign={"center"} py={{ base: 10, md: 16 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            pb={[8, 16]}
          >
            {statusCode}
            <br />
            {title}
          </Heading>
          <Text color={"gray.500"}>We're very sorry you had to see this page.</Text>
          <Text color={"gray.500"}>
            {text
              ? text
              : "Click on the links above or below to navigate away or click the button below to return to home."}
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
            pt={[8, 16]}
          >
            <Link href="/#">
              <a>
                <Button
                  bg={"red.500"}
                  color={"white"}
                  rounded={"lg"}
                  px={6}
                  _hover={{
                    bg: "transparent",
                    color: "red.500",
                  }}
                >
                  Back to Home
                </Button>
              </a>
            </Link>
          </Stack>
        </Stack>
      </Container>
      <Footer />
    </>
  )
}

export default Error
