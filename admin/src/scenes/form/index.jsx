import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    roles: [
      "QA Engineer",
      "Automation Engineer",
      "Manual Tester",
      "Test Analyst",
    ],
  },
  {
    name: "Product Management",
    roles: ["Product Manager", "Product Owner", "Business Analyst"],
  },
  {
    name: "Design/User Experience (UX)",
    roles: ["UX Designer", "UI Designer", "Interaction Designer", "Visual Designer"],
  },
  {
    name: "Technical Support",
    roles: [
      "Technical Support Engineer",
      "Customer Support Specialist",
      "Helpdesk Technician",
    ],
  },
  {
    name: "Sales/Business Development",
    roles: [
      "Sales Representative",
      "Account Executive",
      "Business Development Manager",
    ],
  },
  {
    name: "Marketing",
    roles: ["Marketing Manager", "Content Writer", "SEO Specialist", "Social Media Manager"],
  },
  {
    name: "Human Resources",
    roles: ["HR Manager", "Recruiter", "HR Generalist"],
  },
  {
    name: "Finance/Accounting",
    roles: ["Accountant", "Financial Analyst", "Controller"],
  },
  {
    name: "Legal/Compliance",
    roles: ["Legal Counsel", "Compliance Officer"],
  },
  {
    name: "Operations/Infrastructure",
    roles: ["Operations Manager", "Systems Administrator", "Network Engineer"],
  },
  {
    name: "Research and Development (R&D)",
    roles: ["Research Scientist", "R&D Engineer"],
  },
  {
    name: "Customer Success/Client Services",
    roles: ["Customer Success Manager", "Client Services Representative"],
  },
  {
    name: "Project Management",
    roles: ["Project Manager", "Scrum Master"],
  },
  {
    name: "IT/Administration",
    roles: ["IT Administrator", "Office Administrator"],
  },
];

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [filteredRoles, setFilteredRoles] = useState([]);

  const handleDepartmentChange = (departmentName) => {
    const selectedDepartment = departments.find(
      (dept) => dept.name === departmentName
    );
    setFilteredRoles(selectedDepartment?.roles || []);
  };

  const register = async (values, { resetForm }) => {
    try {
      const savedUserResponse = await fetch(
        "http://localhost:6001/auth/register",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const savedUser = await savedUserResponse.json();
      if (savedUserResponse.status === 200) {
        toast.success('User created successfully!');
      } else if (savedUserResponse.status === 400) {
          toast.error('Email ID already exists!');
      } else {
          toast.error('Please try again after some time.');
      }
      console.log(savedUser);
      resetForm();

    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleFormSubmit = (values, { resetForm }) => {
    console.log(values);
    register(values, { resetForm });
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                color= "secondary"
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                color= "secondary"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                select
                fullWidth
                variant="filled"
                label="Department"
                color= "secondary"
                value={values.department}
                onChange={(e) => {
                  handleChange(e);
                  handleDepartmentChange(e.target.value);
                }}
                name="department"
                error={!!touched.department && !!errors.department}
                helperText={touched.department && errors.department}
                sx={{ gridColumn: "span 4" }}
              >
                {departments.map((dept) => (
                  <MenuItem key={dept.name} value={dept.name}>
                    {dept.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                fullWidth
                variant="filled"
                label="Role"
                value={values.role}
                color= "secondary"
                onChange={handleChange}
                name="role"
                error={!!touched.role && !!errors.role}
                helperText={touched.role && errors.role}
                sx={{ gridColumn: "span 4" }}
              >
                {filteredRoles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                color= "secondary"
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                color= "secondary"
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
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
                color= "secondary"
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string(),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  password: yup.string().required("required"),
  department: yup.string().required("required"),
  role: yup.string().required("required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  password: "",
  department: "",
  role: "",
};

export default Form;
