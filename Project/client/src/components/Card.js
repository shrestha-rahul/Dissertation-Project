import React from "react";

function Card({ children, className, row }) {
  const direction = row ? "flex-row" : "flex-col";
  return (
    <div
      className={`border-2  border-gray-800 rounded-[26px] p-3 flex ${direction} bg-white ${
        className && className
      }`}
    >
      {children}
    </div>
  );
}

export default Card;
