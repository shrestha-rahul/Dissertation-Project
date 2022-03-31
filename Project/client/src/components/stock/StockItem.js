import React from "react";
import StockItemImage from "./StockItemImage";
import StockItemName from "./StockItemName";
import StockItemPercentage from "./StockItemPercentage";
import StockItemValue from "./StockItemValue";

function StockItem({ name, value, percentage, image }) {
  return (
    <div className="border-2 border-gray-800 px-1  rounded-lg">
      <StockItemName name={name} />
      <div className="flex items-center space-x-1">
        <StockItemImage image={image} />
        <div className="flex flex-col">
          <StockItemValue value={value} />
          <div>
            <StockItemPercentage percentage={percentage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockItem;
