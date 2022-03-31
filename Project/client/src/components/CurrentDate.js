import React from "react";

function CurrentDate() {
  return (
    <div className="flex justify-between w-full">
      <div className="flex space-x-2">
        <img src="menu.svg" alt="" />
        <p className="flex">
          March <span className="ml-2">2022</span>
        </p>
      </div>
      <img src="search.svg" alt="" />
    </div>
  );
}

export default CurrentDate;
