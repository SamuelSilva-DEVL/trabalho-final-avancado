import api from "./api"

export async function signIn(data) {
  const response = await api.post("/auth/signin", data, {
    validateStatus: (status) => {
      return status >= 200
    },
  })

  return response
}
