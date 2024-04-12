import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  FormControl,
  InputLabel,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
} from "@mui/material";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../components/Header";

const CreateQuestionsPage = () => {
  const [questions, setQuestions] = useState([{ question: "" }]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState({});
  const [dummyRoles, setDummyRoles] = useState([]);
  const [dummyEmployees, setDummyEmployees] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:6001/fetch/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const projectsData = await response.json();

          const tempRoles = [];
          const tempEmployees = {};

          projectsData.forEach(project => {
            tempRoles.push(project.projectName);
            tempEmployees[project.projectName] = project.projectMembers;
          });

          setDummyRoles(tempRoles);
          setDummyEmployees(tempEmployees);
        } else {
          throw new Error("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Handle error, show toast, etc.
      }
    };

    fetchProjects();
  }, []);

  const addQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index + 1, 0, { question: "" });
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (index) => {
    if (questions.length === 1) {
      return;
    }
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleRoleSelect = (event) => {
    const role = event.target.value;
    setSelectedRole(role);
    setSelectedEmployees({
      ...selectedEmployees,
      [role]: selectedEmployees[role] || [],
    });
  };

  const handleEmployeeChange = (employees) => {
    setSelectedEmployees({
      ...selectedEmployees,
      [selectedRole]: employees,
    });
  };

  const resetForm = () => {
    setQuestions([{ question: "" }]);
    setSelectedRole("");
    setSelectedEmployees({});
  };

  const handleSubmit = async () => {
    if (
      questions.some((q) => q.question.trim() === "") ||
      !Object.keys(selectedEmployees).length
    ) {
      toast.error("Please fill in all fields");
    } else {
      const data = {
        questions: questions.map((question) => question.question),
        selectedEmployees: selectedEmployees,
      };

      try {
        const savedUserResponse = await fetch(
          "http://localhost:6001/save/questions",
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const savedUser = await savedUserResponse.json();
        console.log(savedUser)
        if (savedUserResponse.ok) {
          toast.success("Feedback questions saved successfully");
        }
        resetForm();
      } catch (error) {
        toast.error("Please try again!");
        console.error("Error registering user:", error);
      }
    }
  };

  const removeEmployee = (employee) => {
    const updatedEmployees = selectedEmployees[selectedRole].filter(emp => emp !== employee);
    setSelectedEmployees(prevState => ({
      ...prevState,
      [selectedRole]: updatedEmployees,
    }));
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
      <Box mb={3}>
        <FormControl fullWidth>
          <InputLabel>Select Project</InputLabel>
          <Select
            value={selectedRole}
            color="secondary"
            onChange={handleRoleSelect}
          >
            <MenuItem value="" disabled>Select Project</MenuItem>
            {dummyRoles.map((role, index) => (
              <MenuItem key={index} value={role}>{role}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {selectedRole && (
        <Box mb={3}>
          <FormControl fullWidth>
            <InputLabel>Select Employees</InputLabel>
            <Select
              multiple
              value={selectedEmployees[selectedRole] || []}
              color="secondary"
              onChange={(e) => handleEmployeeChange(e.target.value)}
            >
              {dummyEmployees[selectedRole]?.map((employee, index) => (
                <MenuItem key={index} value={employee}>{employee}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      <Box display="flex" justifyContent="center">
        <Button onClick={handleSubmit} color="secondary" variant="contained">
          Submit
        </Button>
      </Box>
      <Box mt={3}>
        {Object.keys(selectedEmployees).map((role) => (
          <Box key={role} mt={3}>
            <Typography variant="h6" color="secondary">{role}</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedEmployees[role]?.map((employee, index) => (
                    <TableRow key={index}>
                      <TableCell>{employee}</TableCell>
                      <TableCell>
                        <IconButton
                          color="secondary"
                          onClick={() => removeEmployee(employee)}
                        >
                          Remove
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))}
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default CreateQuestionsPage;
