import React from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
function IncomeCard({ expenses }) {
  return (
    <div className="w-[30%] h-[80px] px-[2px] pt-[2px] border-2 border-gray-800 flex flex-col rounded-md">
      <div className="h-[40px] bg-[#161837] text-white rounded-md text-center flex items-center justify-between px-2">
        <span>{expenses ? "Expenses" : "Income"}</span>
        <AddCircleOutlineOutlinedIcon />
      </div>
      <div className="h-[40px] flex items-center px-1">
        <span
          className={`${
            expenses ? "text-[#B10000]" : "text-[#199F22]"
          } font-semibold`}
        >
          £1234
        </span>
      </div>
    </div>
  );
}

export default IncomeCard;
