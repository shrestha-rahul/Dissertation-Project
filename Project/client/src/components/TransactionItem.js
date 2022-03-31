import React from "react";

function TransactionItem({
  image,
  title,
  subTitle,
  price,
  date,
  dayRemaining,
  textColor,
}) {
  const className = dayRemaining
    ? "text-xs font-bold italic"
    : "text-sm font-bold";
  return (
    <div className=" border-2 border-gray-800 rounded-lg px-1">
      <div className="flex justify-between">
        <div className="flex">
          <img src={image} className="w-[45px] mr-1" />
          <div>
            <span className="text-sm font-bold">{title}</span>
            <p className="">{subTitle}</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`${className} ${textColor}`}>
            {dayRemaining ? dayRemaining : price}
          </span>
          <p className="font-xs italic font-light">{date}</p>
        </div>
      </div>
    </div>
  );
}

export default TransactionItem;
