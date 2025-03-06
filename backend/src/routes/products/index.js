const express = require("express")
const router = express.Router()

const { getProducts } = require("../../../controllers/produtctController")

router.get("/products", async (req, res) => {
  const data = await getProducts()

  res.status(200).json(data)
})

module.exports = router
