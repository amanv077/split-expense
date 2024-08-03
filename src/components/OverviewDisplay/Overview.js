import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const Overview = ({ allExpense, trip = { members: [] } }) => {
  console.log("Trips", trip, "allExpense", allExpense);

  const totalAmount = allExpense.reduce(
    (acc, curr) => acc + (parseFloat(curr.amount) || 0),
    0
  );

  const memberPayInfo = trip.members.map((name) => ({
    name,
    paid: 0,
    spend: 0,
  }));

  allExpense.forEach((expense) => {
    const spentOnEachMember = Math.round(
      expense.amount / expense.selectedMembers.length,
      2
    );

    const memberWhoPaid = memberPayInfo.find(
      (member) => member.name === expense.selectedUser
    );

    memberWhoPaid.paid = memberWhoPaid.paid + Number(expense.amount);

    expense.selectedMembers.forEach((name) => {
      const selectedMember = memberPayInfo.find(
        (member) => member.name === name
      );
      selectedMember.spend = selectedMember.spend + spentOnEachMember;
    });
  });
  console.log("member", { memberPayInfo });

  const [summary, setSummary] = useState([]);

  function calculateNetBalances(memberPayInfo) {
    return memberPayInfo.map((member) => ({
      name: member.name,
      net: member.paid - member.spend,
    }));
  }

  function settleBalances(memberPayInfo) {
    const netBalances = calculateNetBalances(memberPayInfo);

    // Separate into payers and receivers
    let payers = netBalances.filter((member) => member.net < 0);
    let receivers = netBalances.filter((member) => member.net > 0);

    payers = payers.map((payer) => ({ ...payer, net: Math.abs(payer.net) })); // Convert net to positive for payers

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
  }

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
          width: "100vw",
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
