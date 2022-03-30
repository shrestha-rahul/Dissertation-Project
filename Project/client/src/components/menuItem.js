import React from "react";

const menuItem = ({ Icon, Title }) => {
  return (
    <li className={"space-x-5 font-semibold px-4 py-2 hover:bg-gray-200"}>
      <Icon />
      <span>{Title}</span>
    </li>
  );
};

export default menuItem;
