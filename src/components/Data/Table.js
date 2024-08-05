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
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography variant="h4" component="h2" sx={{ marginY: 2 }}>
        Transactions
      </Typography>
      <Paper
        elevation={2}
        sx={{
          width: "90%",
          backgroundColor: "#f0f0f0",
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
              width: "23%",
              maxWidth: 200,
              backgroundColor: "#e0e0e0",
              margin: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent sx={{ padding: 2 }}>
              <Typography variant="subtitle1">
                <strong>Paid By:</strong> {data.selectedUser}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginY: 1 }}
              >
                <strong>Spent On:</strong> {data.desc}
              </Typography>
              <Typography variant="body2">
                <strong>Members Included:</strong>
              </Typography>
              {data.selectedMembers.map((name, memberIndex) => (
                <Typography
                  variant="body2"
                  component="ul"
                  key={memberIndex}
                  sx={{ padding: 0, margin: 0, listStyle: "none" }}
                >
                  <li>{name}</li>
                </Typography>
              ))}
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                <strong>Amount Spent:</strong> ₹{data.amount}
              </Typography>
            </CardContent>
            <CardActions sx={{ padding: 1, justifyContent: "flex-end" }}>
              <IconButton
                aria-label="delete"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTrip(data.expenseId);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Paper>
    </Box>
  );
};

export default Table;
