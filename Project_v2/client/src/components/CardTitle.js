import React from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Link } from "react-router-dom";

function CardTitle({ children, className, removeButton, path }) {
  return (
    <div
      className={`text-2xl flex border-b-2 relative border-gray-800 mb-3 pb-1 w-full ${className}`}
    >
      <span>{children}</span>
      <Link to={`${path}`}>
        <div className="absolute right-0">
          {!removeButton && <AddCircleOutlineOutlinedIcon />}
        </div>
      </Link>
    </div>
  );
}

export default CardTitle;
