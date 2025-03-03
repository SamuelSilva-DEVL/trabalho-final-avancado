const app = require('./app');
// require('dotenv').config();

const PORT = process.env.PORT || 3000;
//rodar o servidor
app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));

// // Função que será chamada para cada requisição recebida
// const servidor = http.createServer((req, res) => {
//   res.statusCode = 200;  // Define o status HTTP como "OK"
//   res.setHeader('Content-Type', 'text/plain');  // Define o cabeçalho da resposta
//   res.end('Bem-vindo ao meu servidor Node.js!');  // Envia a resposta ao cliente
// });

