import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Table from "../Data/Table";
import uuid4 from "uuid4";
import Main from "../Homepage/Main/page";

const NewExpense = ({ allExpense, addNewExpense, trips, selectedTripId }) => {
  const trip = useMemo(
    () =>
      Array.isArray(trips)
        ? trips.find((trip) => trip.tripId === selectedTripId)
        : null,
    [trips, selectedTripId]
  );
  const memberNames = useMemo(() => (trip ? trip.members : []), [trip]);

  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [backToHome, setbackToHome] = useState(false);

  const [checked, setChecked] = useState(() => {
    const initialChecked = {};
    memberNames.forEach((name) => {
      initialChecked[name] = true;
    });
    return initialChecked;
  });

  useEffect(() => {
    const initialChecked = {};
    memberNames.forEach((name) => {
      initialChecked[name] = true;
    });
    setChecked(initialChecked);
  }, [memberNames]);

  const saveExpense = () => {
    const selectedUsername = selectedUser || "Charity";
    const selectedMembers = memberNames.filter((name) => checked[name]);
    addNewExpense({
      tripId: selectedTripId,
      expenseId: uuid4(),
      amount,
      desc,
      selectedUser: selectedUsername,
      selectedMembers,
    });

    setAmount("");
    setDesc("");
    setSelectedUser(null);
    // setbackToHome(true);
  };

  const totalCost = useMemo(() => {
    return allExpense
      .filter((expense) => expense.tripId === selectedTripId)
      .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  }, [allExpense, selectedTripId]);

  if (backToHome) {
    return <Main />;
  }
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
          <h1>Add New Expense for: {trip.tripName}</h1>
          <h4>The Trip Cost to Group Till Now: &#8377; {totalCost}</h4>
        </Box>
        <Box sx={{ padding: 2 }}>
          <TextField
            sx={{ margin: 2 }}
            id="outlined-number"
            label="Amount"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Spent On"
            sx={{ margin: 2 }}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Box>
        <Box sx={{ padding: 2 }}>
          <h1>Paid By</h1>
          <Autocomplete
            options={memberNames} // Use memberNames as options
            value={selectedUser}
            onChange={(event, newValue) => setSelectedUser(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Select User" variant="outlined" />
            )}
          />
        </Box>
        <Box sx={{ padding: 2 }}>
          <h1>Members Included in Expense</h1>
          <FormControl component="fieldset">
            <FormGroup>
              {memberNames && memberNames.length > 0 ? (
                memberNames.map((name) => (
                  <FormControlLabel
                    key={name}
                    control={
                      <Switch
                        checked={!!checked[name]}
                        onChange={() =>
                          setChecked((prevChecked) => ({
                            ...prevChecked,
                            [name]: !prevChecked[name],
                          }))
                        }
                      />
                    }
                    label={name}
                  />
                ))
              ) : (
                <div>No members found.</div>
              )}
            </FormGroup>
          </FormControl>
        </Box>
        <Button
          sx={{ margin: "45px" }}
          variant="contained"
          onClick={saveExpense}
        >
          Add New Expense
        </Button>
        <Button
          sx={{ margin: "45px" }}
          variant="contained"
          type="button"
          onClick={() => setbackToHome(true)}
        >
          Back
        </Button>
      </Paper>
      <Table allExpense={allExpense} selectedTripId={selectedTripId} />
    </Box>
  );
};

export default NewExpense;
