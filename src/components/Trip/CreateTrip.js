import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const addMemberButtonRef = useRef(null);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const createNewTrip = (e) => {
    e.preventDefault();
    if (isLoading) return; // Prevent double submission
    
    if (!tripName) {
      setError("Please enter a trip name.");
      return;
    }
    if (members.length < 2) {
      setError("A trip needs at least 2 members to split expenses.");
      return;
    }
    
    setIsLoading(true);
    const newTrip = { tripName, members, tripId: uuidv4() };
    setTrips((prevTrips) => [...prevTrips, newTrip]);

    setTripName("");
    setMembers([]);
    setError("");
    setOpen(true);
    setTimeout(() => navigate("/"), 1200);
  };

  const addNewMember = (e) => {
    e?.preventDefault();
    if (!newMember.trim()) return;
    const alreadyExist = members.some(
      (member) => member.toLowerCase() === newMember.toLowerCase()
    );
    if (alreadyExist) {
      setError("This member already exists. Enter a different name.");
    } else {
      setMembers((prev) => [...prev, newMember.trim()]);
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
      e.preventDefault();
      addNewMember();
    }
  };

  // Loading overlay
  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 134px)",
          background: "linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Fade in timeout={300}>
          <Box
            sx={{
              textAlign: "center",
              p: 4,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
                boxShadow: "0 10px 40px rgba(102, 126, 234, 0.3)",
              }}
            >
              <CheckCircleIcon sx={{ color: "white", fontSize: 40 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              Trip Created!
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
              Redirecting to home...
            </Typography>
            <CircularProgress
              size={28}
              sx={{
                color: "#667eea",
              }}
            />
          </Box>
        </Fade>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 134px)",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)",
        py: { xs: 3, md: 5 },
        px: { xs: 2, md: 3 },
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Fade in timeout={400}>
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 520,
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              px: 3,
              py: 3,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
              }}
            >
              <FlightTakeoffIcon sx={{ color: "white", fontSize: 28 }} />
            </Box>
            <Typography variant="h5" sx={{ color: "white", fontWeight: 600 }}>
              Create New Trip
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)", mt: 0.5 }}>
              Add trip details and members to get started
            </Typography>
          </Box>

          {/* Form */}
          <Box sx={{ p: 3 }}>
            <form onSubmit={createNewTrip}>
              {/* Trip Name */}
              <TextField
                required
                id="trip-name"
                label="Trip Name"
                placeholder="e.g., Goa Beach Trip"
                fullWidth
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                sx={{ mb: 3 }}
              />

              {/* Add Member */}
              <Typography variant="subtitle2" sx={{ color: "text.secondary", mb: 1 }}>
                Add Members
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <TextField
                  id="member-name"
                  label="Member Name"
                  placeholder="Enter name"
                  fullWidth
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                  onKeyDown={handleKeyPress}
                  size="small"
                />
                <Button
                  ref={addMemberButtonRef}
                  variant="outlined"
                  onClick={addNewMember}
                  disabled={!newMember.trim()}
                  sx={{ minWidth: 48, px: 1 }}
                >
                  <PersonAddIcon />
                </Button>
              </Box>

              {/* Member Chips */}
              {members.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {members.map((member) => (
                      <Chip
                        key={member}
                        label={member}
                        onDelete={() => handleDelete(member)}
                        sx={{
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          color: "white",
                          fontWeight: 500,
                          "& .MuiChip-deleteIcon": {
                            color: "rgba(255, 255, 255, 0.7)",
                            "&:hover": {
                              color: "white",
                            },
                          },
                        }}
                      />
                    ))}
                  </Box>
                  <Typography variant="caption" sx={{ color: "text.secondary", mt: 1, display: "block" }}>
                    {members.length} member{members.length !== 1 ? "s" : ""} added
                    {members.length < 2 && " (minimum 2 required)"}
                  </Typography>
                </Box>
              )}

              {/* Error Alert */}
              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              {/* Action Buttons */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/")}
                  startIcon={<ArrowBackIcon />}
                  sx={{ flex: 1 }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ flex: 2 }}
                >
                  Create Trip
                </Button>
              </Box>
            </form>
          </Box>

          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert severity="success" sx={{ width: "100%", borderRadius: 2 }}>
              Trip created successfully! Redirecting...
            </Alert>
          </Snackbar>
        </Paper>
      </Fade>
    </Box>
  );
};

export default CreateTrip;

