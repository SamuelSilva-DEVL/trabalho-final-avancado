import { Box, Button } from "@mui/material"
import Drawer from "@mui/material/Drawer"

export function ShoppigCart({ open, onClose }) {
  return (
    <div>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        sx={{ minWidth: 300, maxWidth: 400 }}
      >
        <Box
          sx={{
            minWidth: 300,
            maxWidth: 400,
            maxHeight: "90vh",
            overflowY: "scroll",
            border: "1px solid black",
            mt: 2,
            p: 2,
          }}
        >
          <p>Carrinho</p>
          <p>Carrinho</p>
          <p>Carrinho</p>
          <p>Carrinho</p>
          <p>Carrinho</p>
          <p>Carrinho</p>
          <p>Carrinho</p>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            gap: 1,
            mt: 2,
            px: 2,
          }}
        >
          <Button variant="outlined">Fechar</Button>
          <Button variant="outlined">Fechar</Button>
        </Box>
      </Drawer>
    </div>
  )
}
