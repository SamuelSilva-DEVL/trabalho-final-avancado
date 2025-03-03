const express = require('express');
const productRoutes = require('./src/routes/productRoutes');
const app = express();
const cors = require('cors');

app.use(cors()); // Habilita CORS para todas as requisições
app.use(express.json()); // Para que o Express lide com JSON

// Usando as rotas dos produtos
app.use('/produtos', productRoutes);

// Configuração do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

