import React from "react";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";

function Date() {
  return (
    <div className="flex items-center space-x-1">
      <DateRangeOutlinedIcon /> <span>Feb,2022 - March,2022</span>
    </div>
  );
}

export default Date;
