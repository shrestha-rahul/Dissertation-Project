import React from "react";
import StockItemName from "./StockItemName";
import StockItemValue from "./StockItemValue";
import StockItemPercentage from "./StockItemPercentage";
import StockItemImage from "./StockItemImage";
function GainersItem({ image, name, value, percentage, lose }) {
  return (
    <div className="flex w-full border-2 border-gray-800 py-1 px-2 rounded-2xl">
      <div className="flex  w-full items-center justify-between">
        <div className="flex items-center space-x-2">
          <StockItemImage image={image} />
          <StockItemName name={name} />
        </div>
        <div className="flex items-center space-x-2">
          <StockItemValue value={value} lose={lose} />
          <StockItemPercentage percentage={percentage} />
        </div>
      </div>
    </div>
  );
}

export default GainersItem;
