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
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";
import MemberTransactionDialog from "./MemberTransactionDialog";

const Overview = ({ allExpense, trip, selectedTripId, onBack }) => {
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
    const memberWhoPaid = memberPayInfo.find(
      (member) => member.name === expense.selectedUser
    );

    if (memberWhoPaid) {
      memberWhoPaid.paid += parseFloat(expense.amount);
    }

    // Check if expense has custom split details (new format)
    if (expense.splitDetails) {
      // Use custom split details
      Object.entries(expense.splitDetails).forEach(([name, amount]) => {
        const member = memberPayInfo.find((m) => m.name === name);
        if (member) {
          member.spend += parseFloat(amount) || 0;
        }
      });
    } else {
      // Legacy: equal split among selected members
      const spentOnEachMember = parseFloat(
        (expense.amount / expense.selectedMembers.length).toFixed(2)
      );
      expense.selectedMembers.forEach((name) => {
        const selectedMember = memberPayInfo.find(
          (member) => member.name === name
        );
        if (selectedMember) {
          selectedMember.spend += spentOnEachMember;
        }
      });
    }
  });

  const [summary, setSummary] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  // Get transactions for a specific member
  const getMemberTransactions = (memberName) => {
    return filteredExpenses.filter((expense) => 
      expense.selectedUser === memberName || 
      expense.selectedMembers?.includes(memberName)
    ).map((expense) => {
      const isPayer = expense.selectedUser === memberName;
      let memberShare = 0;
      
      if (expense.splitDetails) {
        memberShare = expense.splitDetails[memberName] || 0;
      } else {
        memberShare = expense.amount / expense.selectedMembers.length;
      }
      
      return {
        ...expense,
        isPayer,
        memberShare,
      };
    });
  };

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
        minHeight: "calc(100vh - 100px)",
        background: "#ffffff",
        py: { xs: 3, md: 4 },
        px: { xs: 2, md: 3 },
      }}
    >
      <Box sx={{ maxWidth: 680, mx: "auto" }}>
        <Fade in timeout={300}>
          <Box>
            {/* Header */}
            <Box sx={{ mb: 3, textAlign: "center" }}>
              <Typography variant="h4" sx={{ fontWeight: 600, color: "#1d1d1f", letterSpacing: "-0.02em", mb: 0.5 }}>
                Summary
              </Typography>
              <Typography variant="body2" sx={{ color: "#86868b", mb: 2 }}>
                {trip?.tripName}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 600,
                  color: "#1d1d1f",
                  letterSpacing: "-0.02em",
                }}
              >
                ₹{totalAmount.toFixed(0)}
              </Typography>
              <Typography variant="caption" sx={{ color: "#86868b" }}>
                total spent
              </Typography>
            </Box>

            {/* Member Breakdown - Collapsible */}
            <Box sx={{ p: { xs: 1.5, md: 2 } }}>
              <Accordion 
                defaultExpanded 
                elevation={0}
                sx={{ 
                  background: "transparent",
                  "&:before": { display: "none" },
                  "& .MuiAccordionSummary-root": {
                    minHeight: "auto",
                    px: 0,
                    py: 1,
                    "&:hover": {
                      background: "transparent",
                    },
                  },
                  "& .MuiAccordionSummary-content": {
                    my: 0,
                  },
                  "& .MuiAccordionDetails-root": {
                    px: 0,
                    pt: 1,
                    pb: 0,
                  },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#667eea" }} />}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PeopleIcon sx={{ color: "#86868b", fontSize: 18 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#86868b" }}>
                      Member Breakdown ({trip?.members?.length || 0})
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1.5}>
                    {memberPayInfo.map((member, index) => {
                      const { status, icon: StatusIcon, color } = getBalanceStatus(member.paid, member.spend);
                      const balance = member.paid - member.spend;

                      return (
                        <Grid item xs={12} sm={6} md={4} key={member.name}>
                          <Fade in timeout={200 + index * 50}>
                            <Card
                              onClick={() => setSelectedMember(member.name)}
                              sx={{
                                background: "#ffffff",
                                border: "1px solid #e2e8f0",
                                borderRadius: 2.5,
                                transition: "all 150ms ease",
                                cursor: "pointer",
                                "&:hover": {
                                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                                  borderColor: "#d2d2d7",
                                  transform: "translateY(-1px)",
                                },
                              }}
                            >
                              <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {member.name}
                                  </Typography>
                                  <StatusIcon sx={{ color, fontSize: 16 }} />
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.25 }}>
                                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                    Paid
                                  </Typography>
                                  <Typography variant="caption" sx={{ fontWeight: 600, color: "#10b981" }}>
                                    ₹{member.paid.toFixed(0)}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                    Share
                                  </Typography>
                                  <Typography variant="caption" sx={{ fontWeight: 600, color: "#ef4444" }}>
                                    ₹{member.spend.toFixed(0)}
                                  </Typography>
                                </Box>
                                <Divider sx={{ my: 0.5 }} />
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                    Balance
                                  </Typography>
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                    <Typography
                                      variant="body2"
                                      sx={{ fontWeight: 700, color }}
                                    >
                                      {balance >= 0 ? "+" : ""}₹{balance.toFixed(0)}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: "#667eea" }}>›</Typography>
                                  </Box>
                                </Box>
                              </CardContent>
                            </Card>
                          </Fade>
                        </Grid>
                      );
                    })}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Box>

            {/* Actions */}
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 2, px: { xs: 1.5, md: 2 } }}>
              <Button
                variant="outlined"
                onClick={onBack || (() => navigate("/"))}
                startIcon={<ArrowBackIcon />}
                size="small"
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleFinalize}
                size="small"
              >
                Calculate Settlements
              </Button>
            </Box>

            {/* Settlement Summary */}
            <Box sx={{ px: { xs: 1.5, md: 2 }, pb: 2 }}>
            {summary.length > 0 && (
              <Fade in timeout={400}>
                <Paper
                  elevation={0}
                  sx={{
                    background: "#f5f5f7",
                    border: "none",
                    borderRadius: 3,
                    p: { xs: 2, sm: 3 },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      textAlign: "center",
                      color: "#1d1d1f",
                    }}
                  >
                    ✨ Settlement Plan
                  </Typography>
                  
                  {/* Settlement Cards */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, mb: 3 }}>
                    {summary.map((transaction, index) => (
                      <Paper
                        key={index}
                        elevation={0}
                        sx={{
                          p: { xs: 1.5, sm: 2 },
                          background: "#ffffff",
                          borderRadius: 2,
                          border: "1px solid rgba(0, 0, 0, 0.04)",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            transform: "scale(1.01)",
                            background: "#fafafa",
                          },
                          animation: `slideIn 300ms cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 60}ms forwards`,
                          opacity: 0,
                          "@keyframes slideIn": {
                            from: { opacity: 0, transform: "translateY(10px)" },
                            to: { opacity: 1, transform: "translateY(0)" },
                          },
                        }}
                      >
                        <Box sx={{ 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "space-between",
                          gap: 1.5,
                        }}>
                          {/* From / Payer */}
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1, minWidth: 0 }}>
                            <Box sx={{
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              background: "#dc2626",
                              color: "white",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.85rem",
                              fontWeight: 600,
                              boxShadow: "0 2px 4px rgba(220, 38, 38, 0.2)",
                            }}>
                              {transaction.from.charAt(0).toUpperCase()}
                            </Box>
                            <Box sx={{ minWidth: 0 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: "#1d1d1f", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {transaction.from}
                              </Typography>
                              <Typography variant="caption" sx={{ color: "#86868b" }}>
                                Payer
                              </Typography>
                            </Box>
                          </Box>

                          {/* Arrow & Amount */}
                          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 80 }}>
                             <Typography variant="body2" sx={{ fontWeight: 700, color: "#1d1d1f", mb: -0.5 }}>
                              ₹{transaction.amount.toFixed(0)}
                            </Typography>
                             <ArrowForwardIcon sx={{ color: "#d2d2d7", fontSize: 18, my: 0.5 }} />
                          </Box>

                          {/* To / Receiver */}
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1, minWidth: 0, justifyContent: "flex-end" }}>
                            <Box sx={{ textAlign: "right", minWidth: 0 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: "#1d1d1f", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {transaction.to}
                              </Typography>
                              <Typography variant="caption" sx={{ color: "#86868b" }}>
                                Receiver
                              </Typography>
                            </Box>
                             <Box sx={{
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              background: "#16a34a",
                              color: "white",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.85rem",
                              fontWeight: 600,
                              boxShadow: "0 2px 4px rgba(22, 163, 74, 0.2)",
                            }}>
                              {transaction.to.charAt(0).toUpperCase()}
                            </Box>
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
                      size="small"
                      sx={{
                        borderRadius: 3,
                        fontWeight: 500,
                        background: "#34c759",
                        "&:hover": {
                          background: "#2fab4f",
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
          </Box>
        </Fade>
      </Box>

      {/* Member Transaction Dialog */}
      <MemberTransactionDialog
        open={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        memberName={selectedMember}
        memberInfo={memberPayInfo.find(m => m.name === selectedMember)}
        transactions={selectedMember ? getMemberTransactions(selectedMember) : []}
      />
    </Box>
  );
};

export default Overview;
