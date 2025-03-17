const { Products } = require("../models/productModel")

const getProducts = async () => {
  const response = await Products.findMany({
    include: {
      category: {
        select: { nome: true, id: true }
      }
    }
  });
  
  // Reformata a resposta para remover o objeto "category"
  return response.map((product) => ({
    id: product.id,
    product_name: product.product_name,
    categoryId: product.category.id,
    categoryName: product.category.nome, // Usa "nome" da categoria
    description: product.description,
    price: product.price,
    quantity_stock: product.quantity_stock,
    image: product.image,
  }))
};


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
