"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarChartCard = ({ records }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (records && records.length > 0) {
      // Group patients into categories (e.g., age groups, risk levels, etc.)
      const groupedData = records.reduce((acc, record) => {
        const group = record.group || "Unknown"; // Use record's group field if available
        if (!acc[group]) {
          acc[group] = {
            group,
            diabetesRisk: 0,
            hypertensionRisk: 0,
            kidneyHealthRisk: 0,
          };
        }
        if (record.disease?.includes("Diabetes")) acc[group].diabetesRisk += 1;
        if (record.disease?.includes("Hypertension")) acc[group].hypertensionRisk += 1;
        if (record.disease?.includes("Kidney")) acc[group].kidneyHealthRisk += 1;

        return acc;
      }, {});

      setChartData(Object.values(groupedData));
    }
  }, [records]);

  return (
    <div className="w-full h-full bg-[#2d416c]/90 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-textLight">Risk Levels by Group</h4>
      </div>
      <div className="w-full h-[75%]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="group" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="diabetesRisk" fill="#8884d8" />
            <Bar dataKey="hypertensionRisk" fill="#82ca9d" />
            <Bar dataKey="kidneyHealthRisk" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartCard;
