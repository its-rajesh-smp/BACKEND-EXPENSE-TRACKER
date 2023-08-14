import React, { useEffect, useState } from "react";
import Expense from "./Expense";
import { useDispatch, useSelector } from "react-redux";
import ShowExpense from "./ShowExpense";
import Pagination from "./Pagination";
import axios from "axios";
import { EXPENSE_GET } from "../../Api/endpoints";
import { setExpenses } from "../../Store/Reducer/expenseSlice";

function ExpensesContainer() {
  const { expenses, totalCount } = useSelector((state) => state.expenseSlice);
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(3);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const localIdToken = localStorage.getItem("expensetracker_idToken");
        if (!localIdToken) {
          return;
        }

        const { data } = await axios.get(`${EXPENSE_GET}/${limit}/${skip}`, {
          headers: { Authorization: localIdToken },
        });

        dispatch(
          setExpenses({ expenses: data.expenses, totalCount: data.totalCount })
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, [skip, limit]);

  return (
    <>
      <ShowExpense setSkip={setSkip} setLimit={setLimit} limit={limit} />
      <div className=" p-5 flex flex-col gap-5">
        {expenses
          .map((expense) => {
            return (
              <Expense
                name={expense.name}
                price={expense.price}
                category={expense.category}
                id={expense.id}
                key={expense.id}
              />
            );
          })
          .slice(0, limit)}
      </div>
      <Pagination
        setLimit={setLimit}
        totalCount={totalCount}
        limit={limit}
        skip={skip}
        setSkip={setSkip}
      />
    </>
  );
}

export default ExpensesContainer;
