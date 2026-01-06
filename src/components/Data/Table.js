import React, { useMemo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Fade from "@mui/material/Fade";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import { useStoreProvider } from "../../store";

const Table = ({ selectedTripId }) => {
  const { allExpense, setAllExpense } = useStoreProvider();

  const filteredExpenses = useMemo(
    () => allExpense.filter((expense) => expense.tripId === selectedTripId),
    [allExpense, selectedTripId]
  );

  const handleDeleteExpense = (expenseId) => {
    setAllExpense(
      allExpense.filter((expense) => expense.expenseId !== expenseId)
    );
  };

  if (filteredExpenses.length === 0) {
    return (
      <Fade in timeout={500}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <ReceiptIcon sx={{ fontSize: 28, color: "#667eea" }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
            No expenses yet
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Add your first expense above to get started
          </Typography>
        </Paper>
      </Fade>
    );
  }

  return (
    <Fade in timeout={500}>
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
        {/* Header */}
        <Box sx={{ px: 3, py: 2, borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
          <Typography variant="h6" sx={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 1 }}>
            <ReceiptIcon sx={{ color: "#667eea" }} />
            Expenses ({filteredExpenses.length})
          </Typography>
        </Box>

        {/* Expense Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
            gap: 2,
            p: 2,
          }}
        >
          {filteredExpenses.slice().reverse().map((data) => (
            <Fade in timeout={300} key={data.expenseId}>
              <Card
                sx={{
                  background: "#ffffff",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  borderRadius: 2,
                  position: "relative",
                  overflow: "visible",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: "8px 8px 0 0",
                  },
                  transition: "all 200ms ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
                  },
                }}
              >
                <CardContent sx={{ p: 2.5, pb: "16px !important" }}>
                  {/* Amount & Delete */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      ₹{parseFloat(data.amount).toFixed(2)}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteExpense(data.expenseId)}
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
                  </Box>

                  {/* Description */}
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 2, color: "text.primary" }}>
                    {data.desc}
                  </Typography>

                  {/* Paid By */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                    <PersonIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Paid by <strong style={{ color: "#667eea" }}>{data.selectedUser}</strong>
                    </Typography>
                  </Box>

                  {/* Split Among */}
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                    <GroupIcon sx={{ fontSize: 16, color: "text.secondary", mt: 0.5 }} />
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {data.selectedMembers.slice(0, 3).map((name) => (
                        <Chip
                          key={name}
                          label={name}
                          size="small"
                          sx={{
                            height: 22,
                            fontSize: "0.7rem",
                            background: "rgba(102, 126, 234, 0.1)",
                            color: "#667eea",
                          }}
                        />
                      ))}
                      {data.selectedMembers.length > 3 && (
                        <Chip
                          label={`+${data.selectedMembers.length - 3}`}
                          size="small"
                          sx={{
                            height: 22,
                            fontSize: "0.7rem",
                            background: "rgba(118, 75, 162, 0.1)",
                            color: "#764ba2",
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          ))}
        </Box>
      </Paper>
    </Fade>
  );
};

export default Table;
