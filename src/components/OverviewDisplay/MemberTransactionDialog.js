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
          borderRadius: 3,
          maxHeight: "85vh",
          boxShadow: "0 24px 80px rgba(0, 0, 0, 0.2)",
        }
      }}
    >
      <DialogTitle sx={{ 
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 2,
        px: 3,
        borderBottom: "1px solid #f5f5f7",
      }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#1d1d1f" }}>
            {memberName}
          </Typography>
          <Typography variant="caption" sx={{ color: "#86868b" }}>
            Transaction History
          </Typography>
        </Box>
        <IconButton 
          onClick={onClose} 
          size="small" 
          sx={{ 
            color: "#86868b",
            background: "#f5f5f7",
            "&:hover": { background: "#e8e8ed" }
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: 0, background: "#fbfbfd" }}>
        {/* Summary Header */}
        <Box sx={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 1fr 1fr", 
          gap: 1,
          p: 2,
          background: "#ffffff",
          borderBottom: "1px solid #f5f5f7",
        }}>
          <Box sx={{ textAlign: "center", p: 1.5, borderRadius: 2, background: "#f5f5f7" }}>
            <Typography variant="caption" sx={{ color: "#86868b", display: "block", mb: 0.5 }}>Paid</Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, color: "#34c759" }}>
              ₹{(memberInfo?.paid || 0).toFixed(0)}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center", p: 1.5, borderRadius: 2, background: "#f5f5f7" }}>
            <Typography variant="caption" sx={{ color: "#86868b", display: "block", mb: 0.5 }}>Share</Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, color: "#ff3b30" }}>
              ₹{(memberInfo?.spend || 0).toFixed(0)}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center", p: 1.5, borderRadius: 2, background: "#f5f5f7" }}>
            <Typography variant="caption" sx={{ color: "#86868b", display: "block", mb: 0.5 }}>Balance</Typography>
            <Typography variant="body1" sx={{ 
              fontWeight: 600, 
              color: balance > 0 ? "#34c759" : balance < 0 ? "#ff3b30" : "#86868b" 
            }}>
              {balance >= 0 ? "+" : ""}₹{balance.toFixed(0)}
            </Typography>
          </Box>
        </Box>

        {/* Transactions List */}
        <Box sx={{ p: 2, maxHeight: "50vh", overflow: "auto" }}>
          {transactions.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 6, opacity: 0.5 }}>
              <Typography variant="body2">No transactions yet</Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {transactions.map((tx, index) => (
                <Paper
                  key={tx.expenseId || index}
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 2.5,
                    border: "1px solid rgba(0,0,0,0.04)",
                    background: "#ffffff",
                    transition: "transform 0.2s ease",
                    "&:hover": { transform: "translateY(-1px)" }
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#1d1d1f", mb: 0.5 }}>
                        {tx.desc}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Chip 
                          label={tx.isPayer ? "Paid" : "Split"} 
                          size="small"
                          icon={tx.isPayer ? <PaymentIcon style={{fontSize: 12}} /> : <ReceiptIcon style={{fontSize: 12}} />}
                          sx={{ 
                            height: 20, 
                            fontSize: "0.65rem",
                            background: tx.isPayer ? "rgba(52, 199, 89, 0.1)" : "rgba(0, 113, 227, 0.1)",
                            color: tx.isPayer ? "#34c759" : "#0071e3",
                            "& .MuiChip-icon": { color: "inherit" },
                            border: "none",
                            fontWeight: 600
                          }} 
                        />
                        <Typography variant="caption" sx={{ color: "#86868b" }}>
                          {tx.isPayer ? "You paid" : `Paid by ${tx.selectedUser}`}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#1d1d1f" }}>
                        ₹{parseFloat(tx.amount).toFixed(0)}
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: tx.isPayer ? "#34c759" : "#ff3b30",
                        fontWeight: 500 
                      }}>
                        {tx.isPayer ? "+" : "-"}₹{tx.isPayer ? parseFloat(tx.amount).toFixed(0) : tx.memberShare.toFixed(0)}
                      </Typography>
                    </Box>
                  </Box>
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
