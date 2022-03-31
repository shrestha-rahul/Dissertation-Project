import React from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

function DounatChart() {
  const data = [
    { name: "Car", value: 400 },
    { name: "Car", value: 600 },
    { name: "Bill", value: 300 },
    { name: "Bill", value: 200 },
    { name: "Housing", value: 650 },
    { name: "Housing", value: 200 },
  ];

  const COLORS = [
    "#147AD6",
    "#31BACC",
    "#161837",
    "#F6EFF4",
    "#69F37C",
    "#FF715B",
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <div className="w-full h-[190px] border-b-2 border-gray-800">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={70}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div>
        <div className="border-gray-900 py-3 grid grid-cols-2 -mr-2">
          <div className="flex items-center space-x-1 ">
            <div className="w-[10px] h-[10px] rounded-full bg-[#147AD6]"></div>
            <h3>Car</h3>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-[10px] h-[10px] rounded-full bg-[#161837]"></div>
            <h3>Car</h3>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-[10px] h-[10px] rounded-full bg-[#79D2DE]"></div>
            <h3>Bills</h3>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-[10px] h-[10px] rounded-full bg-[#F6EFF4]"></div>
            <h3>Bills</h3>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-[10px] h-[10px] rounded-full bg-[#FF715B]"></div>
            <h3>Housing</h3>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-[10px] h-[10px] rounded-full bg-[#69F37C]"></div>
            <h3>Housing</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default DounatChart;
