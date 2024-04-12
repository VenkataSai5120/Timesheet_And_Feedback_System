import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

const FeedbackForm = () => {
  const navigate = useNavigate(); // Hook to access navigation
  const [questions, setQuestions] = useState([]);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const user = localStorage.getItem("user");
  React.useEffect(() => {
    if (!user) {
      toast.error("Make sure to login first!");
      navigate("/login");
    }
  }, [user, navigate]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const ID = JSON.parse(user).ID;
        const response = await fetch("http://localhost:6001/fetch/questions", {
          method: "POST",
          body: JSON.stringify({ID}),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json(); // Read response once
          console.log(data); // Check the value of data
          setQuestions(data); // Use the data
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  

  // Validation schema for feedback
  const validationSchema = yup.object().shape({
    feedback: yup
      .string()
      .required("Feedback is required")
      .max(2000, "Feedback should be less than 2000 characters"),
  });

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
