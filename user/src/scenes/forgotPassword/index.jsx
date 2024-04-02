import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
    const navigate = useNavigate(); // Hook to access navigation

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const forgotPassword = async (values, { resetForm }) => {
        try {
            const savedUserResponse = await fetch(
              "http://localhost:6001/find/check-user-exist",
              {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const savedUser = await savedUserResponse.json();
            console.log(savedUser);

            if (savedUserResponse.status === 200) {
                toast.success('Check the registered email.');
            } else if (savedUserResponse.status === 404) {
                toast.error('Email ID does not exist.');
            } else {
                toast.error('Please try again after some time.');
            }

            resetForm();
          } catch (error) {
            console.error("Error registering user:", error);
            toast.error('Please try again after some time.');
          }
    };

    const handleFormSubmit = (values, { resetForm }) => {
        console.log(values);
        forgotPassword(values, { resetForm });
    };

    const handleSkipClick = () => {
        navigate("/login"); // Navigate to the login page
    };

    return (
        <Box m="20px">
            <Header title="FORGOT PASSWORD" subtitle="Enter your Email ID!" />

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
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="button" onClick={handleSkipClick} color="secondary" variant="contained">
                                    Back to Login
                                </Button>
                                <Button type="submit" color="secondary" variant="contained" sx={{ ml: 2 }}>
                                    Submit
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
            <ToastContainer />
        </Box>
    );
};

const resetPasswordSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
});

const initialValues = {
    email: "",
};

const LoginPage = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <ForgotPassword />
        </Box>
    );
};

export default LoginPage;
