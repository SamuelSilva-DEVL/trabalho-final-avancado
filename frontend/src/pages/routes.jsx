import { createBrowserRouter } from "react-router-dom"
import DashboardLayoutBasic from "../components/Layout"
import { Home, SignIn, Products, CreateOrEditProduct, Stock } from "@pages"
import { Navigate } from "react-router-dom"

const ValidateReplace = () => {
  const userLogged = localStorage.getItem("App:user") || null

  if (userLogged) {
    return <DashboardLayoutBasic />
  } else {
    return <Navigate to="/sign-in" replace />
  }
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/administrador",
    element: <ValidateReplace />,
    children: [
      {
        path: "/administrador",
        element: <Products />,
      },
      {
        path: "/administrador/cadastrar-produto",
        element: <CreateOrEditProduct />,
      },
      {
        path: "/administrador/editar-produto/:id",
        element: <CreateOrEditProduct />,
      },
      {
        path: "/administrador/estoque",
        element: <Stock />,
      },
    ],
  },
])
