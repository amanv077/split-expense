import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";

const Overview = ({ allExpense, trip, selectedTripId }) => {
  const navigate = useNavigate();

  const filteredExpenses = useMemo(
    () => allExpense.filter((expense) => expense.tripId === selectedTripId),
    [allExpense, selectedTripId]
  );

  const totalAmount = filteredExpenses.reduce(
    (acc, curr) => acc + (parseFloat(curr.amount) || 0),
    0
  );

  const memberPayInfo = trip.members.map((name) => ({
    name,
    paid: 0,
    spend: 0,
  }));

  filteredExpenses.forEach((expense) => {
    const spentOnEachMember = parseFloat(
      (expense.amount / expense.selectedMembers.length).toFixed(2)
    );

    const memberWhoPaid = memberPayInfo.find(
      (member) => member.name === expense.selectedUser
    );

    if (memberWhoPaid) {
      memberWhoPaid.paid += parseFloat(expense.amount);
    }

    expense.selectedMembers.forEach((name) => {
      const selectedMember = memberPayInfo.find(
        (member) => member.name === name
      );
      if (selectedMember) {
        selectedMember.spend += spentOnEachMember;
      }
    });
  });

  const [summary, setSummary] = useState([]);

  const calculateNetBalances = (memberPayInfo) => {
    return memberPayInfo.map((member) => ({
      name: member.name,
      net: member.paid - member.spend,
    }));
  };

  const settleBalances = (memberPayInfo) => {
    const netBalances = calculateNetBalances(memberPayInfo);

    let payers = netBalances
      .filter((member) => member.net < 0)
      .map((payer) => ({ ...payer, net: Math.abs(payer.net) }));
    let receivers = netBalances.filter((member) => member.net > 0);

    const transactions = [];

    payers.forEach((payer) => {
      while (payer.net > 0.01) {
        const receiver = receivers.find((r) => r.net > 0.01);
        if (!receiver) break;

        const payment = Math.min(payer.net, receiver.net);
        transactions.push({
          from: payer.name,
          to: receiver.name,
          amount: payment,
        });

        payer.net -= payment;
        receiver.net -= payment;

        if (receiver.net <= 0.01) {
          receivers = receivers.filter((r) => r.net > 0.01);
        }
      }
    });

    return transactions;
  };

  const handleFinalize = () => {
    const transactions = settleBalances(memberPayInfo);
    setSummary(transactions);
  };

  const getBalanceStatus = (paid, spend) => {
    const diff = paid - spend;
    if (diff > 0.01) return { status: "positive", icon: TrendingUpIcon, color: "#10b981" };
    if (diff < -0.01) return { status: "negative", icon: TrendingDownIcon, color: "#ef4444" };
    return { status: "neutral", icon: CheckCircleIcon, color: "#64748b" };
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 134px)",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)",
        py: { xs: 2, md: 4 },
        px: { xs: 2, md: 3 },
      }}
    >
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
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
                <AccountBalanceIcon sx={{ color: "white", fontSize: 28 }} />
              </Box>
              <Typography variant="h5" sx={{ color: "white", fontWeight: 600 }}>
                Expense Summary
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)", mt: 0.5 }}>
                {trip?.tripName}
              </Typography>
              <Box
                sx={{
                  mt: 2,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  background: "rgba(255, 255, 255, 0.2)",
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                }}
              >
                <CurrencyRupeeIcon sx={{ color: "white", fontSize: 20 }} />
                <Typography variant="h5" sx={{ color: "white", fontWeight: 700 }}>
                  {totalAmount.toFixed(2)}
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)", ml: 0.5 }}>
                  total
                </Typography>
              </Box>
            </Box>

            {/* Member Cards */}
            <Box sx={{ p: { xs: 2, md: 3 } }}>
              <Typography variant="subtitle2" sx={{ color: "text.secondary", mb: 2 }}>
                Member Breakdown
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {memberPayInfo.map((member, index) => {
                  const { status, icon: StatusIcon, color } = getBalanceStatus(member.paid, member.spend);
                  const balance = member.paid - member.spend;

                  return (
                    <Grid item xs={12} sm={6} md={4} key={member.name}>
                      <Fade in timeout={300 + index * 100}>
                        <Card
                          sx={{
                            background: "#ffffff",
                            border: "1px solid rgba(0, 0, 0, 0.06)",
                            borderRadius: 2,
                            transition: "all 200ms ease",
                            "&:hover": {
                              transform: "translateY(-2px)",
                              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
                            },
                          }}
                        >
                          <CardContent sx={{ p: 2.5 }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {member.name}
                              </Typography>
                              <StatusIcon sx={{ color, fontSize: 20 }} />
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                Paid
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 500, color: "#10b981" }}>
                                ₹{member.paid.toFixed(2)}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                Share
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 500, color: "#ef4444" }}>
                                ₹{member.spend.toFixed(2)}
                              </Typography>
                            </Box>
                            <Divider sx={{ my: 1 }} />
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                Balance
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: 700,
                                  color,
                                }}
                              >
                                {balance >= 0 ? "+" : ""}₹{balance.toFixed(2)}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Fade>
                    </Grid>
                  );
                })}
              </Grid>

              {/* Actions */}
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 3 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/")}
                  startIcon={<ArrowBackIcon />}
                >
                  Back to Home
                </Button>
                <Button
                  variant="contained"
                  onClick={handleFinalize}
                >
                  Calculate Settlements
                </Button>
              </Box>

              {/* Settlement Summary */}
              {summary.length > 0 && (
                <Fade in timeout={400}>
                  <Paper
                    elevation={0}
                    sx={{
                      background: "linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)",
                      border: "2px solid rgba(102, 126, 234, 0.3)",
                      borderRadius: 3,
                      p: 3,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 3,
                        textAlign: "center",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      ✨ Settlement Plan
                    </Typography>
                    
                    {/* Settlement Cards */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
                      {summary.map((transaction, index) => (
                        <Paper
                          key={index}
                          elevation={0}
                          sx={{
                            p: 2.5,
                            background: "white",
                            borderRadius: 2,
                            border: "1px solid rgba(0, 0, 0, 0.08)",
                            animation: `slideIn 300ms ease ${index * 100}ms forwards`,
                            opacity: 0,
                            transform: "translateY(10px)",
                            "@keyframes slideIn": {
                              to: { opacity: 1, transform: "translateY(0)" },
                            },
                          }}
                        >
                          <Box sx={{ 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center", 
                            flexDirection: { xs: "column", sm: "row" },
                            gap: { xs: 1.5, sm: 2 } 
                          }}>
                            {/* Payer */}
                            <Box sx={{ 
                              background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)", 
                              px: 2.5, 
                              py: 1.5, 
                              borderRadius: 2,
                              border: "1px solid #fca5a5",
                              minWidth: { xs: "100%", sm: "auto" },
                              textAlign: "center",
                            }}>
                              <Typography variant="body1" sx={{ fontWeight: 700, color: "#dc2626" }}>
                                {transaction.from}
                              </Typography>
                            </Box>
                            
                            {/* Action Text - Amount */}
                            <Box sx={{ 
                              textAlign: "center",
                              display: "flex",
                              flexDirection: { xs: "row", sm: "column" },
                              alignItems: "center",
                              gap: { xs: 1, sm: 0 },
                            }}>
                              <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500, display: { xs: "none", sm: "block" } }}>
                                pays
                              </Typography>
                              <Typography
                                variant="h5"
                                sx={{
                                  fontWeight: 800,
                                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                  backgroundClip: "text",
                                }}
                              >
                                ₹{transaction.amount.toFixed(2)}
                              </Typography>
                              <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500, display: { xs: "none", sm: "block" } }}>
                                to
                              </Typography>
                            </Box>
                            
                            {/* Receiver */}
                            <Box sx={{ 
                              background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)", 
                              px: 2.5, 
                              py: 1.5, 
                              borderRadius: 2,
                              border: "1px solid #86efac",
                              minWidth: { xs: "100%", sm: "auto" },
                              textAlign: "center",
                            }}>
                              <Typography variant="body1" sx={{ fontWeight: 700, color: "#16a34a" }}>
                                {transaction.to}
                              </Typography>
                            </Box>
                          </Box>
                        </Paper>
                      ))}
                    </Box>

                    {/* Share Button */}
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        startIcon={<ShareIcon />}
                        onClick={() => {
                          const tripName = trip?.tripName || "Trip";
                          const totalText = `₹${totalAmount.toFixed(2)}`;
                          
                          let shareText = `💰 *${tripName} - Expense Settlement*\n`;
                          shareText += `━━━━━━━━━━━━━━━━\n`;
                          shareText += `📊 Total Spent: ${totalText}\n\n`;
                          shareText += `💸 *Who Pays Whom:*\n`;
                          
                          summary.forEach((t, i) => {
                            shareText += `${i + 1}. ${t.from} ➜ ${t.to}: ₹${t.amount.toFixed(2)}\n`;
                          });
                          
                          shareText += `\n✅ Settle up and you're all square!`;
                          shareText += `\n\n_Generated by Splitify_`;
                          
                          navigator.clipboard.writeText(shareText).then(() => {
                            alert("Settlement summary copied to clipboard! Share it with your group.");
                          }).catch(() => {
                            alert("Could not copy. Please try again.");
                          });
                        }}
                        sx={{
                          px: 4,
                          py: 1.2,
                          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                          "&:hover": {
                            background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
                          },
                        }}
                      >
                        Share Settlement
                      </Button>
                    </Box>
                  </Paper>
                </Fade>
              )}

              {summary.length === 0 && filteredExpenses.length > 0 && (
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", color: "text.secondary" }}
                >
                  Click "Calculate Settlements" to see who owes whom
                </Typography>
              )}
            </Box>
          </Paper>
        </Fade>
      </Box>
    </Box>
  );
};

export default Overview;
