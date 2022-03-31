import React, { useState } from "react";
import Calendar from "react-calendar";
import { useDispatch } from "react-redux";
import {
  setCurrentdate,
  setDatesbehind,
  setDatescome,
  setDay,
} from "./dateSlice";
function CalenderReact() {
  const dispatch = useDispatch();
  const [value, onChange] = useState(new Date());
  const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  var datescome = [];
  var datesbehind = [];

  let date = value.getDate();

  for (var i = 1; i <= 3; i++) {
    datesbehind.push(date - i);
    datescome.push(date + i);
  }

  dispatch(setDatesbehind(datesbehind));
  dispatch(setDatescome(datescome));
  dispatch(setCurrentdate(date));
  dispatch(setDay(weekday[value.getDay()]));
  return (
    <div className="w-full ">
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

export default CalenderReact;
