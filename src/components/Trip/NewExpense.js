import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import Chip from "@mui/material/Chip";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SummarizeIcon from "@mui/icons-material/Summarize";
import AddIcon from "@mui/icons-material/Add";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useLocation } from "react-router-dom";
import { useStoreProvider } from "../../store";
import Overview from "../OverviewDisplay/Overview";
import Table from "../Data/Table";

const NewExpense = () => {
  const { addNewExpense, allExpense, trips } = useStoreProvider();
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedTripId } = location.state || {};
  const trip = useMemo(
    () =>
      Array.isArray(trips)
        ? trips.find((trip) => trip.tripId === selectedTripId)
        : null,
    [trips, selectedTripId]
  );
  const memberNames = useMemo(() => (trip ? trip.members : []), [trip]);

  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [summary, setSummary] = useState(false);
  const [checked, setChecked] = useState(() => {
    const initialChecked = {};
    memberNames.forEach((name) => {
      initialChecked[name] = true;
    });
    return initialChecked;
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const initialChecked = {};
    memberNames.forEach((name) => {
      initialChecked[name] = true;
    });
    setChecked(initialChecked);
  }, [memberNames]);

  const saveExpense = () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (!desc.trim()) {
      setError("Please describe what the expense was for.");
      return;
    }
    if (!selectedUser) {
      setError("Please select who paid for this expense.");
      return;
    }

    const selectedMembers = memberNames.filter((name) => checked[name]);
    if (selectedMembers.length === 0) {
      setError("Please select at least one member to split with.");
      return;
    }

    addNewExpense({
      tripId: selectedTripId,
      expenseId: uuidv4(),
      amount: parseFloat(amount),
      desc: desc.trim(),
      selectedUser,
      selectedMembers,
    });

    setAmount("");
    setDesc("");
    setSelectedUser(null);
    setError("");
    setOpenSnackbar(true);
  };

  const totalCost = useMemo(() => {
    return allExpense
      .filter((expense) => expense.tripId === selectedTripId)
      .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  }, [allExpense, selectedTripId]);

  const selectedMembersCount = Object.values(checked).filter(Boolean).length;

  if (summary) {
    return (
      <Overview
        allExpense={allExpense}
        trip={trip}
        selectedTripId={selectedTripId}
      />
    );
  }

  if (!trip) {
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 134px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Trip not found
          </Typography>
          <Button variant="contained" onClick={() => navigate("/")}>
            Go Home
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 134px)",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)",
        py: { xs: 2, md: 4 },
        px: { xs: 2, md: 3 },
      }}
    >
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>
        {/* Add Expense Form */}
        <Fade in timeout={400}>
          <Paper
            elevation={0}
            sx={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              borderRadius: 3,
              overflow: "hidden",
              mb: 3,
            }}
          >
            {/* Header */}
            <Box
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                px: 3,
                py: 2.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                <Box>
                  <Typography variant="h5" sx={{ color: "white", fontWeight: 600, display: "flex", alignItems: "center", gap: 1 }}>
                    <ReceiptLongIcon />
                    {trip?.tripName}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)", mt: 0.5 }}>
                    Add and manage expenses for this trip
                  </Typography>
                </Box>
                <Chip
                  icon={<CurrencyRupeeIcon sx={{ color: "white !important" }} />}
                  label={`Total: ₹${totalCost.toFixed(2)}`}
                  sx={{
                    background: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1rem",
                    py: 2,
                    "& .MuiChip-icon": { color: "white" },
                  }}
                />
              </Box>
            </Box>

            {/* Form */}
            <Box sx={{ p: { xs: 2, md: 3 } }}>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2, mb: 3 }}>
                <TextField
                  label="Amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  InputProps={{
                    startAdornment: <Typography sx={{ color: "text.secondary", mr: 0.5 }}>₹</Typography>,
                  }}
                  fullWidth
                />
                <TextField
                  label="Spent On"
                  placeholder="e.g., Dinner, Taxi, Tickets"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  fullWidth
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Autocomplete
                  options={memberNames}
                  value={selectedUser}
                  onChange={(event, newValue) => setSelectedUser(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Paid By"
                      placeholder="Select who paid"
                    />
                  )}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Split Among */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ color: "text.secondary", mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
                  Split Among ({selectedMembersCount} of {memberNames.length})
                </Typography>
                <FormControl component="fieldset">
                  <FormGroup sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 1 }}>
                    {memberNames.map((name) => (
                      <Paper
                        key={name}
                        elevation={0}
                        sx={{
                          px: 2,
                          py: 0.5,
                          borderRadius: 2,
                          border: checked[name] ? "2px solid #667eea" : "2px solid #e2e8f0",
                          background: checked[name] ? "rgba(102, 126, 234, 0.05)" : "transparent",
                          transition: "all 200ms ease",
                          cursor: "pointer",
                          "&:hover": {
                            borderColor: "#667eea",
                          },
                        }}
                        onClick={() =>
                          setChecked((prev) => ({
                            ...prev,
                            [name]: !prev[name],
                          }))
                        }
                      >
                        <FormControlLabel
                          control={
                            <Switch
                              checked={!!checked[name]}
                              onChange={() =>
                                setChecked((prev) => ({
                                  ...prev,
                                  [name]: !prev[name],
                                }))
                              }
                              size="small"
                            />
                          }
                          label={<Typography variant="body2" sx={{ fontWeight: 500 }}>{name}</Typography>}
                          sx={{ m: 0 }}
                        />
                      </Paper>
                    ))}
                  </FormGroup>
                </FormControl>
              </Box>

              {/* Error */}
              {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              {/* Actions */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* Primary Action - Add Expense */}
                <Button
                  variant="contained"
                  onClick={saveExpense}
                  startIcon={<AddIcon />}
                  size="large"
                  sx={{ 
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                  fullWidth
                >
                  Add Expense
                </Button>
                
                {/* Secondary Actions */}
                <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/")}
                    startIcon={<ArrowBackIcon />}
                    size="small"
                  >
                    Back
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setSummary(true)}
                    startIcon={<SummarizeIcon />}
                    size="small"
                  >
                    View Summary
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Fade>

        {/* Expenses Table */}
        <Table allExpense={allExpense} selectedTripId={selectedTripId} />

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" sx={{ width: "100%", borderRadius: 2 }}>
            Expense added successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default NewExpense;
