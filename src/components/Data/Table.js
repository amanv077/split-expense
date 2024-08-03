import React, { useMemo } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import { useStoreProvider } from "../../store";
import Paper from "@mui/material/Paper";

const Table = ({ selectedTripId }) => {
  const { allExpense, setAllExpense } = useStoreProvider();

  const filteredExpenses = useMemo(
    () => allExpense.filter((expense) => expense.tripId === selectedTripId),
    [allExpense, selectedTripId]
  );

  const handleDeleteTrip = (expenseId) => {
    setAllExpense(
      allExpense.filter((expense) => expense.expenseId !== expenseId)
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "90vw",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
        },
      }}
    >
      <h2>Transactions</h2>
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          backgroundColor: "#b8b8d1",
          padding: 2,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {filteredExpenses.map((data, index) => (
          <Card
            key={index}
            sx={{
              width: "25%",
              maxWidth: 200,
              backgroundColor: "#959e9e",
              margin: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                Paid By: {data.selectedUser}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Spent On: {data.desc}
              </Typography>
              <Typography variant="body2">Members Included:</Typography>
              {data.selectedMembers.map((name, memberIndex) => (
                <Typography
                  variant="body2"
                  component="ul"
                  key={memberIndex}
                  sx={{ padding: 0, margin: 0 }}
                >
                  <li>{name}</li>
                </Typography>
              ))}
              <Typography variant="body2">
                Amount Spent: {data.amount}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                aria-label="delete"
                size="large"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTrip(data.expenseId);
                }}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Paper>
    </Box>
  );
};

export default Table;
