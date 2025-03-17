const express = require("express")
const router = express.Router()

const { Categories } = require("../models/categoryModel")
const { Products } = require("../models/productModel")

router.post("/populate", async (req, res) => {
  try {
    const categoriesData = [
      { name: "Sneakers" },
      { name: "Tênis para corrida" },
      { name: "Tênis de escalada" },
      { name: "Tênis para triathlon" },
    ]

    await Categories.createMany({
      data: categoriesData,
      skipDuplicates: true,
    })

    const categoriesFromDb = await Categories.findMany()

    const productsData = [
      {
        image:
          "https://static.netshoes.com.br/produtos/tenis-couro-lacoste-court-sneakers-masculino/14/D66-8762-014/D66-8762-014_zoom1.jpg?ts=1697621070&ims=1088x",
        product_name: "Tênis Couro Lacoste Court Sneakers Masculino - Branco",
        categoryId: categoriesFromDb[0].id,
        description: "Descubra o requinte e conforto do Tênis Couro Lacoste Court Sneakers Masculino.",
        price: 474.99,
        quantity_stock: 10,
      },
      {
        image:
          "https://static.netshoes.com.br/produtos/tenis-asics-dynablast-4-masculino/88/2FW-1684-088/2FW-1684-088_zoom1.jpg?ts=1719227526&ims=1088x",
        product_name: "Tênis Asics Dynablast 4 Masculino - Marinho+Azul",
        categoryId: categoriesFromDb[1].id,
        description: "Leveza e responsividade para quem busca alta performance.",
        price: 404.99,
        quantity_stock: 100,
      },
      {
        image:
          "https://static.netshoes.com.br/produtos/tenis-extremecross-masculino-feminino-speed-corrida-trekking-trilha-escalada-academia-ciclismo/58/9T0-0000-058/9T0-0000-058_zoom1.jpg?ts=1713175585&ims=1088x",
        product_name: "Tênis Extremecross Masculino Feminino Speed Corrida Trekking Trilha Escalada Academia Ciclismo - Azul+Branco",
        categoryId: categoriesFromDb[2].id,
        description: "Características:• Material: Cabedal em Nylon e material sintético. • Solado: Borracha, com travas antiderrapantes.• Palmilha: E.V.A.",
        price: 152.36,
        quantity_stock: 200,
      },
      {
        image:
          "https://static.netshoes.com.br/produtos/sapatilha-ciclismo-triathlon-absolute-triton/14/V09-4607-014/V09-4607-014_zoom1.jpg?ts=1724759339&ims=1088x",
        product_name: "Sapatilha Ciclismo Triathlon Absolute Triton - Branco",
        categoryId: categoriesFromDb[3].id,
        description: "SAPATILHA TRIATHLON ABSOLUTE TRITON.",
        price: 662.99,
        quantity_stock: 20,
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
