import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { router } from "./pages/routes";
import { AppThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AppThemeProvider>
  );
}

export default App;
