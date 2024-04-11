import React, { useState, useEffect } from 'react';
import { Box, IconButton, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Header from '../../components/Header';
import RemoveIcon from '@mui/icons-material/Remove';
import useMediaQuery from "@mui/material/useMediaQuery";
import { format, addDays } from 'date-fns'; // Import date-fns functions for date formatting and manipulation

const dummyProjects = ['Project A', 'Project B', 'Project C'];
const dummyTasks = ['Task 1', 'Task 2', 'Task 3'];

const TimesheetTable = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [activities, setActivities] = useState([
    { id: 1, type: 'BAU', name: '', task: '', tasks: [''], comment: '', comments: [''], hours: [0, 0, 0, 0, 0, 0, 0], isRemovable: false },
    { id: 2, type: 'Sales', name: '', task: '', tasks: [''], comment: '', comments: [''], hours: [0, 0, 0, 0, 0, 0, 0], isRemovable: false }
  ]);

  useEffect(() => {
    const hasBAU = activities.some(activity => activity.type === 'BAU');
    const hasSales = activities.some(activity => activity.type === 'Sales');
    if (!hasBAU) {
      addActivity('BAU');
    }
    if (!hasSales) {
      addActivity('Sales');
    }
  }, [activities]);

  const addActivity = (type) => {
    const newActivity = { id: Date.now(), type, name: '', task: '', tasks: [''], comment: '', comments: [''], hours: [0, 0, 0, 0, 0, 0, 0], isRemovable: true };
    const currentIndex = activities.findIndex(activity => activity.type === type);
    const nextIndex = currentIndex + 1;
    
    setActivities(prevActivities => {
      const newActivities = [...prevActivities];
      newActivities.splice(nextIndex, 0, newActivity);
      return newActivities;
    });
  };

  const removeActivity = (id) => {
    if (activities.length === 2) {
      return; // Prevent removing the last BAU or Sales activity
    }
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const handleHoursChange = (activityIndex, hourIndex, newValue) => {
    // Check if the entered value is empty string
    const updatedValue = newValue === '' ? 0 : newValue; // Set to 0 if the entered value is empty string
    const parsedValue = parseInt(updatedValue);
    if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 24) {
      const newActivities = [...activities];
      newActivities[activityIndex].hours[hourIndex] = parsedValue.toString(); // Convert the parsed value back to string
      setActivities(newActivities);
    }
  };

  // Get the current date and generate dates for each day of the week starting from Monday
  const currentDate = new Date();
  const monday = addDays(currentDate, 1 - currentDate.getDay()); // Get Monday of the current week
  const weekdays = [...Array(7).keys()].map(i => addDays(monday, i));
  const formattedWeekdays = weekdays.map(day => format(day, 'MM/dd/yyyy'));

  return (
    <Box mt={2} sx={{
      "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      "& th, & td": { fontWeight: 'bold', color: 'secondary.main' }
    }}>
      <Header title="TimeSheet" subtitle="Your TimeSheet, the blueprint of productivity" />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Project Type</TableCell>
            <TableCell>Project Name</TableCell>
            <TableCell>Task</TableCell>
            <TableCell>Comment</TableCell>
            {weekdays.map((day, index) => (
              <TableCell key={index}>
                <div>{format(day, 'MM/dd')}</div>
                <div>{format(day, 'EEEE')}</div>
              </TableCell>
            ))}
            <TableCell>Total Hours</TableCell>
            <TableCell></TableCell>
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
                  onChange={(e) => setActivities(activities.map(a => a.id === activity.id ? { ...a, name: e.target.value } : a))}
                >
                  {dummyProjects.map((project, index) => (
                    <MenuItem key={index} value={project}>{project}</MenuItem>
                  ))}
                </TextField>
              </TableCell>
              <TableCell>
                <TextField
                  select
                  value={activity.task}
                  color="secondary"
                  onChange={(e) => setActivities(activities.map(a => a.id === activity.id ? { ...a, task: e.target.value } : a))}
                >
                  {dummyTasks.map((task, index) => (
                    <MenuItem key={index} value={task}>{task}</MenuItem>
                  ))}
                </TextField>
              </TableCell>
              <TableCell>
                <TextField
                  value={activity.comment}
                  color="secondary"
                  onChange={(e) => setActivities(activities.map(a => a.id === activity.id ? { ...a, comment: e.target.value } : a))}
                />
              </TableCell>
              {activity.hours.map((hours, index) => (
                <TableCell key={index}>
                  <TextField
                    type="number"
                    value={hours}
                    color="secondary"
                    inputProps={{ min: 0, max: 24 }}
                    onChange={(e) => handleHoursChange(activityIndex, index, e.target.value)}
                  />
                </TableCell>
              ))}
              <TableCell>{activity.hours.reduce((acc, cur) => acc + parseInt(cur), 0)}</TableCell>
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
        </TableBody>
      </Table>
    </Box>
  );
};

export default TimesheetTable;