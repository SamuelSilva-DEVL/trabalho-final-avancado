const { app, server } = require("../server");
const request = require("supertest");

afterAll(async () => {
  //await prisma.$disconnect(); // Fecha a conexão com o banco de dados
  server.close(); // Encerra o servidor Express
});

describe("Testes das rotas de Produtos", () => {
  let produtoId;

  // Teste para a rota POST /api/products
  it("Deve criar um novo Produto", async () => {
    const response = await request(app).post("/api/products").send({
      product_name: "Teste_Automatizado_Tenis006",
      categoryId: 1,
      description: "gadfgagfafg",
      price: "500",
      quantity_stock: 25,
    });

    expect(response.status).toBe(201); // 201 representando que o objeto foi criado no servidor.
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
      categoryId: 2,
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

describe("Testes das rotas de Categorias", () => {
    let categoriaId;
  
    // Teste para a rota POST /api/categories
    it("Deve criar um novo Produto", async () => {
      const response = await request(app).post("/api/categories").send({
        name: "Teste_Corridinhas",
      });
  
      expect(response.status).toBe(201); // 201 representando que o objeto foi criado no servidor.
      expect(response.body).toHaveProperty("id");
      categoriaId = response.body.id;
      // Salva o ID para usar nos próximos testes
    });
  
    // Teste para a rota GET /api/categories
    it("Deve retornar a lista de Categorias", async () => {
      const response = await request(app).get("/api/categories");
  
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      const arrayCategorias = response.body;
      let categoriaPresente = false;
      arrayCategorias.forEach((category) => {
        if (category.id === categoriaId) categoriaPresente = true;
      });
      expect(categoriaPresente).toBe(true);
    });
  
    // Teste para a rota PUT api/categories/:id
    it("Deve atualizar uma Categoria existente", async () => {
      // console.log("O ID do produto é:",produtoId);
      const response = await request(app).put(`/api/categories/${categoriaId}`).send({
        name: "Teste_Corridona_EDITED",
      });
      //   console.log(response.status, response.body.product_name);
      expect(response.status).toBe(200);
      console.log("body das categorias", response.body);
      expect(response.body.name).toBe(
        "Teste_Corridona_EDITED"
      );
    });
  
    // Teste para a rota DELETE /api/categories/:id
    it("Deve deletar uma Categoria existente", async () => {
      const response = await request(app).delete(`/api/categories/${categoriaId}`);
  
      expect(response.status).toBe(204);
      console.log("response do delete", response.body);
      //   expect(response.body.id).toBe(produtoId);
    });
  
    // Validar que o Pokemon foi deletado com sucesso
    it("Deve retornar a lista de Categorias sem a Categoria deletado", async () => {
      const response = await request(app).get("/api/categories");
  
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      const arrayCategorias = response.body;
      let categoriaPresente = false;
      arrayCategorias.forEach((category) => {
        if (category.id === categoriaId) categoriaPresente = true;
      });
      expect(categoriaPresente).toBe(false);
    });
  });
