import React, { useState, useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Define the columns
  const columns = [
    { field: "ID", headerName: "ID" },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "contact",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
    {
      field: "timesheets",
      headerName: "Access",
      flex: 1,
      renderCell: () => {
        return (
          <Button variant="contained" color="secondary" sx={{ ...(theme.palette.mode === 'dark' ? { color: 'white' } : {}) }} onClick={() => handleTimesheetsClick()}>
            Timesheets
          </Button>
        );
      },
    },
  ];

  // State to hold the fetched data
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:6001/fetch/employees", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const projectsData = await response.json();
          const dataWithIds = projectsData.map((row, index) => ({
            ...row,
            id: index + 1,
          }));
          setData(dataWithIds);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTimesheetsClick = () => {
    console.log("Timesheets button clicked");
  };

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {data.length !== 0 ? <DataGrid checkboxSelection rows={data} columns={columns} /> : <Spinner />}
      </Box>
    </Box>
  );
};

export default Team;
