import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteExpenseAct } from "../../Store/Actions/expenseActions";
import { useDispatch } from "react-redux";

function Expense({ name, price, id, category }) {
  const dispatch = useDispatch();

  /* -------------------------------------------------------------------------- */
  /*                           DELETE EXPENSE HANDELER                          */
  /* -------------------------------------------------------------------------- */
  const deleteExpenseHandeler = () => {
    dispatch(deleteExpenseAct(id, price));
  };

  return (
    <div className=" flex p-2 justify-between  h-full bg-pink-50">
      <p>{name}</p>
      <p>{price}</p>
      <p>{category}</p>
      <div className=" flex items-center gap-5">
        <AiOutlineDelete
          onClick={deleteExpenseHandeler}
          className=" cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Expense;
