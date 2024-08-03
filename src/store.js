import React, { createContext, useContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

function StoreProvider({ children }) {
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
    <StoreContext.Provider
      value={{
        totalAmount,
        addNewExpense,
        setTrips,
        trips,
        allExpense,
        setAllExpense,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStoreProvider = () => useContext(StoreContext);
export default StoreProvider;
