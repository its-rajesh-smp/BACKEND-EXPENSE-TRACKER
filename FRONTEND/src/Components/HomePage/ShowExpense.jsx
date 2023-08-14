import React from "react";

function ShowExpense({ limit, setSkip, setLimit }) {
  return (
    <div className=" w-full gap-5 bg-purple-200 mt-4 flex justify-center items-center p-5">
      <p>Showing</p>
      <select
        value={limit}
        onChange={(e) => {
          setLimit(+e.target.value);
          setSkip(0);
        }}
      >
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
      <p>Expense</p>
    </div>
  );
}

export default ShowExpense;
