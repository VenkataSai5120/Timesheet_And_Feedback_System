import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const ResetPasswordForm = () => {
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
    navigate("/login"); // Navigate to the login page
  };

  return (
    <Box m="20px">
      <Header title="RESET PASSWORD" subtitle="Reset Your Password" />

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
                  type="password"
                  label="New Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Confirm Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  error={
                    !!touched.confirmPassword && !!errors.confirmPassword
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
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
  password: yup.string().required("required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("required"),
});

const initialValues = {
  password: "",
  confirmPassword: "",
};

const ResetPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <ResetPasswordForm />
    </Box>
  );
};

export default ResetPage;
