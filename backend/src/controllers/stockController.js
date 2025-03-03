const prisma = require("../config/prismaClient");

// no prisma não é possivel criar uma View, então é melhor criar um visualizador para o estoque, já que não necessita o log de novos dados.

exports.stock = async (req, res) => {
  const showStock = await prisma.products.groupBy({
    by: ["categoryId"],
    _sum: {
      quantity: true,
    },
    _avg: {
      price: true,
    },
    orderBy: {
      categoryId: "asc",
    },
  });
  res.json(showStock)
};
// console.log(stock);


// OU, na própria máquina, utilizar este comando para criar um view no postgresql e acessá-lo, em conseguinte, pelo prisma, utilizando o código abaixo:

// CREATE VIEW stock AS
// SELECT
//     p.categoryId,
//     c.nome AS category_name,
//     SUM(p.quantity) AS total_quantity,
//     AVG(p.price) AS medium_price
// FROM Products p
// JOIN Categories c ON p.categoryId = c.id
// GROUP BY p.categoriaId, c.nome;

// model Stock {
//     categoryId   Int
//     categoryName String
//     totalQuantity Int?
//     mediumPrice    Decimal?

//     @@ignore // Evita que o Prisma tente modificar a View
//   }
