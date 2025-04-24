"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";

const LineChartCard = ({ records }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (records && records.length > 0) {
      console.log("Records :: ",records)
      const weeklyData = records.reduce((acc, record, index) => {
        const week = `Week ${Math.ceil((index + 1) / 5)}`; // Group every 5 records as a week
        if (!acc[week]) {
          acc[week] = {
            name: week,
            totalPredictions: 0,
            diabetesRisk: 0,
            hypertensionRisk: 0,
          };
        }
        acc[week].totalPredictions += 1;
        if (record.disease?.includes("Diabetes")) acc[week].diabetesRisk += 1;
        if (record.disease?.includes("Hypertension")) acc[week].hypertensionRisk += 1;
        return acc;
      }, {});

      setChartData(Object.values(weeklyData));
    }
  }, [records]);

  return (
    <div className="w-full h-full bg-[#2d416c]/90 rounded-xl p-4">
      <div className="flex justify-between items-center">
        <h4 className="text-textLight">Predictions Over Time</h4>
      </div>
      <div className="w-full h-full p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={600} height={350} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalPredictions" stroke="#8884d8" />
            <Line type="monotone" dataKey="diabetesRisk" stroke="#82ca9d" />
            <Line type="monotone" dataKey="hypertensionRisk" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartCard;
