/* eslint-disable no-const-assign */
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { v4 as uuidv4 } from "uuid";

const CreateTrip = ({ setTrips }) => {
  const [tripName, setTripName] = useState("");
  const [newMember, setNewMember] = useState("");
  const [members, setMembers] = useState([]);

  const createNewTrip = (e) => {
    e.preventDefault();
    const newTrip = { tripName, members, tripId: uuidv4() };
    if (!tripName || members.length < 2) {
      console.warn("Trip atleast needs 2 members.");
      return null;
    }
    setTrips((prevTrips) => [...prevTrips, newTrip]);

    setTripName("");
    setMembers([]);
  };

  const addNewMember = () => {
    const alreadyExist = members.find(
      (member) => member.toLowerCase() === newMember.toLowerCase()
    );
    if (!alreadyExist) setMembers((prev) => [...prev, newMember]);
    setNewMember("");
  };

  const handleDelete = (memberToDelete) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member !== memberToDelete)
    );
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
              onInput={(e) => setTripName(e.target.value)}
            />
          </Box>
          <Box sx={{ padding: 2 }}>
            <TextField
              id="outlined-required"
              label="Member"
              sx={{ margin: 2 }}
              value={newMember}
              onInput={(e) => setNewMember(e.target.value)}
            />
            <Button
              sx={{ margin: "45px" }}
              variant="contained"
              type="submit"
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
                  sx={{ margin: "3px", padding: "5px" }}
                  direction="row"
                  spacing={1}
                >
                  <Chip label={member} onDelete={() => handleDelete(member)} />
                </Stack>
              ))}
            </Box>
          </Box>
          <Button sx={{ margin: "45px" }} variant="contained" type="submit">
            Create Trip
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateTrip;
