import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import ImageDefault from "@assets/sem_imagem.png"

export function ProductCard({ product }) {
  return (
    <Card sx={{ width: "100%", maxWidth: 364 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.description}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.product_name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Valor: R$ {product.price}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Categoria: {product.categoryName}
          </Typography>
          <Typography noWrap variant="body2" sx={{ color: "text.secondary" }}>
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}