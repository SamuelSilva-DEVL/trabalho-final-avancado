import api from "./api"

export async function getProducts() {
  const response = await api.get("/api/products")

  return response.data
}
