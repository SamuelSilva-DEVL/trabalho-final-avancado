const express = require("express")
const router = express.Router()

const { Categories } = require("../models/categoryModel")
const { Products } = require("../models/productModel")

router.post("/populate", async (req, res) => {
  try {
    const categoriesData = [
      { nome: "Eletrônicos" },
      { nome: "Roupas" },
      { nome: "Alimentos" },
    ]

    await Categories.createMany({
      data: categoriesData,
      skipDuplicates: true,
    })

    const categoriesFromDb = await Categories.findMany()

    const productsData = [
      {
        image:
          "https://img.irroba.com.br/fit-in/600x600/filters:fill(fff):quality(80)/toraoioe/catalog/sapato-casual-masculino-azul-1.jpg",
        product_name: "Smartphone",
        categoryId: categoriesFromDb[0].id,
        description: "Celular de última geração",
        price: 3000,
        quantity_stock: 10,
      },
      {
        image:
          "https://img.irroba.com.br/fit-in/600x600/filters:fill(fff):quality(80)/toraoioe/catalog/sapato-casual-masculino-azul-1.jpg",
        product_name: "Camiseta",
        categoryId: categoriesFromDb[1].id,
        description: "Camiseta de algodão",
        price: 50,
        quantity_stock: 100,
      },
      {
        image:
          "https://img.irroba.com.br/fit-in/600x600/filters:fill(fff):quality(80)/toraoioe/catalog/sapato-casual-masculino-azul-1.jpg",
        product_name: "Chocolate",
        categoryId: categoriesFromDb[2].id,
        description: "Chocolate amargo",
        price: 10,
        quantity_stock: 200,
      },
    ]

    await Products.createMany({
      data: productsData,
      skipDuplicates: true,
    })

    res.status(201).json({ message: "Banco de dados populado com sucesso!" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao popular banco de dados" })
  }
})

module.exports = router
