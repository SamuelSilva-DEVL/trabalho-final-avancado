import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { router } from "./pages/routes";
import { AppThemeProvider } from "./contexts/ThemeContext";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />

        <ToastContainer position="top-right" theme="colored" autoClose={2000} />
      </AuthProvider>
    </AppThemeProvider>
  )
}

export default App;
