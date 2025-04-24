"use client";

import { useEffect, useState } from "react";
import BarChartCard from "@/app/graphs/BarChartCard";
import LineChartCard from "@/app/graphs/LineChartCard";
import RiskAreaChart from "@/app/graphs/RiskAreaChart";
import UserCard from "@/components/UserCard";
import { FaHeartbeat, FaTint, FaDiagnoses, FaChartLine } from "react-icons/fa";

const DashAdmin = () => {
  const [patientData, setPatientData] = useState({
    totalPredictions: 0,
    diabetesRisk: 0,
    hypertensionRisk: 0,
    kidneyDiseaseRisk: 0,
    records: [],
  });

  useEffect(() => {
    const fetchPatientRecords = async () => {
      const uuidKey = sessionStorage.getItem("uuidKey");
      console.log("UuidKey Data : ", uuidKey);

      if (uuidKey) {
        try {
          const response = await fetch(
            `https://luba-backend.vercel.app/api/savePatient/get-patient-records?uuidKey=${uuidKey}`
          );
          const data = await response.json();
          console.log("Fetched Data:", data);

          if (!Array.isArray(data.patientRecords)) {
            console.error("Unexpected response format", data);
            return;
          }

          const totalPredictions = data.patientRecords.length;
          const diabetesRisk = data.patientRecords.filter((record) =>
            record.disease?.includes("Diabetes")
          ).length;
          const hypertensionRisk = data.patientRecords.filter((record) =>
            record.disease?.includes("Hypertension")
          ).length;
          const kidneyDiseaseRisk = data.patientRecords.filter((record) =>
            record.disease?.includes("Kidney")
          ).length;

          setPatientData({
            totalPredictions,
            diabetesRisk,
            hypertensionRisk,
            kidneyDiseaseRisk,
            records: data.patientRecords,
          });
        } catch (error) {
          console.error("Error fetching patient records:", error);
        }
      }
    };

    fetchPatientRecords();
  }, []);

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 lg:flex-nowrap justify-between flex-wrap">
          <UserCard
            type="Total Predictions"
            icon={<FaChartLine />}
            height={"30vh"}
            value={patientData.totalPredictions}
            description="Total predictions made so far"
          />
          <UserCard
            type="Diabetes Risk"
            icon={<FaHeartbeat />}
            height={"30vh"}
            value={`${patientData.diabetesRisk} (${
              patientData.totalPredictions
                ? (
                    (patientData.diabetesRisk / patientData.totalPredictions) *
                    100
                  ).toFixed(2)
                : 0
            }%)`}
            description="Predicted high-risk cases for diabetes"
          />
          <UserCard
            type="Hypertension Risk"
            icon={<FaTint />}
            height={"30vh"}
            value={`${patientData.hypertensionRisk} (${
              patientData.totalPredictions
                ? (
                    (patientData.hypertensionRisk /
                      patientData.totalPredictions) *
                    100
                  ).toFixed(2)
                : 0
            }%)`}
            description="Predicted high-risk cases for hypertension"
          />
          <UserCard
            type="Kidney Disease Risk"
            icon={<FaDiagnoses />}
            height={"30vh"}
            value={`${patientData.kidneyDiseaseRisk} (${
              patientData.totalPredictions
                ? (
                    (patientData.kidneyDiseaseRisk /
                      patientData.totalPredictions) *
                    100
                  ).toFixed(2)
                : 0
            }%)`}
            description="Predicted high-risk cases for kidney disease"
          />
        </div>
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full h-[365px]">
            <LineChartCard records={patientData.records} />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <div className="w-full h-[300px]">
          <BarChartCard records={patientData.records} />
        </div>
        <div className="w-full h-[230px]">
          <RiskAreaChart records={patientData.records} />
        </div>
      </div>
    </div>
  );
};

export default DashAdmin;
