const express = require("express")
const router = express.Router()

router.get("/produtos", (req, res) => {
  res.send("Produtos")
})

module.exports = router
