import api from "./api"

export async function getStock() {
    const response = await api.get("/api/stock")
  
    return response.data
  }