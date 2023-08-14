import React from "react";

function Pagination({ totalCount, limit, skip, setSkip }) {
  const numberOfBtn = Math.ceil(totalCount / limit);

  const currentPage = Math.floor(skip / limit) + 1;

  const onClickBtn = (pageNumber) => {
    setSkip(limit * (pageNumber - 1));
  };

  const btnArr = [];
  for (let i = 1; i <= numberOfBtn; i++) {
    btnArr.push(
      <button
        onClick={() => onClickBtn(i)}
        key={i}
        className={` p-2 rounded-md ${
          currentPage == i ? "bg-blue-500" : "bg-white"
        } `}
      >
        {i}
      </button>
    );
  }

  return (
    <div className=" flex  gap-5 p-4 justify-center bg-black text-black w-full">
      {btnArr}
    </div>
  );
}

export default Pagination;
