import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
function ChartEnterTicket() {
  const data = [
    {
      name: "DEC 11",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "DEC 12",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "DEC 13",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "DEC 14",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "DEC 15",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "DEC 16",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "DEC 17",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <div className=" w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: -10,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#FF4991" fill="#FF4991" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartEnterTicket;
