import { Routes, Route, useLocation } from "react-router-dom";
import ResetPassword from "./scenes/resetPassword";
import ForgotPassword from "./scenes/forgotPassword";
import LoginPage from "./scenes/loginPage";
import HomePage from "./scenes/homePage";
import FeedbackResponse from "./scenes/feedbackResponse";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import TimeSheet from "./scenes/timesheet";
import { useState } from "react";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  // Check if the current route is one of the pages where Sidebar and Topbar should not appear
  const hideSidebarAndTopbar =
  location.pathname.includes("/reset-password") ||
  location.pathname === "/login" ||
  location.pathname === "/forgot-password";


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!hideSidebarAndTopbar && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {!hideSidebarAndTopbar && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/reset-password/:_id" element={<ResetPassword />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/timesheet" element={<TimeSheet />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/feedback-response" element={<FeedbackResponse />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
