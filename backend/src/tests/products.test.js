const { app, server } = require("../server");
const request = require("supertest");
const jwt = require("jsonwebtoken");

afterAll(async () => {
  //await prisma.$disconnect(); // Fecha a conexão com o banco de dados
  server.close(); // Encerra o servidor Express
});

describe("Testes das rotas de Produtos com Auth", () => {
  // utilizar um userId(UUID) do banco de dados.
  const JWT_SECRET = process.env.JWT_SECRET ?? ""
  const token = jwt.sign({ userId: "cc1973f5-7bf1-4fcc-9ea8-29a3e00d6b3f" }, JWT_SECRET, {
    expiresIn: "1h",
  });
  const token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0ZmU2OTI4LTU3MzAtNDk3Ni1hMDhkLTAwY2VmODE4YmEyMSIsImlhdCI6MTc0Mjk4NTk0NCwiZXhwIjoxNzQzMDE0NzQ0fQ.JOuyqDRJ6nkjR6JWUjsl75leshqu6YqKIzLRdjnjpDA"
  let produtoId;

  // Teste para a rota POST /api/products
  it("Deve criar um novo Produto (201)", async () => {
    const response = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token1}`)
      .send({
        product_name: "Teste_Automatizado_Tenis00fdff006",
        categoryId: 5,
        description: "gadfgagasdasdfafg",
        price: "500",
        quantity_stock: 25,
      })
      .expect(201);
    // console.log(token);

    // expect(response.status).toBe(201); // 201 representando que o objeto foi criado no servidor.
    expect(response.body).toHaveProperty("id");
    produtoId = response.body.id;
    // Salva o ID para usar nos próximos testes
  });

  // Teste para a rota GET /api/products
  it("Deve retornar a lista de Produtos", async () => {
    const response = await request(app).get("/api/products");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    const arrayProdutos = response.body;
    let produtoPresente = false;
    arrayProdutos.forEach((produto) => {
      if (produto.id === produtoId) produtoPresente = true;
    });
    expect(produtoPresente).toBe(true);
  });

  // Teste para a rota PUT api/products/:id
  it("Deve atualizar um Produto existente", async () => {
    // console.log("O ID do produto é:",produtoId);
    const response = await request(app).put(`/api/products/${produtoId}`).send({
      product_name: "Teste_Automatizado_EditadoPUT",
      categoryId: 5,
      description: "jajajajajajja",
      price: "355",
      quantity_stock: 33,
    });
    //   console.log(response.status, response.body.product_name);
    expect(response.status).toBe(200);
    expect(response.body.data.product_name).toBe(
      "Teste_Automatizado_EditadoPUT"
    );
  });

  // Teste para a rota DELETE /api/products/:id
  it("Deve deletar um Produto existente", async () => {
    const response = await request(app).delete(`/api/products/${produtoId}`);

    expect(response.status).toBe(200);
    console.log("response do delete", response.body);
    //   expect(response.body.id).toBe(produtoId);
  });

  // Validar que o Pokemon foi deletado com sucesso
  it("Deve retornar a lista de Produtos sem o Produto deletado", async () => {
    const response = await request(app).get("/api/products");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    const arrayProdutos = response.body;
    let produtoPresente = false;
    arrayProdutos.forEach((produto) => {
      if (produto.id === produtoId) produtoPresente = true;
    });
    expect(produtoPresente).toBe(false);
  });
});
