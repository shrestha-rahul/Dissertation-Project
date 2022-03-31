import React from "react";

function CardBudgets_Item({ image, title, start, end }) {
  return (
    <div className="flex border-2 border-gray-800 rounded-lg">
      <img src={image} className="w-[50px]" />
      <div className="flex flex-col justify-between w-full py-1 px-1">
        <span className="text-md">{title}</span>
        <div>
          <p className="text-xs">
            {start} of total {end}
          </p>
          <div className="h-[6px] bg-[#CDD5E1] w-full rounded-md overflow-hidden">
            <div className="h-full bg-[#ED6C30] w-[50%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardBudgets_Item;
