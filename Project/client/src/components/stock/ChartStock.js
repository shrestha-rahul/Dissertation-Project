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
function ChartStock() {
  const data = [
    {
      name: "M",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "T",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "W",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "T",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "F",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "S",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "S",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <div className=" w-full h-[130px]">
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
          <Area type="monotone" dataKey="uv" stroke="#147AD6" fill="#147AD6" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartStock;
