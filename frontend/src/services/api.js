import axios from "axios"
import { toast } from "react-toastify"

const api = axios.create({
  baseURL: "http://localhost:3000",
})

//Setando o token global no header das requisições
api.interceptors.request.use((config) => {
  let data = localStorage.getItem("@App:T")

  if (data) {
    data = window.atob(data)
  }

  if (config.headers) {
    if (data) {
      config.headers["Authorization"] = `Bearer ${Object.values(data).join("")}`
    } else {
      config.headers["Authorization"] = ""
    }
  }
  return config
})

//validando se o usuario esta com token ativo
// api.interceptors.response.use(
//   function (response) {
//     let dataUserLogged = localStorage.getItem("@App:T") || ""

//     if (response && response.status === 401) {
//       toast.error("Token inválido, realize o login novamente.")

//       if (dataUserLogged) {
//         localStorage.clear()
//         window.location.href = "/sign-in"
//       }

//       return Promise.reject(response)
//     }

//     return response
//   },
//   function (error) {
//     let dataUserLogged = localStorage.getItem("@App:T") || ""

//     if (error.response && error.response.status === 401) {
//       toast.error("Token inválido, realize o login novamente.")

//       if (dataUserLogged) {
//         localStorage.clear()
//         sessionStorage.clear()
//         window.location.href = "/sign-in"
//       }
//     }

//     if (axios.isAxiosError(error)) {
//       if (!error.response) {
//         toast.error(
//           "Erro ao conectar com o servidor, recarregue a página e tente novamente.",
//           {
//             autoClose: 6000,
//           }
//         )
//       }
//     }

//     return Promise.reject(error)
//   }
// )

export default api
