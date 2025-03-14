const {Stock} = require('../models/stockModel')
//está referenciando prisma.products
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

// no prisma não é possivel criar uma View, então é melhor criar um visualizador para o estoque, já que não necessita o log de novos dados.

exports.getStock = async (req, res) => {
try {
  const showStock = await Stock.groupBy({
    by: ["categoryId"],
    _sum: {
      quantity_stock: true,
    },
    _avg: {
      valor: true,
    },
    orderBy: {
      categoryId: "asc",
    },
  });

  //pegando os nomes das categorias
  const categories = await prisma.categories.findMany({
    select: {
      id: true,
      nome: true
    }
  });

  const formattedStock = showStock.map(stockItem => ({
    categoryName: categories.find(cat => cat.id === stockItem.categoryId)?.nome || "Desconhecido",
    totalStock: stockItem._sum.quantity_stock,
    averageValues: stockItem._avg.valor
  }));
  res.json(formattedStock);

} catch (error) {
  console.error('Erro ao buscar estoque:', error);
  res.status(500).json({error: "Erro ao buscar estoque."});
};
};
