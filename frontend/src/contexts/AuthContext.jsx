import { createContext, useContext, useState } from "react";

import { signIn } from "../services/adminServices"
import { toast } from "react-toastify"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = async (email, password) => {
    const data = {
      email,
      password,
    }

    const response = await signIn(data)

    if (response.status > 300) {
      console.log("erro no login")
      return {
        success: false,
        message: response.data.error ?? "",
      }
    }

    localStorage.setItem("@App:T", window.btoa(response.data.token.toString()))
    localStorage.setItem("@Image_user", response.data.user.image.toString())

    setUser(response.data.user)

    toast.success("Bem-vindo de volta, " + response.data.user.name + "!", {
      autoClose: 3000,
    })

    return {
      success: true,
    }
  }

  const logout = () => {
    localStorage.removeItem("@App:T")

    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}
