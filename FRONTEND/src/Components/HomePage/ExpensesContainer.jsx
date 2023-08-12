import React from "react";
import Expense from "./Expense";
import { useSelector } from "react-redux";

function ExpensesContainer() {
  const { expenses } = useSelector((state) => state.expenseSlice);

  return (
    <div className=" p-5 flex flex-col gap-5">
      {expenses.map((expense) => {
        return (
          <Expense
            name={expense.name}
            price={expense.price}
            category={expense.category}
            id={expense.id}
            key={expense.id}
          />
        );
      })}
    </div>
  );
}

export default ExpensesContainer;
