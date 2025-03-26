import { Box, Typography } from "@mui/material";
import Carousel from 'react-material-ui-carousel';
import { ProductCard } from "../ProductCard";
import { useEffect, useState } from "react"
import { getProducts } from "../../services/productsServices"
import { SwiperProducts } from "../SwiperProducts"

export function CarouselSection() {
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    const fetch = await getProducts()
    setProducts(fetch)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <Box
      sx={{
        maxWidth: "100vw",
        backgroundColor: "white",
        color: "black",
        textAlign: "center",
        py: 6,
        px: 4,
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
      <Box sx={{ width: "100%" }}>
        <SwiperProducts products={products} />
      </Box>
    </Box>
  )
}