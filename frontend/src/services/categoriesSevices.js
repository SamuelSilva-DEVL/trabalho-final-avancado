import api from "./api"

export async function getCategories() {
    const response = await api.get("/api/categories")
  
    return response.data
  }
  
  export async function createCategory(data) {
    const dataNewCategory = {
      name: data.name,
    }

    const response = await api.post("/api/products", dataNewCategory)

    return response
  }

  export async function getCategoriesById(id) {
    const response = await api.get(`/api/categories/${id}`)

    return response
  }

  export async function updateCategory(id, data) {
    const dataUpdateCategory = {
      name: data.name,
    }

    const response = await api.put(`/api/categories/${id}`, dataUpdateCategory)

    return response
  }
  
  export async function deleteCategories(id) {
    const response = await api.delete(`/api/categories/${id}`)
  
    return response
  }