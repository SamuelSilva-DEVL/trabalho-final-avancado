import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import ImageDefault from "@assets/sem_imagem.png";
// import { ButtonCart } from "../ButtonCart";

export function ProductCard({ product }) {
  return (
    <Card
      sx={{
        width: "100%",
        minWidth: 300,
        maxWidth: 364,
        maxHeight: 650,
        marginBottom: 2,
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={product.image || ImageDefault}
          alt={product.description}
          sx={{ maxWidth: 364, maxHeight: 364, objectFit: "contain", }}
        />
        <CardContent sx={{ height: 185 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {product.product_name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <strong>Valor:</strong> R$ {product.price}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <strong>Categoria:</strong> {product.categoryName}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {product.description}
          </Typography>
        </CardContent>
        {/* <ButtonCart
          productLink={product.id}
          sx={{
            marginBottom: 5,
          }}
        /> */}
      </CardActionArea>
    </Card>
  );
}
