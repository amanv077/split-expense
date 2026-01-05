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
        <Box
          sx={{
            p: 6,
            textAlign: "center",
            background: "#fbfbfd",
            borderRadius: 3,
            border: "1px dashed #d2d2d7",
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#f5f5f7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <ReceiptIcon sx={{ fontSize: 24, color: "#86868b" }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: "#1d1d1f" }}>
            No expenses yet
          </Typography>
          <Typography variant="body2" sx={{ color: "#86868b" }}>
            Add your first expense above to get started
          </Typography>
        </Box>
      </Fade>
    );
  }

  return (
    <Fade in timeout={500}>
      <Box sx={{ background: "#ffffff", borderRadius: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, display: "flex", alignItems: "center", gap: 1, color: "#1d1d1f" }}>
            Expenses
            <Chip 
              label={filteredExpenses.length} 
              size="small" 
              sx={{ 
                background: "#f5f5f7", 
                color: "#1d1d1f",
                fontWeight: 600,
                height: 24
              }} 
            />
          </Typography>
        </Box>

        {/* Expense Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
            gap: 2,
          }}
        >
          {filteredExpenses.slice().reverse().map((data, index) => (
            <Fade in timeout={300 + index * 50} key={data.expenseId}>
              <Card
                sx={{
                  background: "#ffffff",
                  border: "1px solid #e8e8ed",
                  borderRadius: 2.5,
                  boxShadow: "none",
                  transition: "all 200ms ease",
                  "&:hover": {
                    borderColor: "#d2d2d7",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  {/* Amount & Delete */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        color: "#1d1d1f",
                        letterSpacing: "-0.02em"
                      }}
                    >
                      ₹{parseFloat(data.amount).toFixed(2)}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteExpense(data.expenseId)}
                      sx={{
                        color: "#aeaeb2",
                        padding: 0.5,
                        "&:hover": {
                          color: "#ff3b30",
                          background: "rgba(255, 59, 48, 0.08)",
                        },
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Box>

                  {/* Description */}
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 2, color: "#1d1d1f" }}>
                    {data.desc}
                  </Typography>

                  <Box sx={{ pt: 1.5, borderTop: "1px solid #f5f5f7" }}>
                    {/* Paid By */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <PersonIcon sx={{ fontSize: 14, color: "#86868b" }} />
                      <Typography variant="caption" sx={{ color: "#86868b" }}>
                        Paid by <span style={{ color: "#1d1d1f", fontWeight: 500 }}>{data.selectedUser}</span>
                      </Typography>
                    </Box>

                    {/* Split Among */}
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                      <GroupIcon sx={{ fontSize: 14, color: "#86868b", mt: 0.5 }} />
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {data.selectedMembers.slice(0, 3).map((name) => (
                          <Chip
                            key={name}
                            label={name}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: "0.7rem",
                              background: "#f5f5f7",
                              color: "#1d1d1f",
                              border: "none"
                            }}
                          />
                        ))}
                        {data.selectedMembers.length > 3 && (
                          <Chip
                            label={`+${data.selectedMembers.length - 3}`}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: "0.7rem",
                              background: "#f5f5f7",
                              color: "#86868b",
                              border: "none",
                              fontWeight: 500
                            }}
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          ))}
        </Box>
      </Box>
    </Fade>
  );
};

export default Table;
