import React, { useMemo } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import { useStoreProvider } from "../../store";

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
        flexDirection: "row",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 3,
          width: "100vw",
          backgroundColor: "#b8b8d1",
          padding: 4,
        },
      }}
    >
      {filteredExpenses.map((data, index) => (
        <Card
          key={index}
          sx={{
            maxWidth: 275,
            backgroundColor: "#959e9e",
            margin: "3px",
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Paid By: {data.selectedUser}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Spent On: {data.desc}
            </Typography>
            Members Included:
            {data.selectedMembers.map((name, memberIndex) => (
              <ul key={memberIndex}>
                <li>{name}</li>
              </ul>
            ))}
            <Typography variant="body2">Amount Spent: {data.amount}</Typography>
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
    </Box>
  );
};

export default Table;
