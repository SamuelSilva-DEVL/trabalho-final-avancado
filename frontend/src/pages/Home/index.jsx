import { Box, Divider } from "@mui/material"
import { CarouselSection } from "../../components/CarouselSection"
import { HeroSection } from "../../components/HeroSection"
import { Header } from "../../components/Header"
import { AboutUs } from "../../components/AboutUs"
import { Footer } from "../../components/Footer"

export function Home() {
  return (
    <Box
      sx={{
        backgroundColor: "primary",
        color: "black",
      }}
    >
      <Box>
        <Header />
        <HeroSection />
        <CarouselSection />
        <Divider
          color="lightblue"
          sx={{ width: 1000, height: 1, marginBlock: 10, marginInline: "auto" }}
        />
        <AboutUs />
        <Footer />
      </Box>
    </Box>
  )
}
