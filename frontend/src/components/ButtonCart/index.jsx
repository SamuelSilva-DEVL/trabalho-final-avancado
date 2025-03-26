import { Fab } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export function ButtonCart({ productLink }) {
  return (
      <Fab color="primary" aria-label="add" key={productLink.id}>
        <ShoppingCartIcon />
      </Fab>
  );
}
