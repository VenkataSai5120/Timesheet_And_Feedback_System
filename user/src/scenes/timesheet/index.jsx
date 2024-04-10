import React, { useState } from 'react';
import { Box, Button, TextField, Table, TableHead, TableBody, TableRow, TableCell, IconButton, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import useMediaQuery from "@mui/material/useMediaQuery";

const dummyProjects = ['Project A', 'Project B', 'Project C'];
const dummyTasks = ['Task 1', 'Task 2', 'Task 3'];

const TimesheetTable = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
  const [activities, setActivities] = useState([
    { id: 1, type: 'BAU', name: '', task: '', tasks: [''], comment: '', comments: [''], hours: [0, 0, 0, 0, 0, 0, 0] },
    { id: 2, type: 'Sales', name: '', task: '', tasks: [''], comment: '', comments: [''], hours: [0, 0, 0, 0, 0, 0, 0] }
  ]);

  const addActivity = (type) => {
    const newActivity = { id: Date.now(), type, name: '', task: '', tasks: [''], comment: '', comments: [''], hours: [0, 0, 0, 0, 0, 0, 0] };
    setActivities([...activities, newActivity]);
  };

  const removeActivity = (id) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  return (
    <Box mt={2}
    sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Project Type</TableCell>
            <TableCell>Project Name</TableCell>
            <TableCell>Task</TableCell>
            <TableCell>Comment</TableCell>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <TableCell key={day}>{day}</TableCell>
            ))}
            <TableCell>Total Hours</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activities.map(activity => (
            <TableRow key={activity.id}>
              <TableCell>{activity.type}</TableCell>
              <TableCell>
                <TextField
                  select
                  value={activity.name}
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
                  onChange={(e) => setActivities(activities.map(a => a.id === activity.id ? { ...a, comment: e.target.value } : a))}
                />
              </TableCell>
              {activity.hours.map((hours, index) => (
                <TableCell key={index}>
                  <TextField
                    type="number"
                    value={hours}
                    inputProps={{ min: 0, max: 24 }}
                    onChange={(e) => {
                      const newHours = [...activity.hours];
                      newHours[index] = e.target.value;
                      setActivities(activities.map(a => a.id === activity.id ? { ...a, hours: newHours } : a));
                    }}
                  />
                </TableCell>
              ))}
              <TableCell>{activity.hours.reduce((acc, cur) => acc + parseInt(cur), 0)}</TableCell>
              <TableCell>
                <IconButton onClick={() => addActivity(activity.type)}>
                  <AddIcon />
                </IconButton>
                <IconButton onClick={() => removeActivity(activity.id)}>
                  <RemoveIcon />
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
