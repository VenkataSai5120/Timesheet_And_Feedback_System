import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const navigate = useNavigate(); // Hook to access navigation

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const loginProcess = async (values, { resetForm }) => {
    try {
      // Logic to reset password goes here
      console.log(values);
      const response = await fetch(
        "http://localhost:6001/auth/login",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log("Logged in successfully", data.user)
        toast.success("Logged in successfully");
        navigate("/home");
      } 
      resetForm();
    } catch (error) {
      toast.error("Error logging in");
      console.error("Error logging in:", error);
      resetForm();
    }
  };


  const handleFormSubmit = (values, { resetForm }) => {
    loginProcess(values, { resetForm });
    navigate("/home"); // Navigate to the login page
  };

  const handleSkipClick = () => {
    navigate("/forgot-password"); // Navigate to the login page
  };

  return (
    <Box m="20px">
      <Header title="
LOGIN CREDENTIALS" subtitle="Unlock Your Digital World!" />

      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={resetPasswordSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={
                    !!touched.password && !!errors.password
                  }
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="button" onClick={handleSkipClick} color="secondary" variant="contained">
                  Forgot Password
                </Button>
                <Button type="submit" color="secondary" variant="contained" sx={{ ml: 2 }}>
                  Submit
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const resetPasswordSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
