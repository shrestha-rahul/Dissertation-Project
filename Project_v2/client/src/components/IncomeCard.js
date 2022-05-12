import React, { useState, useEffect } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import axios from "axios";
import SERVER_URL from "../server_conf";

function IncomeCard(){
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get(`${SERVER_URL}/total_income`).then((row) => {
      setTotal(row.data);
    });
  });
  return (
    <div className="w-[30%] h-[80px] px-[2px] pt-[2px] border-2 border-gray-800 flex flex-col rounded-md">
      <div className="h-[40px] bg-[#161837] text-white rounded-md text-center flex items-center justify-between px-2">
        <span>Income</span>
        <AddCircleOutlineOutlinedIcon />
      </div>
      <div className="h-[40px] flex items-center px-1">
        <span
          className="text-[#199F22] font-semibold">
            £{total}
        </span>
      </div>
    </div>
  );
}

export default IncomeCard;
