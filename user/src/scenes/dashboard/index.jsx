import { Box } from "@mui/material";
import Header from "../../components/Header"; 
import robotImage from "./robot.png"; // Import the image file

const LoginForm = () => {
  return (
    <Box m="20px">
      <Header title="HOLD ON" subtitle="We are working on it!" />
    </Box>
  );
};

const LoginPage = () => {
  return (
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
  );
};

export default LoginPage;