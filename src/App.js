import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./theme/Theme";
import Navbar from "./components/Homepage/Navbar/page";
import Main from "./components/Homepage/Main/page";

const App = () => {
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
    <ThemeProvider theme={Theme}>
      <Navbar />
      <Main
        trips={trips}
        setTrips={setTrips}
        addNewExpense={addNewExpense}
        allExpense={allExpense}
      />
    </ThemeProvider>
  );
};

export default App;
