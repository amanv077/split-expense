import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
  Chip,
  Tooltip,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import GroupsIcon from "@mui/icons-material/Groups";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { useStoreProvider } from "../../../store";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const { trips, setTrips } = useStoreProvider();
  const navigate = useNavigate();

  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);

  const handleCreateNewTrip = () => {
    navigate("create-trip");
  };

  const handleDeleteClick = (e, trip) => {
    e.stopPropagation();
    setTripToDelete(trip);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (tripToDelete) {
      setTrips(trips.filter((trip) => trip.tripId !== tripToDelete.tripId));
    }
    setDeleteDialogOpen(false);
    setTripToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setTripToDelete(null);
  };

  const handleCardClick = (tripId) => {
    navigate("new-expense", { state: { selectedTripId: tripId } });
  };

  // Empty state when no trips exist
  const EmptyState = () => (
    <Fade in timeout={500}>
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          px: 3,
        }}
      >
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 3,
          }}
        >
          <FlightTakeoffIcon sx={{ fontSize: 48, color: "#667eea" }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}>
          No trips yet
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, maxWidth: 400, mx: "auto" }}>
          Create your first trip and start splitting expenses with friends and family.
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={handleCreateNewTrip}
          sx={{
            px: 4,
            py: 1.5,
          }}
        >
          Create Your First Trip
        </Button>
      </Box>
    </Fade>
  );

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 134px)",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)",
        py: { xs: 3, md: 5 },
        px: { xs: 2, md: 3 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        {/* Header Section */}
        <Fade in timeout={300}>
          <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 1.5,
                fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Split Expenses Smartly
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: 500,
                mx: "auto",
                fontSize: { xs: "0.9rem", md: "1rem" },
              }}
            >
              Manage trip expenses and settle debts easily with friends
            </Typography>
          </Box>
        </Fade>

        {/* Main Content */}
        <Paper
          elevation={0}
          sx={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          {trips.length === 0 ? (
            <EmptyState />
          ) : (
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              {/* Trip Cards Grid */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  },
                  gap: { xs: 2, md: 3 },
                  mb: 4,
                }}
              >
                {trips.map((trip, index) => (
                  <Fade in timeout={300 + index * 100} key={trip.tripId}>
                    <Card
                      sx={{
                        cursor: "pointer",
                        background: "#ffffff",
                        border: "1px solid rgba(0, 0, 0, 0.06)",
                        position: "relative",
                        overflow: "visible",
                        "&:hover": {
                          borderColor: "#667eea",
                          transform: "translateY(-4px)",
                          boxShadow: "0 12px 24px rgba(102, 126, 234, 0.15)",
                        },
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "4px",
                          background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                          borderRadius: "16px 16px 0 0",
                        },
                      }}
                      onClick={() => handleCardClick(trip.tripId)}
                    >
                      <CardContent sx={{ p: 3 }}>
                        {/* Trip Name */}
                        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 2 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: "text.primary",
                              flex: 1,
                              mr: 1,
                            }}
                          >
                            {trip.tripName}
                          </Typography>
                          <Tooltip title="Delete Trip">
                            <IconButton
                              size="small"
                              onClick={(e) => handleDeleteClick(e, trip)}
                              sx={{
                                color: "text.secondary",
                                "&:hover": {
                                  color: "#ef4444",
                                  background: "rgba(239, 68, 68, 0.1)",
                                },
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>

                        {/* Members */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                          <GroupsIcon sx={{ color: "text.secondary", fontSize: 18 }} />
                          <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {trip.members.length} members
                          </Typography>
                        </Box>

                        {/* Member chips */}
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                          {trip.members.slice(0, 3).map((member) => (
                            <Chip
                              key={member}
                              label={member}
                              size="small"
                              sx={{
                                background: "rgba(102, 126, 234, 0.1)",
                                color: "#667eea",
                                fontWeight: 500,
                                fontSize: "0.75rem",
                              }}
                            />
                          ))}
                          {trip.members.length > 3 && (
                            <Chip
                              label={`+${trip.members.length - 3}`}
                              size="small"
                              sx={{
                                background: "rgba(118, 75, 162, 0.1)",
                                color: "#764ba2",
                                fontWeight: 500,
                                fontSize: "0.75rem",
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
                  size="large"
                  startIcon={<AddIcon />}
                  onClick={handleCreateNewTrip}
                  sx={{ px: 4 }}
                >
                  Create New Trip
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        PaperProps={{
          sx: {
            borderRadius: 3,
            minWidth: { xs: "90%", sm: 400 },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>
          Delete Trip?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete
            {tripToDelete && (
              <strong> "{tripToDelete.tripName}"</strong>
            )}
            ? All expenses associated with this trip will also be deleted. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{ borderRadius: 2 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Main;
