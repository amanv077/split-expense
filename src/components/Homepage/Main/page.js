import React from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
  Chip,
  Tooltip,
  Fade,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useStoreProvider } from "../../../store";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const { trips, setTrips } = useStoreProvider();
  const navigate = useNavigate();

  const handleCreateNewTrip = () => {
    navigate("create-trip");
  };

  const handleDeleteTrip = (e, tripId) => {
    e.stopPropagation();
    setTrips(trips.filter((trip) => trip.tripId !== tripId));
  };

  const handleCardClick = (tripId) => {
    navigate("new-expense", { state: { selectedTripId: tripId } });
  };

  // Empty state when no trips exist
  const EmptyState = () => (
    <Fade in timeout={400}>
      <Box
        sx={{
          textAlign: "center",
          py: { xs: 8, md: 12 },
          px: 3,
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 600, 
            mb: 1.5, 
            color: "#1d1d1f",
            letterSpacing: "-0.02em",
          }}
        >
          No trips yet
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: "#86868b", 
            mb: 4, 
            maxWidth: 380, 
            mx: "auto",
            lineHeight: 1.5,
          }}
        >
          Create your first trip and start splitting expenses with friends.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleCreateNewTrip}
          sx={{
            px: 4,
            py: 1.5,
          }}
        >
          Create Trip
        </Button>
      </Box>
    </Fade>
  );

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 120px)",
        background: "#ffffff",
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 3 },
      }}
    >
      <Box
        sx={{
          maxWidth: 980,
          mx: "auto",
        }}
      >
        {/* Header Section */}
        <Fade in timeout={300}>
          <Box sx={{ textAlign: "center", mb: { xs: 5, md: 6 } }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 600,
                mb: 1,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                color: "#1d1d1f",
                letterSpacing: "-0.025em",
              }}
            >
              Splitify
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#86868b",
                maxWidth: 400,
                mx: "auto",
                fontSize: { xs: "1rem", md: "1.125rem" },
              }}
            >
              Split expenses smartly with friends
            </Typography>
          </Box>
        </Fade>

        {/* Main Content */}
        {trips.length === 0 ? (
          <EmptyState />
        ) : (
          <Box>
            {/* Trip Cards Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: { xs: 2, md: 2.5 },
                mb: 5,
              }}
            >
              {trips.map((trip, index) => (
                <Fade in timeout={200 + index * 50} key={trip.tripId}>
                  <Card
                    sx={{
                      cursor: "pointer",
                      background: "#ffffff",
                      border: "1px solid #e8e8ed",
                      boxShadow: "none",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 150ms ease",
                      "&:hover": {
                        borderColor: "#d2d2d7",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                      },
                    }}
                    onClick={() => handleCardClick(trip.tripId)}
                  >
                    <CardContent sx={{ p: 2, flex: 1, display: "flex", flexDirection: "column" }}>
                      {/* Trip Name & Delete */}
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: "#1d1d1f",
                            fontSize: "0.9375rem",
                            letterSpacing: "-0.01em",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            flex: 1,
                            mr: 1,
                          }}
                        >
                          {trip.tripName}
                        </Typography>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={(e) => handleDeleteTrip(e, trip.tripId)}
                            sx={{
                              color: "#aeaeb2",
                              p: 0.25,
                              "&:hover": {
                                color: "#ff3b30",
                                background: "transparent",
                              },
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Tooltip>
                      </Box>

                      {/* Members count */}
                      <Typography variant="caption" sx={{ color: "#86868b", mb: 1.5 }}>
                        {trip.members.length} member{trip.members.length !== 1 ? "s" : ""}
                      </Typography>

                      {/* Member chips - pushed to bottom */}
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: "auto" }}>
                        {trip.members.slice(0, 3).map((member) => (
                          <Chip
                            key={member}
                            label={member}
                            size="small"
                            sx={{
                              height: 22,
                              background: "#f5f5f7",
                              color: "#1d1d1f",
                              fontWeight: 400,
                              fontSize: "0.6875rem",
                              "& .MuiChip-label": {
                                px: 1,
                              },
                            }}
                          />
                        ))}
                        {trip.members.length > 3 && (
                          <Chip
                            label={`+${trip.members.length - 3}`}
                            size="small"
                            sx={{
                              height: 22,
                              background: "#f5f5f7",
                              color: "#86868b",
                              fontWeight: 500,
                              fontSize: "0.6875rem",
                            }}
                          />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              ))}
            </Box>

            {/* Create New Trip Button */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                onClick={handleCreateNewTrip}
                sx={{ px: 4 }}
              >
                New Trip
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Main;
