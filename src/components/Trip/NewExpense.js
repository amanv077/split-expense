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
import Snackbar from "@mui/material/Snackbar";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useLocation } from "react-router-dom";
import { useStoreProvider } from "../../store";
import Overview from "../OverviewDisplay/Overview";
import Table from "../Data/Table";
import { Typography } from "@mui/material";

const NewExpense = () => {
  const { addNewExpense, allExpense, trips } = useStoreProvider();
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedTripId } = location.state || {};
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
  const [summary, setSummary] = useState(false);
  const [checked, setChecked] = useState(() => {
    const initialChecked = {};
    memberNames.forEach((name) => {
      initialChecked[name] = true;
    });
    return initialChecked;
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const initialChecked = {};
    memberNames.forEach((name) => {
      initialChecked[name] = true;
    });
    setChecked(initialChecked);
  }, [memberNames]);

  const saveExpense = () => {
    if (!amount || !desc || !selectedUser) {
      setError("Amount, description, and paid by fields are required.");
      return;
    }

    const selectedUsername = selectedUser || "Charity";
    const selectedMembers = memberNames.filter((name) => checked[name]);
    addNewExpense({
      tripId: selectedTripId,
      expenseId: uuidv4(),
      amount,
      desc,
      selectedUser: selectedUsername,
      selectedMembers,
    });

    setAmount("");
    setDesc("");
    setSelectedUser(null);
    setError("");
    setOpenSnackbar(true);
  };

  const totalCost = useMemo(() => {
    return allExpense
      .filter((expense) => expense.tripId === selectedTripId)
      .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  }, [allExpense, selectedTripId]);

  if (summary) {
    return (
      <Overview
        allExpense={allExpense}
        trip={trip}
        selectedTripId={selectedTripId}
      />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 3,
          width: "100vw",
          backgroundColor: "#F8F9FA",
          padding: 4,
        },
      }}
    >
      <Paper elevation={10}>
        <Box sx={{ padding: 2, textAlign: "center" }}>
          <Typography variant="h4" component="h1">
            Add New Expense for: {trip?.tripName}
          </Typography>
          <Typography variant="h6" component="h4" sx={{ marginTop: 2 }}>
            The Trip Cost to Group Till Now: ₹ {totalCost}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ margin: 2, width: "80%" }}
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
            sx={{ margin: 2, width: "80%" }}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </Box>
        <Box sx={{ marginTop: 3, textAlign: "center" }}>
          <Typography variant="h5" component="h2">
            Paid By
          </Typography>
          <Autocomplete
            options={memberNames}
            value={selectedUser}
            onChange={(event, newValue) => setSelectedUser(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select User"
                variant="outlined"
                sx={{ margin: 2, width: "80%" }}
              />
            )}
          />
        </Box>
        <Box sx={{ padding: 2, textAlign: "center" }}>
          <Typography variant="h5" component="h2">
            Members Included in Expense
          </Typography>
          <FormControl component="fieldset" sx={{ marginTop: 2 }}>
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
                    sx={{ marginBottom: 1 }}
                  />
                ))
              ) : (
                <div>No members found.</div>
              )}
            </FormGroup>
          </FormControl>
        </Box>
        {error && (
          <Box sx={{ color: "red", padding: 2, textAlign: "center" }}>
            <Typography>{error}</Typography>
          </Box>
        )}
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <Button
            sx={{ margin: 2 }}
            variant="contained"
            color="primary"
            onClick={saveExpense}
          >
            Add New Expense
          </Button>
          <Button
            sx={{ margin: 2 }}
            variant="contained"
            color="secondary"
            onClick={() => navigate("/")}
          >
            Back
          </Button>
          <Button
            sx={{ margin: 2 }}
            variant="contained"
            color="secondary"
            onClick={() => setSummary(true)}
          >
            Summary
          </Button>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={() => setOpenSnackbar(false)}
          message="Expense Created Successfully."
        />
      </Paper>
      <Table allExpense={allExpense} selectedTripId={selectedTripId} />
    </Box>
  );
};

export default NewExpense;
