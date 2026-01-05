import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";

const MemberTransactionDialog = ({ open, onClose, memberName, memberInfo, transactions }) => {
  if (!memberName) return null;

  const balance = (memberInfo?.paid || 0) - (memberInfo?.spend || 0);

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: "80vh",
        }
      }}
    >
      <DialogTitle sx={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 1.5,
        px: 2,
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PersonIcon />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {memberName}'s Transactions
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: 0 }}>
        {/* Summary Header */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-around", 
          py: 1.5, 
          px: 2,
          background: "#f8fafc",
          borderBottom: "1px solid #e2e8f0",
        }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>Paid</Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "#10b981" }}>
              ₹{(memberInfo?.paid || 0).toFixed(0)}
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>Share</Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "#ef4444" }}>
              ₹{(memberInfo?.spend || 0).toFixed(0)}
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>Balance</Typography>
            <Typography variant="body2" sx={{ 
              fontWeight: 700, 
              color: balance > 0 ? "#10b981" : balance < 0 ? "#ef4444" : "#64748b" 
            }}>
              {balance >= 0 ? "+" : ""}₹{balance.toFixed(0)}
            </Typography>
          </Box>
        </Box>

        {/* Transactions List */}
        <Box sx={{ p: 1.5, maxHeight: "50vh", overflow: "auto" }}>
          {transactions.length === 0 ? (
            <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary", py: 3 }}>
              No transactions found
            </Typography>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {transactions.map((tx, index) => (
                <Paper
                  key={tx.expenseId || index}
                  elevation={0}
                  sx={{
                    p: 1.5,
                    borderRadius: 1.5,
                    border: "1px solid #e2e8f0",
                    background: tx.isPayer ? "rgba(16, 185, 129, 0.03)" : "white",
                  }}
                >
                  {/* Transaction Header */}
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {tx.isPayer ? (
                        <Chip 
                          icon={<PaymentIcon sx={{ fontSize: 14 }} />}
                          label="Paid" 
                          size="small" 
                          sx={{ 
                            height: 22,
                            fontSize: "0.7rem",
                            background: "#dcfce7", 
                            color: "#16a34a",
                            "& .MuiChip-icon": { color: "#16a34a" },
                          }} 
                        />
                      ) : (
                        <Chip 
                          icon={<ReceiptIcon sx={{ fontSize: 14 }} />}
                          label="Included" 
                          size="small" 
                          sx={{ 
                            height: 22,
                            fontSize: "0.7rem",
                            background: "#e0e7ff", 
                            color: "#4f46e5",
                            "& .MuiChip-icon": { color: "#4f46e5" },
                          }} 
                        />
                      )}
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: "#667eea" }}>
                      ₹{parseFloat(tx.amount).toFixed(0)}
                    </Typography>
                  </Box>
                  
                  {/* Description */}
                  <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                    {tx.desc}
                  </Typography>
                  
                  {/* Details */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {tx.isPayer ? "You paid" : `Paid by ${tx.selectedUser}`}
                    </Typography>
                    <Typography variant="caption" sx={{ 
                      color: tx.isPayer ? "#10b981" : "#ef4444",
                      fontWeight: 600,
                    }}>
                      {tx.isPayer ? `+₹${parseFloat(tx.amount).toFixed(0)}` : `-₹${tx.memberShare.toFixed(0)}`}
                    </Typography>
                  </Box>
                  
                  {/* Split info */}
                  <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.25 }}>
                    Split among {tx.selectedMembers?.length || 0} member{(tx.selectedMembers?.length || 0) !== 1 ? "s" : ""}
                  </Typography>
                </Paper>
              ))}
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MemberTransactionDialog;
