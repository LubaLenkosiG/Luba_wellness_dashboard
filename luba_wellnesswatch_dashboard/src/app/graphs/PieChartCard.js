"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const pieChartData = [
  { name: "Diabetes Risk", value: 70, color: "#8884d8" },
  { name: "Hypertension Risk", value: 50, color: "#82ca9d" },
  { name: "Kidney Health Risk", value: 30, color: "#ffc658" },
];

const PieChartCard = () => {
  return (
    <div className="w-full h-full bg-white rounded-xl p-4">
      <div className="flex justify-between items-center">
        <h4 className="text-bgColor">Predictions for Risk Levels</h4>
      </div>
      <div className="w-full h-[90%] mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%" // Position of the pie chart (centered)
              cy="50%" // Position of the pie chart (centered)
              outerRadius={60} // Size of the pie chart
              fill="#8884d8"
              label
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChartCard;
