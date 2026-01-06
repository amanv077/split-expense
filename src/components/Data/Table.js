import React, { useMemo, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import { useStoreProvider } from "../../store";

const Table = ({ selectedTripId }) => {
  const { allExpense, setAllExpense } = useStoreProvider();

  // Delete confirmation dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const filteredExpenses = useMemo(
    () => allExpense.filter((expense) => expense.tripId === selectedTripId),
    [allExpense, selectedTripId]
  );

  const handleDeleteClick = (expense) => {
    setExpenseToDelete(expense);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (expenseToDelete) {
      setAllExpense(
        allExpense.filter((expense) => expense.expenseId !== expenseToDelete.expenseId)
      );
    }
    setDeleteDialogOpen(false);
    setExpenseToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setExpenseToDelete(null);
  };

  if (filteredExpenses.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 4,
          textAlign: "center",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
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
    );
  }

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
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
            <Card
              key={data.expenseId}
              sx={{
                background: "#ffffff",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                borderRadius: 2,
                position: "relative",
                overflow: "hidden",
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
                "@media (hover: hover)": {
                  transition: "transform 200ms ease, box-shadow 200ms ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
                  },
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
                      onClick={() => handleDeleteClick(data)}
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
          ))}
        </Box>
      </Paper>

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
          Delete Expense?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this expense
            {expenseToDelete && (
              <strong> "{expenseToDelete.desc}" (₹{parseFloat(expenseToDelete.amount).toFixed(2)})</strong>
            )}
            ? This action cannot be undone.
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
    </>
  );
};

export default Table;
