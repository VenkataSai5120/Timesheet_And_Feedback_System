import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const FeedbackForm = () => {
  const navigate = useNavigate(); // Hook to access navigation

  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Validation schema for feedback
  const validationSchema = yup.object().shape({
    feedback: yup
      .string()
      .required("Feedback is required")
      .max(2000, "Feedback should be less than 2000 characters"),
  });

  // Dummy data of questions
  const questions = [
    "What do you like about our service?",
    "How can we improve our product?",
    "Did you find our website easy to navigate?",
    "What features would you like to see added?",
    "How likely are you to recommend our service to a friend?",
    "What was your main reason for using our service?",
    "Did you encounter any issues while using our product?",
    "How satisfied are you with our customer support?",
    "What other products or services would you like us to offer?",
    "Overall, how would you rate your experience with us?",
  ];

  return (
    <Box m="20px">
      <Header title="Feedback Form" subtitle="We appreciate your feedback!" />
      <Formik
        initialValues={{
          feedback: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          // Handle form submission here
          console.log(values);
          // Reset form after submission
          resetForm();
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            {questions.map((question, index) => (
              <Box key={index} mt={index !== 0 ? 4 : 0}>
                <Typography variant="h6">Question {index + 1}:</Typography>
                <Box p={2} border={1} borderColor="grey.400">
                  <Typography>{question}</Typography>
                </Box>
                <Box mt={2}>
                  {/* <Typography variant="h6">Your Answer:</Typography> */}
                  <TextField
                    multiline
                    fullWidth
                    rows={4}
                    color="secondary"
                    id={`feedback-${index}`}
                    name={`feedback-${index}`}
                    label="Your Feedback"
                    variant="outlined"
                    value={formik.values[`feedback-${index}`]}
                    onChange={formik.handleChange}
                    error={
                      formik.touched[`feedback-${index}`] &&
                      Boolean(formik.errors[`feedback-${index}`])
                    }
                    helperText={
                      formik.touched[`feedback-${index}`] &&
                      formik.errors[`feedback-${index}`]
                    }
                  />
                </Box>
              </Box>
            ))}
            <Box display="flex" justifyContent="center" margin={"20px"}>
              <Button
                mt={2}
                variant="contained"
                color="secondary"
                type="submit"
              >
                Submit Feedback
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default FeedbackForm;
