import api from "./api"

export async function getProducts() {
  const response = await api.get("/api/products")

  return response.data
}

export async function createProduct(data) {
  const dataNewProduct = {
    product_name: data.product_name,
    description: data.description,
    valor: parseFloat(data.valor),
    quantity_stock: Number(data.quantity_stock),
    categoryId: data.categoryId,
  }

  const response = await api.post("/api/products", dataNewProduct)

  return response
}

export async function getProductbyId(id) {
  const response = await api.get(`/api/products/${id}`)

  return response
}

export async function updateProduct(id, data) {
  const dataUpdateProduct = {
    product_name: data.product_name,
    description: data.description,
    valor: parseFloat(data.valor),
    quantity_stock: Number(data.quantity_stock),
    category: data.category,
  }

  const response = await api.put(`/api/products/${id}`, dataUpdateProduct)

  return response
}

export async function deleteProduct(id) {
  const response = await api.delete(`/api/products/${id}`)

  return response
}