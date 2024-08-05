import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStoreProvider } from "../../../store";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const { trips, setTrips, addNewExpense, allExpense } = useStoreProvider();
  const [openNewTrip, setOpenNewTrip] = useState(false);
  const [openOldTrip, setOpenOldTrip] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState("");

  const navigate = useNavigate();

  const handleCreateNewTrip = () => {
    navigate("create-trip");
    setOpenNewTrip(true);
    setOpenOldTrip(false);
    setSelectedTripId("");
  };

  const handleDeleteTrip = (tripId) => {
    setTrips(trips.filter((trip) => trip.tripId !== tripId));
  };

  const handleCardClick = (tripId) => {
    setSelectedTripId(tripId);
    navigate("new-expense", { state: { selectedTripId: tripId } });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F8F9FA",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 1200,
          padding: 4,
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            marginBottom: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Split Your Expense Smartly
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {trips.map((trip) => (
            <Card
              key={trip.tripId}
              sx={{
                maxWidth: 300,
                backgroundColor: "#959e9e",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#b0b7b7",
                },
              }}
              onClick={() => handleCardClick(trip.tripId)}
            >
              <CardContent>
                <Typography variant="h5" component="div">
                  Trip Name: {trip.tripName}
                </Typography>
                <Typography variant="subtitle1" component="div">
                  Trip Members:
                </Typography>
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
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateNewTrip}
          >
            Create New Trip
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Main;
