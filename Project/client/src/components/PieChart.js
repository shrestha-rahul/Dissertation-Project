import React, { useState, useEffect } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import axios from "axios";

function PieChartt() {
  const [BudgetData, setBudgetData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/get_budgets").then((res) => {
      setBudgetData(res.data);
    });
  }, []);
  // const data = [
  //   { name: "Group A", value: 400 },
  //   { name: "Group B", value: 300 },
  //   { name: "Group C", value: 1000 },
  // ];
  const COLORS = ["#31BACC", "#FF715B", "#161837"];
  return (
    <div className="w-[40%] ">
      <div className="border-2 border-gray-800 h-[160px] flex items-center justify-center ">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={BudgetData}
              innerRadius={60}
              outerRadius={70}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="amount"
            >
              {BudgetData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center space-x-1">
          <div className="w-[8px] h-[8px] rounded-full bg-[#161837]"></div>
          <h3>Bill</h3>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-[8px] h-[8px] rounded-full bg-[#31BACC]"></div>
          <h3>Food</h3>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-[8px] h-[8px] rounded-full bg-[#FF715B]"></div>
          <h3>Car</h3>
        </div>
      </div>
    </div>
  );
}

export default PieChartt;
