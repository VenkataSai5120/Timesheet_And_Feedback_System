import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Typography,
} from "@mui/material";
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    IconButton,
} from '@mui/material';

import { Formik, Form } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const validationSchema = yup.object({
    projectName: yup.string().required("Project name is required"),
    fromDate: yup.date().required("From date is required"),
    endDate: yup.date().required("End date is required"),
    projectManager: yup.string().required("Project manager is required"),
    description: yup.string().required("Description is required"),
});

const dummyRoles = [];

const dummyEmployees = {};

const dummyProjectManagers = [
    "Project Manager 1",
    "Project Manager 2",
    "Project Manager 3",
];

const CreateProjectForm = () => {
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedEmployees, setSelectedEmployees] = useState({});

    useEffect(() => {
        const fetchProjects = async () => {
          try {
            const response = await fetch("http://localhost:6001/fetch/mappings", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });
       
            if (response.ok) {
              const projectsData = await response.json();
              console.log(projectsData)
      
              // Push project names into projects1 array
              projectsData.forEach(project => {
                dummyRoles.push(project.role);
                
                // Map project names to employees
                dummyEmployees[project.role] = project.employees;
              });
    
              console.log(dummyRoles);
              console.log(dummyEmployees);
              
              // Update state to trigger re-rendering
              // setProjects([...projectsData.map(project => project.projectName)]);
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

    const handleRoleChange = (role) => {
        setSelectedRole(role);
    };

    const handleEmployeeChange = (employees) => {
        setSelectedEmployees({
            ...selectedEmployees,
            [selectedRole]: employees,
        });
    };

    const removeEmployee = (role, employee) => {
        const updatedEmployees = selectedEmployees[role].filter(emp => emp !== employee);
        setSelectedEmployees({
            ...selectedEmployees,
            [role]: updatedEmployees,
        });
    };

    const handleSubmit = async (values, actions) => {
        try {
            const formData = {
                projectName: values.projectName,
                fromDate: values.fromDate,
                endDate: values.endDate,
                projectManager: values.projectManager,
                description: values.description,
                selectedEmployees: selectedEmployees,
            };
            // Simulating form submission delay with setTimeout

            const savedProjectResponse = await fetch(
                "http://localhost:6001/save/project",
                {
                  method: "POST",
                  body: JSON.stringify(formData), 
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

            console.log(savedProjectResponse);
            setTimeout(() => {
                // Reset form after successful submission
                actions.resetForm();
                setSelectedRole(""); // Reset selected role
                setSelectedEmployees({}); // Reset selected employees
                toast.success('Project created successfully');
            }, 1000);
        } catch (error) {
            console.error('Error creating project:', error.message);
            toast.error('Failed to create project');
        }
    };

    return (
        <Box m="20px">
            <Header title="CREATE PROJECT" subtitle="Create a New Project" />
            <Formik
                initialValues={{
                    projectName: "",
                    fromDate: "",
                    endDate: "",
                    projectManager: "",
                    description: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => handleSubmit(values, actions)}
            >
                {({ errors, touched, values, handleChange, handleBlur }) => (
                    <Form>
                        <Box mb={3}>
                            <TextField
                                name="projectName"
                                label="Project Name"
                                fullWidth
                                color="secondary"
                                value={values.projectName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.projectName && !!errors.projectName}
                                helperText={touched.projectName && errors.projectName}
                            />
                        </Box>
                        <Box display="flex" flexDirection="row" mb={3}>
                            <Box mr={2}>
                                <TextField
                                    name="fromDate"
                                    label="From Date"
                                    type="date"
                                    color="secondary"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={values.fromDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.fromDate && !!errors.fromDate}
                                    helperText={touched.fromDate && errors.fromDate}
                                    sx={{ gridColumn: "span 2" }}
                                />
                            </Box>
                            <Box>
                                <TextField
                                    name="endDate"
                                    label="End Date"
                                    type="date"
                                    color="secondary"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={values.endDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.endDate && !!errors.endDate}
                                    helperText={touched.endDate && errors.endDate}
                                    sx={{ gridColumn: "span 2" }}
                                />
                            </Box>
                        </Box>
                        <Box mb={3}>
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                label="Project Manager"
                                color="secondary"
                                value={values.projectManager} // Use Formik values instead of selectedProjectManager
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="projectManager"
                                error={touched.projectManager && !!errors.projectManager}
                                helperText={touched.projectManager && errors.projectManager}
                            >
                                {dummyProjectManagers.map((manager) => (
                                    <MenuItem key={manager} value={manager}>
                                        {manager}
                                    </MenuItem>
                                ))}
                            </TextField>

                        </Box>
                        <Box mb={3}>
                            <TextField
                                name="description"
                                label="Description"
                                fullWidth
                                color="secondary"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.description && !!errors.description}
                                helperText={touched.description && errors.description}
                            />
                        </Box>
                        <Box mb={3}>
                            <FormControl fullWidth>
                                <InputLabel>Select Role</InputLabel>
                                <Select
                                    name="role"
                                    value={selectedRole}
                                    color="secondary"
                                    onChange={(e) => handleRoleChange(e.target.value)}
                                >
                                    {dummyRoles.map((role, index) => (
                                        <MenuItem key={index} value={role}>
                                            {role}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        {selectedRole && (
                            <Box mb={3}>
                                <FormControl fullWidth>
                                    <InputLabel>Select Employees</InputLabel>
                                    <Select
                                        name="employees"
                                        multiple
                                        value={selectedEmployees[selectedRole] || []}
                                        color="secondary"
                                        onChange={(e) => handleEmployeeChange(e.target.value)}
                                    >
                                        {dummyEmployees[selectedRole].map((employee, index) => (
                                            <MenuItem key={index} value={employee}>
                                                {employee}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        )}
                        <Box display="flex" justifyContent="center" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create Project
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
            <Box mt={3}>
                {Object.keys(selectedEmployees).map((role) => (
                    <Box key={role} mt={3}>
                        <Typography variant="h6" color="secondary" mb={1}>
                            {role}
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {selectedEmployees[role].map((employee, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{employee}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => removeEmployee(role, employee)}
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

export default CreateProjectForm;
