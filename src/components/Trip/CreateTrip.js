/* eslint-disable no-const-assign */
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

const CreateTrip = ({ addNewMember, setTrips, trips }) => {
  const [tripName, setTripName] = useState("");
  const [member1, setMember1] = useState("");
  const [member2, setMember2] = useState("");
  const [member3, setMember3] = useState("");
  const [member4, setMember4] = useState("");

  const createNewTrip = (e) => {
    e.preventDefault();

    const newTrip = {
      tripName,
      member1,
      member2,
      member3,
      member4,
    };

    if (!tripName || !member1 || !member2 || !member3 || !member4) {
      console.warn("All fields must be filled out to create a new trip.");
      return;
    }

    const updatedTrips = [...trips, newTrip];
    setTrips(updatedTrips);

    addNewMember(newTrip);

    setTripName("");
    setMember1("");
    setMember2("");
    setMember3("");
    setMember4("");
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
              required
              id="outlined-required"
              label="Member01"
              sx={{ margin: 2 }}
              value={member1}
              onInput={(e) => setMember1(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Member02"
              sx={{ margin: 2 }}
              value={member2}
              onInput={(e) => setMember2(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Member03"
              sx={{ margin: 2 }}
              value={member3}
              onInput={(e) => setMember3(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Member04"
              sx={{ margin: 2 }}
              value={member4}
              onInput={(e) => setMember4(e.target.value)}
            />
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
