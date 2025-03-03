const express = require('express');
const productRoutes = require('./routes/productRoutes');
const middlewaresLogs = require('./middlewares/debugMiddleware')
const app = express();
// const cors = require('cors');

// app.use(cors()); // Habilita CORS para todas as requisições
app.use(express.json()); // Para que o Express lide com JSON

// Middleware de log para debug
app.use(middlewaresLogs.logRequisicao)

// Usando as rotas dos produtos
app.use("/api", productRoutes);

// Para capturar requisições desconhecidas
app.use((req, res) => {
    res.status(404).json({ error: "Rota não encontrada" });
});

module.exports = app;