import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate(); // Hook to access navigation

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const resetPassword = async (values, { resetForm }) => {
    try {
      // Logic to reset password goes here
      console.log("Resetting password with values:", values);
      resetForm();
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  const handleFormSubmit = (values, { resetForm }) => {
    resetPassword(values, { resetForm });
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
