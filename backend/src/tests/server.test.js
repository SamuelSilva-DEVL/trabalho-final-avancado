const { app, server } = require("../server");
const request = require("supertest");

afterAll(async () => {
  //await prisma.$disconnect(); // Fecha a conexão com o banco de dados
  server.close(); // Encerra o servidor Express
});

describe("Testes das rotas de Produtos", () => {
  let produtoId;

  // Teste para a rota POST /pokemons
  it("Deve criar um novo Produto", async () => {
    const response = await request(app).post("/api/products").send({
      product_name: "Teste_Automatizado_Tenis001",
      categoryId: 2,
      description: "jajajajajajja",
      valor: 345,
      quantity_stock: 23,
    });

    expect(response.status).toBe(201); // 201 representando que o objeto foi criado no servidor.
    expect(response.body).toHaveProperty("id");
    produtoId = response.body.id; // Salva o ID para usar nos próximos testes
  });

//   // Teste para a rota GET /pokemons
//   ("Deve retornar a lista de Pokémons", async () => {
//     const response = await request(app).get("/pokemons");

//     expect(response.status).toBe(200);
//     expect(Array.isitArray(response.body)).toBe(true);
//     const arrayPokemons = response.body;
//     let pokemonPresente = false;
//     arrayPokemons.forEach((pokemon) => {
//       if (pokemon.id_pokemon === pokemonId) pokemonPresente = true;
//     });
//     expect(pokemonPresente).toBe(true);
//   });

//   // Teste para a rota PUT /pokemons/:idPokemon
//   it("Deve atualizar um Pokémon existente", async () => {
//     const response = await request(app).put(`/pokemons/${pokemonId}`).send({
//       nome: "Skitty NOVO NOME",
//       tipo: "Psiquico",
//       raridade: "Raro",
//       preco: 2222,
//       img_url:
//         "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/300.png",
//     });

//     expect(response.status).toBe(200);
//     expect(response.body.nome).toBe("Skitty NOVO NOME");
//   });

//   // Teste para a rota DELETE /pokemons/:idPokemon
//   it("Deve deletar um Pokémon existente", async () => {
//     const response = await request(app).delete(`/pokemons/${pokemonId}`);

//     expect(response.status).toBe(200);
//     expect(response.body.id_pokemon).toBe(pokemonId);
//   });

//   // Validar que o Pokemon foi deletado com sucesso
//   it("Deve retornar a lista de Pokémons sem o Pokemon deletado", async () => {
//     const response = await request(app).get("/pokemons");

//     expect(response.status).toBe(200);
//     expect(Array.isArray(response.body)).toBe(true);
//     const arrayPokemons = response.body;
//     let pokemonPresente = false;
//     arrayPokemons.forEach((pokemon) => {
//       if (pokemon.id_pokemon === pokemonId) pokemonPresente = true;
//     });
//     expect(pokemonPresente).toBe(false);
//   });
});
