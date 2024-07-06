import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "../Data/Table";
import Header from "./Header";
import CreateTrip from "../Trip/CreateTrip";
import NewExpense from "../Trip/NewExpense";
import Overview from "../overviewDiplay/Overview";

const Home = () => {
  const [newMember, setNewMember] = useState([]);
  const [trips, setTrips] = useState(() => {
    const storedTrips = JSON.parse(localStorage.getItem("trips")) || [];
    return storedTrips;
  });

  const [allExpense, setAllExpense] = useState(() => {
    const storedExpense = JSON.parse(localStorage.getItem("allExpense")) || [];
    return storedExpense;
  });

  const addNewMember = (members) => {
    setNewMember((prevState) => [...prevState, members]);
  };
  const addNewExpense = (expense) => {
    setAllExpense((prevState) => [...prevState, expense]);
  };

  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem("allExpense", JSON.stringify(allExpense));
  }, [allExpense]);

  const getMemberNames = (trips) => {
    return trips
      .flatMap((trip) => [
        trip.member1,
        trip.member2,
        trip.member3,
        trip.member4,
      ])
      .filter(Boolean);
  };

  const memberNames = getMemberNames(trips);

  const totalAmount = allExpense.reduce(
    (acc, curr) => acc + (parseFloat(curr.amount) || 0),
    0
  );

  return (
    <Box>
      <Header allExpense={allExpense} totalAmount={totalAmount} />
      <CreateTrip
        addNewMember={addNewMember}
        setTrips={setTrips}
        trips={trips}
      />
      <NewExpense addNewExpense={addNewExpense} memberNames={memberNames} />
      <Table allExpense={allExpense} />
      <Overview totalAmount={totalAmount} />
    </Box>
  );
};

export default Home;
