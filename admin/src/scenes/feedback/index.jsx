import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../components/Header";

// Dummy data for roles and employees
const departments = [
  {
    name: "Development/Engineering",
    roles: [
      "Software Engineer",
      "Frontend Developer",
      "Backend Developer",
      "Full-stack Developer",
      "DevOps Engineer",
    ],
  },
  {
    name: "Quality Assurance/Testing",
    roles: ["QA Engineer", "Automation Engineer", "Manual Tester", "Test Analyst"],
  },
];

const dummyEmployees = {
  "Software Engineer": ["John Doe", "Jane Smith"],
  "QA Engineer": ["Alice Johnson", "Bob Brown"],
};

const CreateQuestionsPage = () => {
  const [questions, setQuestions] = useState([{ question: "" }]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // Add a new question
  const addQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index + 1, 0, { question: "" });
    setQuestions(updatedQuestions);
  };

  // Delete a question
  const deleteQuestion = (index) => {
    if (questions.length === 1) {
      // Ensure at least one question is present
      return;
    }
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  // Update question text
  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = event.target.value;
    setQuestions(updatedQuestions);
  };

  // Handle role selection
  const handleRoleSelect = (event) => {
    setSelectedRoles(event.target.value);
  };

  // Handle employee selection
  const handleEmployeeSelect = (event) => {
    setSelectedEmployees(event.target.value);
  };

  // Submit the questions along with selected roles and employees
  const handleSubmit = async ({ resetForm }) => {
    if (questions.some(q => q.question.trim() === '') || selectedRoles.length === 0 || selectedEmployees.length === 0) {
      // Display toast message if any input is empty
      toast.error('Please fill in all fields');
    } else {
      // Construct data to send to the backend
      const data = {
        questions: questions.map(question => question.question),
        selectedRoles: selectedRoles,
        selectedEmployees: selectedEmployees
      };

      console.log(data);
  
      try {
        const savedUserResponse = await fetch(
          "http://localhost:6001/auth/register",
          {
            method: "POST",
            body: JSON.stringify(data), 
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const savedUser = await savedUserResponse.json();
        console.log(savedUser);
        resetForm();
  
      } catch (error) {
        console.error("Error registering user:", error);
      }
    }
  };
  
  return (
    <Box m="20px">
      <Header title="Feedback Questions" subtitle="Quest for Clarity: Spark the Conversation with a Question!" />
      {questions.map((q, index) => (
        <Box key={index} display="flex" alignItems="center" marginBottom="10px">
          <TextField
            label={`Question ${index + 1}`}
            value={q.question}
            onChange={(event) => handleQuestionChange(index, event)}
            variant="outlined"
            color="secondary"
            fullWidth
            margin="normal"
          />
          {index === questions.length - 1 && (
            <Button onClick={() => addQuestion(index)} variant="outlined" color="secondary" style={{ marginLeft: "10px" }}>+</Button>
          )}
          {index !== 0 && (
            <Button onClick={() => deleteQuestion(index)} variant="outlined" color="secondary" style={{ marginLeft: "10px" }}>-</Button>
          )}
        </Box>
      ))}
      <Box display="flex" alignItems="center" marginBottom="10px">
        <Select
          multiple
          value={selectedRoles}
          onChange={handleRoleSelect}
          displayEmpty
          variant="outlined"
          color="secondary"
          fullWidth
          margin="normal"
          style={{ marginRight: "10px" }}
        >
          <MenuItem value="" disabled>
            Select Role
          </MenuItem>
          {departments.map((dept) =>
            dept.roles.map((role, idx) => (
              <MenuItem key={idx} value={role}>
                {role}
              </MenuItem>
            ))
          )}
        </Select>
        <Select
          multiple
          value={selectedEmployees}
          onChange={handleEmployeeSelect}
          variant="outlined"
          color="secondary"
          fullWidth
          margin="normal"
        >
          <MenuItem value="" disabled>
            Select Employee
          </MenuItem>
          {selectedRoles.map((role) => (dummyEmployees[role] || []).map((employee, idx) => (
            <MenuItem key={idx} value={employee}>
              {employee}
            </MenuItem>
          )))}
        </Select>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button onClick={handleSubmit} color="secondary" variant="contained">
          Submit
        </Button>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default CreateQuestionsPage;
