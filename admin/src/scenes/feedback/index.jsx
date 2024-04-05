import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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
  const [questions, setQuestions] = useState([{ question: "", roles: [], employees: [] }]);

  // Add a new question
  const addQuestion = () => {
    setQuestions([...questions, { question: "", roles: [], employees: [] }]);
  };

  // Delete a question
  const deleteQuestion = (index) => {
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
  const handleRoleSelect = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].roles = event.target.value;
    setQuestions(updatedQuestions);
  };

  // Handle employee selection
  const handleEmployeeSelect = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].employees = event.target.value;
    setQuestions(updatedQuestions);
  };

  // Handle employee checkbox selection
const handleEmployeeCheckbox = (questionIndex, event, employee) => {
  const isChecked = event.target.checked;
  const updatedQuestions = [...questions];
  const updatedEmployees = [...updatedQuestions[questionIndex].employees];

  if (isChecked) {
    updatedEmployees.push(employee);
  } else {
    const employeeIndex = updatedEmployees.indexOf(employee);
    if (employeeIndex !== -1) {
      updatedEmployees.splice(employeeIndex, 1);
    }
  }

  updatedQuestions[questionIndex].employees = updatedEmployees;
  setQuestions(updatedQuestions);
};


  return (
    <Box m="20px">
      <Header title="Feedback Questions" subtitle="Quest for Clarity: Spark the Conversation with a Question!" />
      {questions.map((q, index) => (
        <Box key={index} display="flex" alignItems="center">
          <TextField
            label={`Question ${index + 1}`}
            value={q.question}
            onChange={(event) => handleQuestionChange(index, event)}
            variant="outlined"
            color="secondary"
            fullWidth
            margin="normal"
          />
          <Select
            multiple
            value={q.roles}
            onChange={(event) => handleRoleSelect(index, event)}
            displayEmpty
            variant="outlined"
            color="secondary"
            fullWidth
            margin="normal"
            sx={{ marginLeft: "10px" }}
            renderValue={(selected) => renderSelectedCount(selected, departments.reduce((acc, dept) => acc.concat(dept.roles), []).length)}
          >
            <MenuItem value="" disabled>
              Select Role
            </MenuItem>
            {departments.map((dept) =>
              dept.roles.map((role, idx) => (
                <MenuItem key={idx} value={role}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={q.roles.indexOf(role) > -1}
                        color="secondary"
                      />
                    }
                    label={role}
                  />
                </MenuItem>
              ))
            )}
          </Select>
          <Select
  multiple
  value={q.employees}
  onChange={(event) => handleEmployeeSelect(index, event)}
  displayEmpty
  variant="outlined"
  color="secondary"
  fullWidth
  margin="normal"
  sx={{ marginLeft: "10px" }}
  renderValue={(selected) => renderSelectedCount(selected, (dummyEmployees[q.roles[0]] || []).length)}
>
  <MenuItem value="" disabled>
    Select Employee
  </MenuItem>
  {q.roles.map((role) => (
    <div key={role}>
      <MenuItem disabled>{role}</MenuItem>
      {(dummyEmployees[role] || []).map((employee, idx) => (
        <MenuItem key={idx} value={employee}>
          <FormControlLabel
            control={
              <Checkbox
                checked={q.employees.indexOf(employee) > -1}
                onChange={(event) => handleEmployeeCheckbox(index, event, employee)}
                color="secondary"
              />
            }
            label={employee}
          />
        </MenuItem>
      ))}
    </div>
  ))}
</Select>

          <Button onClick={addQuestion} color="secondary" variant="outlined" sx={{ marginLeft: "10px" }}>
            +
          </Button>
          {questions.length > 1 && (
            <Button
              onClick={() => deleteQuestion(index)}
              color="secondary"
              variant="outlined"
              sx={{ marginLeft: "10px" }}
            >
              -
            </Button>
          )}
        </Box>
      ))}
    </Box>
  );
};

const renderSelectedCount = (selected) => {
  return `${selected.length}`;
};



export default CreateQuestionsPage;