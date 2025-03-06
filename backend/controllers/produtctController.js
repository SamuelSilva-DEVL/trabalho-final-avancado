const { Products } = require("../models/productModel")

const getProducts = async () => {
  const response = await Products.findMany()

  return response
}

module.exports = { getProducts }
