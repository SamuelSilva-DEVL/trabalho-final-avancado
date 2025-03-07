const express = require("express")
const router = express.Router()

const {
  getProducts,
  createProduct,
  getProductbyId,
  updateProduct,
  deleteProduct,
} = require("../../../controllers/produtctController")

router.get("/products", async (req, res) => {
  const data = await getProducts()

  res.status(200).json(data)
})

router.get("/products/:id", async (req, res) => {
  const id_product = parseInt(req.params.id)

  const findProduct = await getProductbyId(id_product)

  if (!findProduct) {
    return res.status(404).json({ message: "Produto nao encontrado." })
  }

  res.status(200).json(findProduct)
})

router.post("/products", async (req, res) => {
  const data = await createProduct(req.body)

  res.status(200).json(data)
})

router.put("/products/:id", async (req, res) => {
  const id_product = parseInt(req.params.id)

  const findProduct = await getProductbyId(id_product)

  if (!findProduct) {
    return res.status(404).json({ message: "Produto não encontrado." })
  }

  const dataUpdate = await updateProduct(id_product, req.body)

  res
    .status(200)
    .json({ message: "Produto atualizado com sucesso", data: dataUpdate })
})

router.delete("/products/:id", async (req, res) => {
  const id_product = parseInt(req.params.id)

  try {
    const findProduct = await getProductbyId(id_product)

    if (!findProduct) {
      return res.status(404).json({ message: "Produto não encontrado." })
    }

    await deleteProduct(id_product)

    res.status(200).json({ message: "Produto deletado com sucesso" })
  } catch (error) {
    res.status(500).json({ message: "Erro ao apagar o produto", error })
  }
})

module.exports = router
