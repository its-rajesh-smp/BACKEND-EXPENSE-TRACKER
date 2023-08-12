import React from "react";
import AddExpenseForm from "../Components/HomePage/AddExpenseForm";
import ExpensesContainer from "../Components/HomePage/ExpensesContainer";

function HomePage() {
  return (
    <div>
      <AddExpenseForm />
      <ExpensesContainer />
    </div>
  );
}

export default HomePage;
