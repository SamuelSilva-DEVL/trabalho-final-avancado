const http = require('http');  // Importa o módulo HTTP nativo do Node.js
// const express = require("express")
// const app = express()
// const routes = require("./routes")

const PORT = 3000

// Função que será chamada para cada requisição recebida
const servidor = http.createServer((req, res) => {
  res.statusCode = 200;  // Define o status HTTP como "OK"
  res.setHeader('Content-Type', 'text/plain');  // Define o cabeçalho da resposta
  res.end('Bem-vindo ao meu servidor Node.js!');  // Envia a resposta ao cliente
});

// app.use(express.json())
// app.use("/", routes)

servidor.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
