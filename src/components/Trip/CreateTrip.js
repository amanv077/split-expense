import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useStoreProvider } from "../../store";

const CreateTrip = () => {
  const { setTrips } = useStoreProvider();
  const [tripName, setTripName] = useState("");
  const [newMember, setNewMember] = useState("");
  const [members, setMembers] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const addMemberButtonRef = useRef(null);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
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
    navigate("/");
  };

  const addNewMember = (e) => {
    e.preventDefault();
    if (!newMember) return;
    const alreadyExist = members.some(
      (member) => member.toLowerCase() === newMember.toLowerCase()
    );
    if (alreadyExist) {
      setError("This member already exists. Enter a different name.");
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      addMemberButtonRef.current.click(); // Trigger the Add Member button click
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        paddingTop: "64px", // Adjust this value according to your Navbar height
        "& > :not(style)": {
          m: 2,
          width: "100%",
          maxWidth: 600,
        },
      }}
    >
      <Paper elevation={3} sx={{ padding: 3 }}>
        <form onSubmit={createNewTrip}>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              required
              id="trip-name"
              label="Trip Name"
              fullWidth
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              id="member-name"
              label="Member"
              fullWidth
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              onKeyPress={handleKeyPress} // Handle Enter key press
              sx={{ marginBottom: 2 }}
            />
            <Button
              ref={addMemberButtonRef}
              variant="contained"
              onClick={addNewMember}
              disabled={!newMember}
              sx={{ marginBottom: 2 }}
            >
              Add Member
            </Button>
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {members.map((member) => (
                <Chip
                  key={member}
                  label={member}
                  onDelete={() => handleDelete(member)}
                  sx={{ margin: 0.5 }}
                />
              ))}
            </Stack>
          </Box>
          {error && (
            <Box sx={{ color: "red", marginBottom: 2 }}>
              <p>{error}</p>
            </Box>
          )}
          <Button variant="contained" type="submit" sx={{ marginRight: 2 }}>
            Create Trip
          </Button>
          <Button variant="contained" onClick={() => navigate("/")}>
            Back
          </Button>
        </form>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message="Trip Created Successfully."
        />
      </Paper>
    </Box>
  );
};

export default CreateTrip;
