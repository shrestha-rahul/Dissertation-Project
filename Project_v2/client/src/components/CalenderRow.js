import React from "react";
import CalenderRowItem from "./CalenderRowItem";
import {
  selectCurrentdate,
  selectDatesbehind,
  selectDatescome,
  selectDay,
} from "./dateSlice";
import { useSelector } from "react-redux";

function CalenderRow() {
  const datesbehind = useSelector(selectDatesbehind);
  const datescome = useSelector(selectDatescome);
  const currentdate = useSelector(selectCurrentdate);
  const day = useSelector(selectDay);

  return (
    <div>
      <ul className="flex justify-between items-center cursor-pointer my-2">
        {datesbehind
          .map((datebehind) => (
            <CalenderRowItem key={datebehind} date={datebehind} />
          ))
          .reverse()}
        <CalenderRowItem date={currentdate} active="true" day={day} />
        {datescome.map((datecome) => (
          <CalenderRowItem key={datecome} date={datecome} />
        ))}
      </ul>
    </div>
  );
}

export default CalenderRow;
