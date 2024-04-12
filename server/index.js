const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const { register } = require("./controllers/auth.js");
const authRoute = require("./routes/auth.js");
const findRoute = require("./routes/find.js");
const resetRoute = require("./routes/reset.js");
const questionsRoute = require("./routes/questions.js");
const projectsRoute = require("./routes/project.js");
const fetchProjectsRoute = require("./routes/fetchProjects.js");
const fetchMappingsRoute = require("./routes/fetchMappings.js");
const fetchEmployeesRoute = require("./routes/fetchEmployees.js");
const timesheetRoute = require("./routes/timesheet.js");
const cors = require('cors');
const bodyparser = require("body-parser");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.post("/auth/register", register);

app.use("/auth", authRoute);
app.use("/find", findRoute);
app.use("/reset", resetRoute);
app.use("/save", questionsRoute);
app.use("/save", projectsRoute);
app.use("/fetch", fetchProjectsRoute);
app.use("/fetch", fetchMappingsRoute);
app.use("/fetch", fetchEmployeesRoute);
app.use("/save", timesheetRoute);

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
