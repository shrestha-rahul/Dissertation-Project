import React from "react";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";

function Date() {
  return (
    <div className="flex items-center space-x-1">
      <DateRangeOutlinedIcon /> <span>April,2022 - May,2022</span>
    </div>
  );
}

export default Date;
