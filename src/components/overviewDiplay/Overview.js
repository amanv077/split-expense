import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const Overview = ({ totalAmount }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 3,
          width: "100vw",
          backgroundColor: "#b8b8d1",
          padding: 4,
        },
      }}
    >
      <Paper elevation={3}>
        <Box sx={{ padding: 2 }}>
          <h1>Complete Expense Summary</h1>
        </Box>
        <Box sx={{ padding: 2, margin: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <h1>This Trip Cost To Group: {totalAmount}</h1>
          </Box>

          <Box>
            <h1>Aman</h1>
            <h4>Total Cost</h4>
            <h4>Total Paid</h4>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Overview;
