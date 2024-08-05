import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
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
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 3,
          width: "100%",
          backgroundColor: "#b8b8d1",
          padding: 4,
        },
      }}
    >
      <Paper elevation={3}>
        <Box sx={{ padding: 2 }}>
          <h1>Complete Expense Summary</h1>
        </Box>
        <Box sx={{ padding: 2, margin: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <h1>This Trip Cost To Group: {totalAmount}</h1>
          </Box>

          {memberPayInfo.map((member) => (
            <Box key={member.name} sx={{ margin: 2 }}>
              <h1>Name: {member.name}</h1>
              <h4>Paid: {member.paid}</h4>
              <h4>Cost: {member.spend}</h4>
            </Box>
          ))}
        </Box>
        <Box sx={{ padding: 2, margin: 2 }}>
          <Button variant="contained" color="primary" onClick={handleFinalize}>
            Finalize
          </Button>
          <Button
            sx={{ margin: "45px" }}
            variant="contained"
            type="button"
            onClick={() => navigate("/")}
          >
            Back
          </Button>
          {summary.length > 0 && (
            <Box sx={{ padding: 2, margin: 2 }}>
              <h2>Summary:</h2>
              {summary.map((transaction, index) => (
                <Box key={index} sx={{ margin: 2 }}>
                  <h4>
                    {transaction.from} will pay {transaction.to} an amount of{" "}
                    {transaction.amount}
                  </h4>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Overview;
