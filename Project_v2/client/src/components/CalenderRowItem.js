import React from "react";

function CalenderRowItem({ date, day, active }) {
  const classActive =
    "bg-gradient-to-br from-[#161837] to-blue-[#FFFFFF] py-1 px-3 rounded-md border-2 border-white shadow-md text-white";
  return (
    <li className={`${active && classActive} flex flex-col items-center`}>
      {date}
      <p className={`text-xs font-light -mt-1 ${!active && "hidden"}`}>{day}</p>
    </li>
  );
}

export default CalenderRowItem;
