import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Header from "../../components/Header";
import RemoveIcon from "@mui/icons-material/Remove";
import useMediaQuery from "@mui/material/useMediaQuery";
import { format, addDays, subWeeks, addWeeks } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dummyProjects = ["Project A", "Project B", "Project C"];
const dummyTasks = ["Task 1", "Task 2", "Task 3"];

const initialActivities = [
  {
    id: 1,
    type: "BAU",
    name: "",
    task: "",
    tasks: [""],
    comment: "",
    comments: [""],
    hours: [0, 0, 0, 0, 0],
    isRemovable: false,
  },
  {
    id: 2,
    type: "Sales",
    name: "",
    task: "",
    tasks: [""],
    comment: "",
    comments: [""],
    hours: [0, 0, 0, 0, 0],
    isRemovable: false,
  },
];

const TimesheetTable = () => {

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: "BAU",
      name: "",
      task: "",
      tasks: [""],
      comment: "",
      comments: [""],
      hours: [0, 0, 0, 0, 0],
      isRemovable: false,
    },
    {
      id: 2,
      type: "Sales",
      name: "",
      task: "",
      tasks: [""],
      comment: "",
      comments: [""],
      hours: [0, 0, 0, 0, 0],
      isRemovable: false,
    },
  ]);
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  React.useEffect(() => {
    if (!user) {
      toast.error("Make sure to login first!");
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const hasBAU = activities.some((activity) => activity.type === "BAU");
    const hasSales = activities.some((activity) => activity.type === "Sales");
    if (!hasBAU) {
      addActivity("BAU");
    }
    if (!hasSales) {
      addActivity("Sales");
    }
  }, [activities]);

  const addActivity = (type) => {
    const newActivity = {
      id: Date.now(),
      type,
      name: "",
      task: "",
      tasks: [""],
      comment: "",
      comments: [""],
      hours: [0, 0, 0, 0, 0],
      isRemovable: true,
    };
    const currentIndex = activities.findIndex(
      (activity) => activity.type === type
    );
    const nextIndex = currentIndex + 1;

    setActivities((prevActivities) => {
      const newActivities = [...prevActivities];
      newActivities.splice(nextIndex, 0, newActivity);
      return newActivities;
    });
  };

  const removeActivity = (id) => {
    if (activities.length === 2) {
      return;
    }
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  const handleHoursChange = (activityIndex, hourIndex, newValue) => {
    const updatedValue = newValue === "" ? 0 : newValue;
    const parsedValue = parseInt(updatedValue);
    if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 24) {
      const newActivities = [...activities];
      newActivities[activityIndex].hours[hourIndex] = parsedValue.toString();
      setActivities(newActivities);
    }
  };

  const monday = addDays(currentWeek, 1 - currentWeek.getDay());
  const weekdays = [...Array(5).keys()].map((i) => addDays(monday, i));
  const formattedWeekdays = weekdays.map((day) => format(day, "MM/dd/yyyy"));

  const goToPreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const goToNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const getTotalHoursPerDay = (index) => {
    return activities.reduce(
      (total, activity) => total + parseInt(activity.hours[index]),
      0
    );
  };

  const getTotalHours = () => {
    return weekdays.map((day, index) => getTotalHoursPerDay(index));
  };

  const getTotalHoursTotal = () => {
    return getTotalHours().reduce((total, hours) => total + hours, 0);
  };

  const resetActivities = () => {
    setActivities(initialActivities);
  };

  const handleSubmit = async () => {
    try {
      // Extracting required data
      const user = localStorage.getItem("user");
      console.log(user);
      const employeeID = JSON.parse(user).ID;
      const timesheetData = {
        employeeID: employeeID,
        activities: activities.map((activity) => ({
          type: activity.type,
          name: activity.name,
          task: activity.task,
          comment: activity.comment,
          hours: activity.hours,
          totalHours: activity.hours.reduce((acc, cur) => acc + parseInt(cur), 0),
        })),
        dates: formattedWeekdays,
        totalHoursPerDay: getTotalHours(),
        totalHoursPerWeek: getTotalHoursTotal(),
      };

      console.log("Sending data to backend:", timesheetData);
      const savedTimesheetResponse = await fetch(
        "http://localhost:6001/save/timesheet",
        {
          method: "POST",
          body: JSON.stringify(timesheetData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(savedTimesheetResponse)
      console.log("success");
      resetActivities();
      toast.info("Submit the Feedback");
      // Replace console.log with your API call to send data to the backend
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer /> {/* Add ToastContainer here */}
      <Box
        mt={2}
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          "& th, & td": { fontWeight: "bold", color: "secondary.main" },
          "& th:nth-of-type(n+5), & td:nth-of-type(n+5)": { width: "10%" },
          "& th:nth-of-type(2), & td:nth-of-type(2), & th:nth-of-type(3), & td:nth-of-type(3)":
            { width: "15%" },
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header
          title="TimeSheet"
          subtitle="Your TimeSheet, the blueprint of productivity"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "8px",
          }}
        >
          <IconButton onClick={goToPreviousWeek}>{"<"}</IconButton>
          <span style={{ color: "red" }}>
            {format(monday, "MM/dd")} - {format(weekdays[4], "MM/dd")}
          </span>
          <IconButton onClick={goToNextWeek}>{">"}</IconButton>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="5%">Project Type</TableCell>
              <TableCell width="15%">Project Name</TableCell>
              <TableCell width="15%">Task</TableCell>
              <TableCell width="15%">Comment</TableCell>
              {weekdays.map((day, index) => (
                <TableCell key={index}>
                  <div>{format(day, "MM/dd/yyyy")}</div>
                  <div>{format(day, "EEE")}</div>
                </TableCell>
              ))}
              <TableCell width="20%">Total Hours</TableCell>
              <TableCell width="20%"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity, activityIndex) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.type}</TableCell>
                <TableCell>
                  <TextField
                    select
                    value={activity.name}
                    color="secondary"
                    onChange={(e) =>
                      setActivities(
                        activities.map((a) =>
                          a.id === activity.id
                            ? { ...a, name: e.target.value }
                            : a
                        )
                      )
                    }
                  >
                    {dummyProjects.map((project, index) => (
                      <MenuItem key={index} value={project}>
                        {project}
                      </MenuItem>
                    ))}
                  </TextField>
                </TableCell>
                <TableCell>
                  <TextField
                    select
                    value={activity.task}
                    color="secondary"
                    onChange={(e) =>
                      setActivities(
                        activities.map((a) =>
                          a.id === activity.id
                            ? { ...a, task: e.target.value }
                            : a
                        )
                      )
                    }
                  >
                    {dummyTasks.map((task, index) => (
                      <MenuItem key={index} value={task}>
                        {task}
                      </MenuItem>
                    ))}
                  </TextField>
                </TableCell>
                <TableCell>
                  <TextField
                    value={activity.comment}
                    color="secondary"
                    onChange={(e) =>
                      setActivities(
                        activities.map((a) =>
                          a.id === activity.id
                            ? { ...a, comment: e.target.value }
                            : a
                        )
                      )
                    }
                  />
                </TableCell>
                {activity.hours.map((hours, index) => (
                  <TableCell key={index}>
                    <TextField
                      type="number"
                      value={hours}
                      color="secondary"
                      inputProps={{ min: 0, max: 24 }}
                      onChange={(e) =>
                        handleHoursChange(activityIndex, index, e.target.value)
                      }
                    />
                  </TableCell>
                ))}
                <TableCell>
                  {activity.hours.reduce(
                    (acc, cur) => acc + parseInt(cur),
                    0
                  )}
                </TableCell>
                <TableCell>
                  {activity.isRemovable && (
                    <IconButton onClick={() => removeActivity(activity.id)}>
                      <RemoveIcon />
                    </IconButton>
                  )}
                  <IconButton onClick={() => addActivity(activity.type)}>
                    <AddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              {getTotalHours().map((total, index) => (
                <TableCell key={index}>{total}</TableCell>
              ))}
              <TableCell>{getTotalHoursTotal()}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box sx={{ alignSelf: "center", margin: "20px 0" }}>
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default TimesheetTable;
