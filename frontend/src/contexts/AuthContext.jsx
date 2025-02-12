import { createContext, useContext, useState } from "react";

const mockUsers = [
  { email: "nando@example.com", name: "Fernando Lima", password: "senha123" },
  { email: "admin@example.com", name: "User Admin", password: "senha123" }
];

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    )
    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem("App:user", "success")
      return { success: true }
    }
    return { success: false, message: "Invalid email or password." }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("App:user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
