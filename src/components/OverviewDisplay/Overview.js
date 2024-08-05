import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
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
      while (payer.net > 0) {
        const receiver = receivers.find((r) => r.net > 0);
        if (!receiver) break;

        const payment = Math.min(payer.net, receiver.net);
        transactions.push({
          from: payer.name,
          to: receiver.name,
          amount: payment,
        });

        payer.net -= payment;
        receiver.net -= payment;

        if (receiver.net === 0) {
          receivers = receivers.filter((r) => r.net > 0);
        }
      }
    });

    return transactions;
  };

  const handleFinalize = () => {
    const transactions = settleBalances(memberPayInfo);
    setSummary(transactions);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        paddingTop: 8, // Ensures the content is not hidden behind the navbar
        "& > :not(style)": {
          width: "100vw",
          maxWidth: 800,
        },
      }}
    >
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Box sx={{ textAlign: "center", marginBottom: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Complete Expense Summary
          </Typography>
          <Typography variant="h6">
            Total Trip Cost: ₹{totalAmount.toFixed(2)}
          </Typography>
        </Box>
        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          {memberPayInfo.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member.name}>
              <Card sx={{ padding: 2 }}>
                <CardContent>
                  <Typography variant="h6">Name: {member.name}</Typography>
                  <Typography>Paid: ₹{member.paid.toFixed(2)}</Typography>
                  <Typography>Cost: ₹{member.spend.toFixed(2)}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: "center", marginBottom: 3 }}>
          <Button variant="contained" color="primary" onClick={handleFinalize}>
            Finalize
          </Button>
          <Button
            sx={{ marginLeft: 2 }}
            variant="contained"
            onClick={() => navigate("/")}
          >
            Back
          </Button>
        </Box>
        {summary.length > 0 && (
          <Box sx={{ textAlign: "center", marginTop: 3 }}>
            <Typography variant="h6" gutterBottom>
              Settlement Summary
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 2,
                padding: 2,
                border: "1px solid #ddd",
                borderRadius: 1,
                backgroundColor: "#fafafa",
              }}
            >
              {summary.map((transaction, index) => (
                <Typography key={index} sx={{ marginY: 1 }}>
                  {transaction.from} will pay {transaction.to} an amount of ₹
                  {transaction.amount.toFixed(2)}
                </Typography>
              ))}
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Overview;
