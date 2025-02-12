import { Box, Typography } from "@mui/material";
import Carousel from 'react-material-ui-carousel';
import { ProductCard } from "../ProductCard";

export function CarouselSection() {
  const products = JSON.parse(localStorage.getItem("produtos")) || []

  return (
    <Box
      sx={{
        backgroundColor: "white",
        color: "black",
        textAlign: "center",
        py: 8,
        px: 4,
        maxWidth: 600,
        margin: "auto",
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        gutterBottom
        sx={{ marginBottom: 10 }}
      >
        NOSSOS PRODUTOS POPULARES
      </Typography>
      <Carousel
        autoPlay={false}
        navButtonsAlwaysVisible
        navButtonsProps={{
          style: {
            backgroundColor: "#007bff",
            color: "white",
          },
        }}
      >
        {products?.map((product, index) => (
          <Box key={index} sx={{ display: "flex", justifyContent: "center" }}>
            <ProductCard product={product} />
          </Box>
        ))}
      </Carousel>
    </Box>
  )
}