import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createExpenseAct } from "../../Store/Actions/expenseActions";

function AddExpenseForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  const onClickAddHandeler = (e) => {
    e.preventDefault();
    dispatch(createExpenseAct(name, +price, category));
  };

  return (
    <form className=" w-fit mx-auto p-5 bg-slate-200 flex  flex-col justify-center items-center gap-5">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Expense Name"
      />
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        placeholder="Price"
      />
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        type="text"
        placeholder="Category"
      />
      <button onClick={onClickAddHandeler} className=" bg-green-200">
        Add Expense
      </button>
    </form>
  );
}

export default AddExpenseForm;
