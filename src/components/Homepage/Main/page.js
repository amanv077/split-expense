import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import NewExpense from "../../Trip/NewExpense";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateTrip from "../../Trip/CreateTrip";
import { useStoreProvider } from "../../../store";

const Main = () => {
  const { trips, setTrips, addNewExpense, allExpense } = useStoreProvider();
  const [openNewTrip, setOpenNewTrip] = useState(false);
  const [openOldTrip, setOpenOldrip] = useState(false);

  const [selectedTripId, setSelectedTripId] = useState("");

  const handleCreateNewTrip = () => {
    setOpenNewTrip(true);
    setOpenOldrip(false);
    setSelectedTripId("");
  };
  const handleDeleteTrip = (tripId) => {
    setTrips(trips.filter((trip) => trip.tripId !== tripId));
  };

  const handleCardClick = (tripId) => {
    setSelectedTripId(tripId);
    setOpenNewTrip(false);
    setOpenOldrip(true);
  };

  return (
    <Box
      sx={{
        "& > :not(style)": {
          // m: 3,
          // width: "100vw",
          backgroundColor: "#b8b8d1",
          padding: 5,
        },
      }}
    >
      {!(openNewTrip || openOldTrip) && (
        <Paper elevation={3}>
          <Box
            sx={{
              padding: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>Split Your Expense Smartly</h1>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {trips.map((trip) => (
              <Card
                key={trip.tripId}
                sx={{
                  maxWidth: 275,
                  backgroundColor: "#959e9e",
                  margin: "3px",
                  display: "flex",
                  flexDirection: "row",
                  cursor: "pointer",
                }}
                onClick={() => handleCardClick(trip.tripId)}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    Trip Name: {trip.tripName}
                  </Typography>

                  <h4> Trip Members:</h4>
                  <ul>
                    {trip.members.map((member, index) => (
                      <li key={index}>{member}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTrip(trip.tripId);
                    }}
                  >
                    {" "}
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </Box>{" "}
          <Button
            sx={{ margin: "45px" }}
            variant="contained"
            type="submit"
            onClick={handleCreateNewTrip}
          >
            Create New Trip
          </Button>
        </Paper>
      )}
      {openOldTrip && (
        <NewExpense
          addNewExpense={addNewExpense}
          trips={trips}
          allExpense={allExpense}
          selectedTripId={selectedTripId}
        />
      )}
      {openNewTrip && <CreateTrip setTrips={setTrips} />}
    </Box>
  );
};

export default Main;
