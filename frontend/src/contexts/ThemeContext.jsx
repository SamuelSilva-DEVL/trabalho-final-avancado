import { Box, createTheme, ThemeProvider } from "@mui/material";
import { createContext, useContext } from "react";

const ThemeContext = createContext({});

export const AppThemeProvider = ({ children }) => {
  const theme = createTheme();

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeProvider theme={theme}>
        <Box
          width={"100vw"}
          minHeight={"100vh"}
          bgcolor={theme.palette.background.default}
          sx={{
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
          }}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
};

export function useAppThemeContext() {
  return useContext(ThemeContext);
}
