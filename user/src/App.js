import { Routes, Route } from "react-router-dom";
import ResetPassword from "./scenes/resetPassword";
import ForgotPassword from "./scenes/forgotPassword";
import LoginPage from "./scenes/loginPage";
import HomePage from "./scenes/homePage";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Routes>
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
