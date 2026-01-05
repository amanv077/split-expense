import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
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
    if (isLoading) return;
    
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
      setError("This member already exists.");
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

  // Loading/Success overlay
  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 100px)",
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Fade in timeout={200}>
          <Box sx={{ textAlign: "center", p: 4 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#34c759",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
              }}
            >
              <CheckCircleIcon sx={{ color: "white", fontSize: 32 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: "#1d1d1f" }}>
              Trip Created
            </Typography>
            <Typography variant="body1" sx={{ color: "#86868b", mb: 3 }}>
              Redirecting...
            </Typography>
            <CircularProgress size={24} sx={{ color: "#1d1d1f" }} />
          </Box>
        </Fade>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 100px)",
        background: "#ffffff",
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 3 },
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Fade in timeout={300}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 480,
          }}
        >
          {/* Header */}
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 600, 
                color: "#1d1d1f",
                letterSpacing: "-0.02em",
                mb: 0.5,
              }}
            >
              New Trip
            </Typography>
            <Typography variant="body1" sx={{ color: "#86868b" }}>
              Add details and members
            </Typography>
          </Box>

          {/* Form */}
          <form onSubmit={createNewTrip}>
            {/* Trip Name */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" sx={{ color: "#86868b", mb: 0.5, display: "block" }}>
                Trip Name
              </Typography>
              <TextField
                required
                id="trip-name"
                placeholder="e.g., Goa Beach Trip"
                fullWidth
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                size="small"
              />
            </Box>

            {/* Add Member */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" sx={{ color: "#86868b", mb: 0.5, display: "block" }}>
                Add Members
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  id="member-name"
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
                  sx={{ minWidth: 44, px: 1 }}
                >
                  <PersonAddIcon sx={{ fontSize: 20 }} />
                </Button>
              </Box>
            </Box>

            {/* Member Chips */}
            {members.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                  {members.map((member) => (
                    <Chip
                      key={member}
                      label={member}
                      onDelete={() => handleDelete(member)}
                      size="small"
                      sx={{
                        background: "#1d1d1f",
                        color: "white",
                        fontWeight: 400,
                        "& .MuiChip-deleteIcon": {
                          color: "rgba(255, 255, 255, 0.6)",
                          "&:hover": {
                            color: "white",
                          },
                        },
                      }}
                    />
                  ))}
                </Box>
                <Typography variant="caption" sx={{ color: "#86868b", mt: 1, display: "block" }}>
                  {members.length} member{members.length !== 1 ? "s" : ""} added
                  {members.length < 2 && " (minimum 2 required)"}
                </Typography>
              </Box>
            )}

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Button
                variant="outlined"
                onClick={() => navigate("/")}
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
              <Button
                variant="contained"
                type="submit"
                fullWidth
              >
                Create Trip
              </Button>
            </Box>
          </form>

          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              Trip created!
            </Alert>
          </Snackbar>
        </Box>
      </Fade>
    </Box>
  );
};

export default CreateTrip;
