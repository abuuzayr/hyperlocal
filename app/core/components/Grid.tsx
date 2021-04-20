import { Container, Stack, Box } from "@chakra-ui/react"
import Card from "app/core/components/Card"

const cards = [
  {
    category: "products",
    tagline: "Athetic Club Singapura",
    img:
      "https://static.wixstatic.com/media/6aeb45_fa4c832a0ecd4005b648f56cf2c67257~mv2.png/v1/crop/x_0,y_180,w_1080,h_721/fill/w_379,h_253,al_c,q_85,usm_0.66_1.00_0.01/2.webp",
    logo:
      "https://static.wixstatic.com/media/6aeb45_1759c34fbea64eff9c5bdc98df560ca8~mv2.png/v1/fill/w_63,h_95,al_c,q_85,usm_0.66_1.00_0.01/3.webp",
    name: "We The Peepur",
    likes: 20,
    tags: "streetwear, atheletic",
    website: "https://www.wethepeepur.com/",
    social: "https://www.instagram.com/wethepeepur/",
  },
  {
    category: "products",
    tagline: "Athetic Club Singapura",
    img:
      "https://static.wixstatic.com/media/6aeb45_fa4c832a0ecd4005b648f56cf2c67257~mv2.png/v1/crop/x_0,y_180,w_1080,h_721/fill/w_379,h_253,al_c,q_85,usm_0.66_1.00_0.01/2.webp",
    logo:
      "https://static.wixstatic.com/media/6aeb45_1759c34fbea64eff9c5bdc98df560ca8~mv2.png/v1/fill/w_63,h_95,al_c,q_85,usm_0.66_1.00_0.01/3.webp",
    name: "We The Peepur",
    likes: 20,
    tags: "streetwear, atheletic",
    website: "",
    social: "",
  },
  {
    category: "products",
    tagline: "Athetic Club Singapura",
    img:
      "https://static.wixstatic.com/media/6aeb45_fa4c832a0ecd4005b648f56cf2c67257~mv2.png/v1/crop/x_0,y_180,w_1080,h_721/fill/w_379,h_253,al_c,q_85,usm_0.66_1.00_0.01/2.webp",
    logo:
      "https://static.wixstatic.com/media/6aeb45_1759c34fbea64eff9c5bdc98df560ca8~mv2.png/v1/fill/w_63,h_95,al_c,q_85,usm_0.66_1.00_0.01/3.webp",
    name: "We The Peepur",
    likes: 20,
    tags: "streetwear, atheletic",
    website: "",
    social: "",
  },
  {
    category: "products",
    tagline: "Athetic Club Singapura",
    img:
      "https://static.wixstatic.com/media/6aeb45_fa4c832a0ecd4005b648f56cf2c67257~mv2.png/v1/crop/x_0,y_180,w_1080,h_721/fill/w_379,h_253,al_c,q_85,usm_0.66_1.00_0.01/2.webp",
    logo:
      "https://static.wixstatic.com/media/6aeb45_1759c34fbea64eff9c5bdc98df560ca8~mv2.png/v1/fill/w_63,h_95,al_c,q_85,usm_0.66_1.00_0.01/3.webp",
    name: "We The Peepur",
    likes: 20,
    tags: "streetwear, atheletic",
    website: "",
    social: "",
  },
  {
    category: "products",
    tagline: "Athetic Club Singapura",
    img:
      "https://static.wixstatic.com/media/6aeb45_fa4c832a0ecd4005b648f56cf2c67257~mv2.png/v1/crop/x_0,y_180,w_1080,h_721/fill/w_379,h_253,al_c,q_85,usm_0.66_1.00_0.01/2.webp",
    logo: "",
    name: "We The Peepur",
    likes: 20,
    tags: "streetwear, atheletic",
    website: "https://www.wethepeepur.com/",
    social: "https://www.instagram.com/wethepeepur/",
  },
  {
    category: "services",
    tagline: "Athetic Club Singapura",
    img:
      "https://static.wixstatic.com/media/6aeb45_fa4c832a0ecd4005b648f56cf2c67257~mv2.png/v1/crop/x_0,y_180,w_1080,h_721/fill/w_379,h_253,al_c,q_85,usm_0.66_1.00_0.01/2.webp",
    logo:
      "https://static.wixstatic.com/media/6aeb45_1759c34fbea64eff9c5bdc98df560ca8~mv2.png/v1/fill/w_63,h_95,al_c,q_85,usm_0.66_1.00_0.01/3.webp",
    name: "We The Peepur",
    likes: 20,
    tags: "streetwear, atheletic",
    website: "https://www.wethepeepur.com/",
    social: "https://www.instagram.com/wethepeepur/",
  },
  {
    category: "services",
    tagline: "Athetic Club Singapura",
    img: "",
    logo:
      "https://static.wixstatic.com/media/6aeb45_1759c34fbea64eff9c5bdc98df560ca8~mv2.png/v1/fill/w_63,h_95,al_c,q_85,usm_0.66_1.00_0.01/3.webp",
    name: "We The Peepur",
    likes: 20,
    tags: "streetwear, atheletic",
    website: "https://www.wethepeepur.com/",
    social: "",
  },
]

const GridComponent = () => (
  <Container as={Stack} maxW={"7xl"} py={10}>
    <Box w="100%" mx="auto" sx={{ columnCount: [1, 2, 4], columnGap: "1.5rem" }}>
      {/* <Grid templateColumns="repeat(4, 1fr)" gap={6} justifyContent={"start"}> */}
      {[...cards, ...cards].map((card) => (
        <Card data={card} />
      ))}
    </Box>
  </Container>
)

export default GridComponent
