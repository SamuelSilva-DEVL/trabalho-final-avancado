import { Fab } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export function ButtonCart() {
  return (
    <Fab color="primary" aria-label="add">
      <ShoppingCartIcon />
    </Fab>
  );
}
