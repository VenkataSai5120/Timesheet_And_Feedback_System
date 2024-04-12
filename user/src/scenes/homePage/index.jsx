import { Box } from "@mui/material";
import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications
import { useNavigate } from "react-router-dom"; // Import the navigate function from react-router-dom
import robotImage from "./robot.png";
import React from "react";

const LoginForm = () => {
  return (
    <Box m="20px">
      <Header title="HOLD ON" subtitle="We are working on it!" />
    </Box>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  React.useEffect(() => {
    if (!user) {
      toast.error("Make sure to login first!");
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <>
      <ToastContainer />;
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <LoginForm />
        <img src={robotImage} alt="Placeholder" style={{ maxWidth: "100%", marginTop: "20px" }} />
      </Box>
    </>
  );
};

export default LoginPage;
