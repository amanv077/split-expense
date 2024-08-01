import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "../Data/Table";
import Header from "./Header";
import CreateTrip from "../Trip/CreateTrip";
import NewExpense from "../Trip/NewExpense";
import Overview from "../overviewDiplay/Overview";

const Home = () => {
  const [trips, setTrips] = useState(() => {
    const storedTrips = JSON.parse(localStorage.getItem("trips")) || [];
    return storedTrips;
  });

  const [allExpense, setAllExpense] = useState(() => {
    const storedExpense = JSON.parse(localStorage.getItem("allExpense")) || [];
    return storedExpense;
  });

  const addNewExpense = (expense) => {
    setAllExpense((prevState) => [...prevState, expense]);
  };

  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem("allExpense", JSON.stringify(allExpense));
  }, [allExpense]);

  const totalAmount = allExpense.reduce(
    (acc, curr) => acc + (parseFloat(curr.amount) || 0),
    0
  );

  return (
    <Box>
      <Header allExpense={allExpense} totalAmount={totalAmount} />
      <CreateTrip setTrips={setTrips} trips={trips} />
      <NewExpense
        addNewExpense={addNewExpense}
        trip={trips[0]}
        allExpense={allExpense}
      />
      <Table allExpense={allExpense} />
      <Overview allExpense={allExpense} trip={trips[0]} />
    </Box>
  );
};

export default Home;
