import { Box, Button, Divider, Typography } from "@mui/material";

export function HeroSection() {
  return (
    <Box
      sx={{
        width: "100vw",
        py: 8,
        px: 4,
        backgroundColor: "#007bff",
        color: "white",
        textAlign: "center",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: { xs: "center", md: "space-around" },
        alignItems: "center",
        gap: 5,
      }}
    >
      <Box textAlign="left" sx={{ maxWidth: 500 }}>
        <Typography variant="h3" fontWeight="bold" width={400} gutterBottom>
          BUY YOUR SHOES TODAY
        </Typography>

        <Divider color="white" sx={{ width: 200, height: 2, marginBottom: 5 }} />

        <Typography variant="body1" gutterBottom sx={{ marginBottom: 10 }}>
          Aqui você encontra os melhores tênis do mercado. São diversos modelos
          e marcas para você escolher. Não perca tempo e adquira já o seu.
          Só na Avanti Store!
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{ backgroundColor: "white", color: "black" }}
          onClick={() => alert("COMPRE AGORA")}
        >
          COMPRE AGORA
        </Button>
      </Box>
      <img src="/pngwing.com.png" alt="" height={500} />
    </Box>
  );
}