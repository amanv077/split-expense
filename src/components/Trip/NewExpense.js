import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const NewExpense = ({ trip, allExpense, addNewExpense }) => {
  const { members: memberNames } = trip || {};
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const [checked, setChecked] = useState(() => {
    if (!memberNames) return {};
    const initialChecked = {};
    memberNames.forEach((name) => {
      initialChecked[name] = true; // Set to true
    });
    return initialChecked;
  });

  const saveExpense = () => {
    const selectedUsername = selectedUser || "Charity";
    const selectedMembers = memberNames.filter((name) => checked[name]);
    addNewExpense({
      amount,
      desc,
      selectedUser: selectedUsername,
      selectedMembers,
    });

    setAmount("");
    setDesc("");
    setSelectedUser(null);
  };

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
          <h1>Add New Expense</h1>
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
                <div>No members found.</div> // This line displays a message when there are no members.
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
      </Paper>
    </Box>
  );
};

export default NewExpense;
