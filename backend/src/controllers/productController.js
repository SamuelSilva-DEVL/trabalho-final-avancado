const { Products } = require("../models/productModel")

const getProducts = async () => {
  const response = await Products.findMany()

  return response
}

const getProductbyId = async (id) => {
  const id_product = parseInt(id)
  const response = await Products.findUnique({ where: { id: id_product } })

  return response
}

const createProduct = async (data) => {
  const response = await Products.create({ data })

  return response
}

const updateProduct = async (id, data) => {
  const id_product = parseInt(id)
  const response = await Products.update({ where: { id: id_product }, data })

  return response
}

const deleteProduct = async (id) => {
  const id_product = parseInt(id)
  const response = await Products.delete({ where: { id: id_product } })

  return response
}

module.exports = {
  getProducts,
  getProductbyId,
  createProduct,
  updateProduct,
  deleteProduct,
}
