// const { app, server } = require("../server");
// const request = require("supertest");

// afterAll(async () => {
//   //await prisma.$disconnect(); // Fecha a conexão com o banco de dados
//   server.close(); // Encerra o servidor Express
// });

// describe("Testes das rotas de Usuários", () => {
//   it("Deve criar um novo Usuário", async () => {
//     const response = await request(app).post("/api/admin").send({
//       name: "Teste_Usuário",
//       email: "email_teste@hotmail.com",
//       password: "senhateste",
//       image: "url_teste",
//     });
//     expect(response.status).toBe(201); // 201 representando que o objeto foi criado no servidor.
//     expect(response.body).toHaveProperty("id");
//     userId = response.body.id;
//   });
//   it("Deve retornar uma lista de Usuários", async () => {
//     const response = await request(app).get("/api/admin");
    
//         expect(response.status).toBe(200);
//         expect(Array.isArray(response.body)).toBe(true);
//         const arrayProdutos = response.body;
//         let produtoPresente = false;
//         arrayProdutos.forEach((produto) => {
//           if (produto.id === produtoId) produtoPresente = true;
//         });
//         expect(produtoPresente).toBe(true);
//   });
//   it("Deve atualizar um usuário", async () => {});
//   it("Deve criar um novo Produto", async () => {});
// });
