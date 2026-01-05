import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import Chip from "@mui/material/Chip";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Checkbox from "@mui/material/Checkbox";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SummarizeIcon from "@mui/icons-material/Summarize";
import AddIcon from "@mui/icons-material/Add";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PercentIcon from "@mui/icons-material/Percent";
import BalanceIcon from "@mui/icons-material/Balance";
import EditIcon from "@mui/icons-material/Edit";
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
  
  // Split type: 'equal', 'percentage', 'amount'
  const [splitType, setSplitType] = useState("equal");
  
  // For equal split - who is included
  const [includedMembers, setIncludedMembers] = useState(() => {
    const initial = {};
    memberNames.forEach((name) => {
      initial[name] = true;
    });
    return initial;
  });
  
  // For percentage/amount split - custom values per member
  const [customSplit, setCustomSplit] = useState(() => {
    const initial = {};
    memberNames.forEach((name) => {
      initial[name] = "";
    });
    return initial;
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const initialIncluded = {};
    const initialCustom = {};
    memberNames.forEach((name) => {
      initialIncluded[name] = true;
      initialCustom[name] = "";
    });
    setIncludedMembers(initialIncluded);
    setCustomSplit(initialCustom);
  }, [memberNames]);

  // Calculate split preview
  const splitPreview = useMemo(() => {
    const totalAmount = parseFloat(amount) || 0;
    const preview = {};
    
    if (splitType === "equal") {
      const includedCount = Object.values(includedMembers).filter(Boolean).length;
      const perPerson = includedCount > 0 ? totalAmount / includedCount : 0;
      memberNames.forEach((name) => {
        preview[name] = includedMembers[name] ? perPerson : 0;
      });
    } else if (splitType === "percentage") {
      memberNames.forEach((name) => {
        const pct = parseFloat(customSplit[name]) || 0;
        preview[name] = (pct / 100) * totalAmount;
      });
    } else if (splitType === "amount") {
      memberNames.forEach((name) => {
        preview[name] = parseFloat(customSplit[name]) || 0;
      });
    }
    
    return preview;
  }, [amount, splitType, includedMembers, customSplit, memberNames]);

  const totalSplitAmount = Object.values(splitPreview).reduce((a, b) => a + b, 0);
  const totalPercentage = splitType === "percentage" 
    ? Object.values(customSplit).reduce((a, b) => a + (parseFloat(b) || 0), 0)
    : 100;

  const saveExpense = () => {
    const totalAmount = parseFloat(amount);
    
    if (!amount || totalAmount <= 0) {
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

    // Validate split
    if (splitType === "equal") {
      const includedCount = Object.values(includedMembers).filter(Boolean).length;
      if (includedCount === 0) {
        setError("Please include at least one member in the split.");
        return;
      }
    } else if (splitType === "percentage") {
      if (Math.abs(totalPercentage - 100) > 0.01) {
        setError(`Percentages must add up to 100%. Current: ${totalPercentage.toFixed(1)}%`);
        return;
      }
    } else if (splitType === "amount") {
      if (Math.abs(totalSplitAmount - totalAmount) > 0.01) {
        setError(`Split amounts must equal ₹${totalAmount.toFixed(2)}. Current: ₹${totalSplitAmount.toFixed(2)}`);
        return;
      }
    }

    // Get selected members (those with non-zero split)
    const selectedMembers = memberNames.filter((name) => splitPreview[name] > 0);
    
    addNewExpense({
      tripId: selectedTripId,
      expenseId: uuidv4(),
      amount: totalAmount,
      desc: desc.trim(),
      selectedUser,
      selectedMembers,
      splitType,
      splitDetails: splitPreview,
    });

    // Reset form
    setAmount("");
    setDesc("");
    setSelectedUser(null);
    setSplitType("equal");
    const resetIncluded = {};
    const resetCustom = {};
    memberNames.forEach((name) => {
      resetIncluded[name] = true;
      resetCustom[name] = "";
    });
    setIncludedMembers(resetIncluded);
    setCustomSplit(resetCustom);
    setError("");
    setOpenSnackbar(true);
  };

  const totalCost = useMemo(() => {
    return allExpense
      .filter((expense) => expense.tripId === selectedTripId)
      .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  }, [allExpense, selectedTripId]);

  const selectedMembersCount = splitType === "equal" 
    ? Object.values(includedMembers).filter(Boolean).length
    : memberNames.filter((name) => splitPreview[name] > 0).length;

  if (summary) {
    return (
      <Overview
        allExpense={allExpense}
        trip={trip}
        selectedTripId={selectedTripId}
        onBack={() => setSummary(false)}
      />
    );
  }

  if (!trip) {
    return (
      <Box
        sx={{
          minHeight: "calc(100vh - 100px)",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 2, color: "#1d1d1f" }}>
            Trip not found
          </Typography>
          <Button variant="contained" onClick={() => navigate("/")}>
            Go Home
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 100px)",
        background: "#ffffff",
        py: { xs: 3, md: 4 },
        px: { xs: 2, md: 3 },
      }}
    >
      <Box sx={{ maxWidth: 680, mx: "auto" }}>
        {/* Header */}
        <Fade in timeout={200}>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 600, color: "#1d1d1f", letterSpacing: "-0.02em" }}>
                  {trip?.tripName}
                </Typography>
                <Typography variant="body2" sx={{ color: "#86868b", mt: 0.25 }}>
                  Add expenses
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#1d1d1f",
                  background: "#f5f5f7",
                  px: 2,
                  py: 0.75,
                  borderRadius: 2,
                }}
              >
                ₹{totalCost.toFixed(0)}
              </Typography>
            </Box>
          </Box>
        </Fade>

        {/* Form Card */}
        <Fade in timeout={300}>
          <Box
            sx={{
              background: "#f5f5f7",
              borderRadius: 3,
              p: { xs: 2, md: 3 },
              mb: 3,
            }}
          >
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

              <Divider sx={{ my: 1.5 }} />

              {/* Split Type Selection */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: "text.secondary", mb: 1, display: "block" }}>
                  How to split?
                </Typography>
                <ToggleButtonGroup
                  value={splitType}
                  exclusive
                  onChange={(e, newType) => newType && setSplitType(newType)}
                  size="small"
                  sx={{ 
                    display: "flex", 
                    width: "100%",
                    p: 0.5,
                    background: "#e8e8ed",
                    borderRadius: "10px !important",
                    "& .MuiToggleButton-root": {
                      flex: 1,
                      py: 0.75,
                      px: 2,
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      borderRadius: "8px !important",
                      border: "none !important",
                      color: "#1d1d1f",
                      textTransform: "none",
                      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&.Mui-selected": {
                        background: "#ffffff !important",
                        color: "#000000 !important",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                        "&:hover": {
                          background: "#ffffff !important",
                        },
                      },
                      "&:hover": {
                        background: "rgba(255,255,255,0.5)",
                      },
                    },
                  }}
                >
                  <ToggleButton value="equal">
                    <BalanceIcon sx={{ mr: 0.5, fontSize: 16 }} />
                    Equal
                  </ToggleButton>
                  <ToggleButton value="percentage">
                    <PercentIcon sx={{ mr: 0.5, fontSize: 16 }} />
                    Percentage
                  </ToggleButton>
                  <ToggleButton value="amount">
                    <EditIcon sx={{ mr: 0.5, fontSize: 16 }} />
                    Amount
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              {/* Split Details */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: "text.secondary", mb: 0.75, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span>
                    {splitType === "equal" && `Split Among (${selectedMembersCount} of ${memberNames.length})`}
                    {splitType === "percentage" && `Percentage Split (Total: ${totalPercentage.toFixed(0)}%)`}
                    {splitType === "amount" && `Amount Split (₹${totalSplitAmount.toFixed(2)} of ₹${parseFloat(amount || 0).toFixed(2)})`}
                  </span>
                  {splitType !== "equal" && (
                    <Chip 
                      size="small"
                      label={
                        splitType === "percentage" 
                          ? (Math.abs(totalPercentage - 100) < 0.01 ? "✓ Valid" : `${(100 - totalPercentage).toFixed(1)}% remaining`)
                          : (Math.abs(totalSplitAmount - parseFloat(amount || 0)) < 0.01 ? "✓ Valid" : `₹${(parseFloat(amount || 0) - totalSplitAmount).toFixed(2)} remaining`)
                      }
                      sx={{
                        background: (splitType === "percentage" ? Math.abs(totalPercentage - 100) < 0.01 : Math.abs(totalSplitAmount - parseFloat(amount || 0)) < 0.01)
                          ? "rgba(52, 199, 89, 0.1)"
                          : "rgba(255, 149, 0, 0.1)",
                        color: (splitType === "percentage" ? Math.abs(totalPercentage - 100) < 0.01 : Math.abs(totalSplitAmount - parseFloat(amount || 0)) < 0.01)
                          ? "#34c759"
                          : "#ff9500",
                        fontWeight: 600,
                        border: "none"
                      }}
                    />
                  )}
                </Typography>

                {/* Member Split Cards */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                  {memberNames.map((name) => (
                    <Paper
                      key={name}
                      elevation={0}
                      sx={{
                        p: 1,
                        borderRadius: 2,
                        border: splitPreview[name] > 0 ? "1px solid #0071e3" : "1px solid #e5e5ea",
                        background: splitPreview[name] > 0 ? "rgba(0, 113, 227, 0.04)" : "#ffffff",
                        transition: "all 150ms ease",
                      }}
                    >
                      <Box sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 1,
                        flexDirection: "row",
                      }}>
                        {/* Member Name & Checkbox (for equal split) */}
                        <Box sx={{ 
                          display: "flex", 
                          alignItems: "center", 
                          flex: 1,
                          minWidth: 0,
                        }}>
                          {splitType === "equal" && (
                            <Checkbox
                              checked={includedMembers[name] || false}
                              onChange={(e) => setIncludedMembers((prev) => ({ ...prev, [name]: e.target.checked }))}
                              size="small"
                              sx={{ 
                                p: 0.5,
                                color: "#0071e3",
                                "&.Mui-checked": { color: "#0071e3" },
                              }}
                            />
                          )}
                          <Typography variant="body2" sx={{ fontWeight: 600, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {name}
                          </Typography>
                        </Box>

                        {/* Input for percentage/amount */}
                        {splitType !== "equal" && (
                          <TextField
                            type="number"
                            size="small"
                            placeholder={splitType === "percentage" ? "0" : "0.00"}
                            value={customSplit[name]}
                            onChange={(e) => setCustomSplit((prev) => ({ ...prev, [name]: e.target.value }))}
                            InputProps={{
                              endAdornment: splitType === "percentage" 
                                ? <Typography variant="body2" sx={{ color: "text.secondary" }}>%</Typography>
                                : <Typography variant="body2" sx={{ color: "text.secondary" }}>₹</Typography>,
                            }}
                            sx={{ 
                              width: 90,
                              "& .MuiInputBase-input": { py: 0.75, px: 1, fontSize: "0.85rem" },
                            }}
                          />
                        )}

                        {/* Preview Amount */}
                        <Box sx={{ 
                          textAlign: "right",
                          minWidth: 70,
                        }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 700,
                              color: splitPreview[name] > 0 ? "#0071e3" : "text.secondary",
                            }}
                          >
                            ₹{splitPreview[name].toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                </Box>
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
                    onClick={() => setSummary(true)}
                    startIcon={<SummarizeIcon />}
                    size="small"
                  >
                    View Summary
                  </Button>
                </Box>
              </Box>
          </Box>
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
