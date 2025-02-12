import { createTheme } from "@mui/material/styles"
import { AppProvider } from "@toolpad/core/AppProvider"
import { DashboardLayout } from "@toolpad/core/DashboardLayout"
import { useDemoRouter } from "@toolpad/core/internal"
import { Outlet, useNavigate } from "react-router-dom"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import LogoutIcon from "@mui/icons-material/Logout"
import InventoryIcon from "@mui/icons-material/Inventory"
import { useAuth } from "../../contexts/AuthContext"

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: false },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
})

function DashboardLayoutBasic() {
  const router = useDemoRouter("/administrador")
  const navigate = useNavigate()
  const { logout } = useAuth()

  const logoutAction = () => {
    logout()
  }

  const NAVIGATION = [
    {
      kind: "header",
      title: "Menu",
    },
    {
      segment: "administrador",
      title: "Produtos",
      icon: <ShoppingCartIcon />,
    },
    {
      segment: "administrador/estoque",
      title: "Estoque",
      icon: <InventoryIcon />,
    },
    {
      kind: "divider",
    },
    {
      segment: "sign-in",
      title: "",
      icon: <LogoutIcon />,
      action: (
        <button
          type="button"
          style={{
            width: "100%",
            height: "100%",
            fontSize: "16px",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
          onClick={() => {
            logoutAction()
          }}
        >
          Sair
        </button>
      ),
    },
  ]

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={{
        ...router,
        navigate(path) {
          navigate(path)
        },
      }}
      theme={demoTheme}
      branding={{
        logo: "",
        title: "AVANTI",
        homeUrl: "/",
      }}
    >
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  )
}

export default DashboardLayoutBasic
