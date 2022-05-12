import arrowdownsmall from "./arrowdownsmall.svg";
import arrowsmall from "./arrowsmall.svg";

function StockItemValue({ value, lose }) {
  return (
    <div className="flex space-x-2 items-center ">
      <img
        src={`${lose ? arrowdownsmall : arrowsmall}`}
        className="-mx-2 -mb-2"
      />
      <p className="text-[12px] font-bold">{value}</p>
    </div>
  );
}

export default StockItemValue;
