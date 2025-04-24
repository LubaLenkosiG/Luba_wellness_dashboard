"use client";

import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// RiskAreaChart component
const RiskAreaChart = ({ records }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (records && records.length > 0) {
      // Group records by month (or other grouping criteria)
      const groupedData = records.reduce((acc, record) => {
        const month = new Date(record.createdAt); // Group by month
        console.log("Month :::: ",month)
        if (!acc[month]) {
          acc[month] = {
            name: month,
            total: 0,
            diabetes: 0,
            hypertension: 0,
            kidney: 0,
          };
        }

        // Increment total and disease counts
        acc[month].total += 1;
        if (record.disease?.includes("Diabetes")) acc[month].diabetes += 1;
        if (record.disease?.includes("Hypertension")) acc[month].hypertension += 1;
        if (record.disease?.includes("Kidney")) acc[month].kidney += 1;

        return acc;
      }, {});

      // Convert grouped data into an array and set it to chartData
      setChartData(Object.values(groupedData));
    }
  }, [records]);

  return (
    <ResponsiveContainer width="100%" height={300} className={"bg-[#2d416c]/90 rounded-xl"}>
      <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2d416c" />
        <XAxis dataKey="name" stroke="#FCFBF4" />
        <YAxis stroke="#FCFBF4" />
        <Tooltip contentStyle={{ backgroundColor: "#252564", color: "#FCFBF4" }} />
        <Area
          type="monotone"
          dataKey="total"
          stackId="1"
          stroke="#e3c53c"
          fill="#e3c53c"
          fillOpacity={0.9}
        />
        <Area
          type="monotone"
          dataKey="diabetes"
          stackId="1"
          stroke="#252564"
          fill="#252564"
          fillOpacity={0.9}
        />
        <Area
          type="monotone"
          dataKey="hypertension"
          stackId="1"
          stroke="#2d416c"
          fill="#2d416c"
          fillOpacity={0.9}
        />
        <Area
          type="monotone"
          dataKey="kidney"
          stackId="1"
          stroke="#FCFBF4"
          fill="#FCFBF4"
          fillOpacity={0.8}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default RiskAreaChart;
