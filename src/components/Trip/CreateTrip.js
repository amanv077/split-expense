/* eslint-disable no-const-assign */
import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { v4 as uuidv4 } from "uuid";
import Snackbar from "@mui/material/Snackbar";
import Main from "../Homepage/Main/page";

const CreateTrip = ({ setTrips }) => {
  const [tripName, setTripName] = useState("");
  const [newMember, setNewMember] = useState("");
  const [members, setMembers] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [backToHome, setbackToHome] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const createNewTrip = (e) => {
    e.preventDefault();
    if (!tripName || members.length < 2) {
      setError(
        "Please fill all details. Trip needs a name and at least 2 members."
      );
      return;
    }
    const newTrip = { tripName, members, tripId: uuidv4() };
    setTrips((prevTrips) => [...prevTrips, newTrip]);

    setTripName("");
    setMembers([]);
    setError("");
    handleClick();
    setbackToHome(true);
  };

  const addNewMember = (e) => {
    e.preventDefault();
    const alreadyExist = members.find(
      (member) => member.toLowerCase() === newMember.toLowerCase()
    );
    if (alreadyExist) {
      setError("Enter different name. This member already exists.");
    } else {
      setMembers((prev) => [...prev, newMember]);
      setNewMember("");
      setError("");
    }
  };

  const handleDelete = (memberToDelete) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member !== memberToDelete)
    );
  };

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
          width: "70vw",
          backgroundColor: "#b8b8d1",
          padding: 8,
        },
      }}
    >
      <Paper elevation={3}>
        <form onSubmit={createNewTrip}>
          <Box sx={{ padding: 2 }}>
            <h1>Create New Trip</h1>
            <TextField
              required
              id="outlined-required"
              label="Trip Name"
              sx={{ margin: 2 }}
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
            />
          </Box>
          <Box sx={{ padding: 2 }}>
            <TextField
              id="outlined-required"
              label="Member"
              sx={{ margin: 2 }}
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
            />
            <Button
              sx={{ margin: "45px" }}
              variant="contained"
              type="button"
              disabled={!newMember}
              onClick={addNewMember}
            >
              Add Member
            </Button>
            <Box
              sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            >
              {members.map((member) => (
                <Stack
                  key={member}
                  sx={{ margin: "3px", padding: "5px" }}
                  direction="row"
                  spacing={1}
                >
                  <Chip label={member} onDelete={() => handleDelete(member)} />
                </Stack>
              ))}
            </Box>
          </Box>
          {error && (
            <Box sx={{ color: "red", padding: 2 }}>
              <p>{error}</p>
            </Box>
          )}
          <Button sx={{ margin: "45px" }} variant="contained" type="submit">
            Create Trip
          </Button>
          <Button
            sx={{ margin: "45px" }}
            variant="contained"
            type="button"
            onClick={() => setbackToHome(true)}
          >
            Back
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            message="Trip Created Successfully."
          />
        </form>
      </Paper>
    </Box>
  );
};

export default CreateTrip;
