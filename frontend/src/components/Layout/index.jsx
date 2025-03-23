import { useState, useMemo } from "react"
import { createTheme } from "@mui/material/styles"
import { AppProvider } from "@toolpad/core/AppProvider"
import { DashboardLayout } from "@toolpad/core/DashboardLayout"
import { Outlet, useNavigate } from "react-router-dom"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import LogoutIcon from "@mui/icons-material/Logout"
import InventoryIcon from "@mui/icons-material/Inventory"
import { useAuth } from "../../contexts/AuthContext"
import { Typography, Box, Avatar } from "@mui/material"

import "./layout.css"

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

function useDemoRouter(initialPath) {
  const useNavigatePath = useNavigate()
  const [pathname, setPathname] = useState(initialPath)

  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        setPathname(String(path)), useNavigatePath(String(path))
      },
    }
  }, [pathname])

  return router
}

function DashboardLayoutBasic() {
  const router = useDemoRouter("/administrador")
  const { logout, user } = useAuth()

  const IMAGE_USER = localStorage.getItem("@Image_user")

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
      router={router}
      theme={demoTheme}
      branding={{
        logo: "",
        title: "AVANTI",
        homeUrl: "/administrador",
      }}
    >
      <DashboardLayout
        branding={{
          title: (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
              }}
              className="navbar-layout"
            >
              AVANTI
              <Avatar
                alt={`Imagem Usuário`}
                src={IMAGE_USER}
                sx={{ zIndex: 1, pointerEvents: "none" }}
              />
            </Box>
          ),
        }}
      >
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  )
}

export default DashboardLayoutBasic
