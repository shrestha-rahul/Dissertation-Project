import React from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

function CardTitle({ children, className, removeButton }) {
  return (
    <div
      className={`text-2xl flex border-b-2 relative border-gray-800 mb-3 pb-1 w-full ${className}`}
    >
      <span>{children}</span>
      <div className="absolute right-0">
        {!removeButton && <AddCircleOutlineOutlinedIcon />}
      </div>
    </div>
  );
}

export default CardTitle;
