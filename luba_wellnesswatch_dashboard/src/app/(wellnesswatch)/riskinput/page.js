"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Divider,
  Tooltip,
} from "@mui/material";
import { RiskCols } from "@/app/constants/RiskInput";
import ResultModal from "@/components/ResultModal";
import FailedModal from "@/components/FailModal";
import { LuLoaderCircle } from "react-icons/lu";  // Importing the loader icon

const RiskInput = () => {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    BMI: "",
    familyHistory: "",
    smokingStatus: "",
    physicalActivity: "",
    fbs: "",
    restbp: "",
    chol: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
    serumCreatinine: "",
    HbA1c: "",
    urineProtein: "",
    patientId: "",
    patientPhone: "",
  });

  const [result, setResult] = useState({
    ckd: 0,
    diabetes: 0,
    hypertension: 0,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);  // Loading state

  const handleChange = (event) => {
    const { name, value } = event.target;
    const sanitizedValue =
      value !== "" && !isNaN(value) && Number(value) < 0 ? "0" : value;
    setFormData({ ...formData, [name]: sanitizedValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);  // Set loading to true when form is submitted

    // Sanitize numeric values
    const sanitizedData = { ...formData };
    Object.keys(sanitizedData).forEach((key) => {
      if (sanitizedData[key] === "" || Number(sanitizedData[key]) < 0) {
        sanitizedData[key] = 0;
      }
    });

    // Map the form data to the expected API input format
    const inputData = {
      age: sanitizedData.age,
      sex: sanitizedData.sex,
      BMI: sanitizedData.BMI,
      family_history: sanitizedData.familyHistory,
      smoking_status: sanitizedData.smokingStatus,
      physical_activity: sanitizedData.physicalActivity,
      fbs: sanitizedData.fbs,
      restbp: sanitizedData.restbp,
      chol: sanitizedData.chol,
      thalach: sanitizedData.thalach,
      exang: sanitizedData.exang,
      oldpeak: sanitizedData.oldpeak,
      slope: sanitizedData.slope,
      ca: sanitizedData.ca,
      thal: sanitizedData.thal,
      serum_creatinine: sanitizedData.serumCreatinine,
      HbA1c: sanitizedData.HbA1c,
      urine_protein: sanitizedData.urineProtein,
    };

    try {
      const response = await fetch("https://lubas-modelapi-6mec.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      });

      if (!response.ok) {
        throw new Error("Prediction request failed");
      }

      const resultData = await response.json();
      // Expected response: { ckd_risk: 0.3, diabetes_risk: 0.66, hypertension_risk: 0.56 }
      setResult({
        ckd: resultData.ckd_risk,
        diabetes: resultData.diabetes_risk,
        hypertension: resultData.hypertension_risk,
      });

      // Optionally, if you want to save patient records you can still create a record similar to before:
      const patientRecord = {
        uuidKey: sessionStorage.getItem("uuidKey"),
        patientData: {
          name: sanitizedData.patientId,
          gender: sanitizedData.sex === "1" ? "Male" : "Female",
          age: sanitizedData.age,
          BMI: sanitizedData.BMI,
          smokingStatus: sanitizedData.smokingStatus,
          physicalActivity: sanitizedData.physicalActivity,
          serumCreatinine: sanitizedData.serumCreatinine,
          HbA1c: sanitizedData.HbA1c,
          urineProtein: sanitizedData.urineProtein,
          patientId: sanitizedData.patientId,
          patientPhone: sanitizedData.patientPhone,
          riskDetails: `CKD Risk: ${resultData.ckd_risk * 100}%, Diabetes Risk: ${resultData.diabetes_risk * 100}%, Hypertension Risk: ${resultData.hypertension_risk * 100}%`,
        },
      };

      const saveResponse = await fetch(
        "https://luba-backend.vercel.app/api/savePatient/save-patient-record",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patientRecord),
        }
      );

      if (!saveResponse.ok) {
        throw new Error("Failed to save patient record");
      }

      setShowSuccessModal(true);
    } catch (error) {
      setErrorMessage(error.message || "An unknown error occurred");
      setShowFailedModal(true);
    } finally {
      setLoading(false);  // Set loading to false once request is finished
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-inherit relative">
      <div className="bg-[#252564] p-6 text-[#FCFBF4]/60 rounded-lg shadow-lg w-full lg:max-w-xl relative z-10">
        <h1 className="text-2xl font-bold text-center mb-4 max-sm:text-[18px]">
          Risk Feature Input
        </h1>
        <Divider className="bg-textLight" />
        <p className="mt-2 text-center mb-6 max-sm:text-sm">
          Enter the patient’s details and risk features. The system will determine the risk levels based on the input.
        </p>
        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" className="space-y-4">
          <div className="grid lg:grid-cols-2 max-sm:grid-cols-1 gap-4">
            {RiskCols.map(({ label, name, type, options, placeholder }, index) => (
              <Tooltip key={index} title={placeholder || label} placement="top">
                <TextField
                  label={label}
                  variant="outlined"
                  fullWidth
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  select={!!options}
                  placeholder={placeholder}
                  sx={{
                    "& .MuiInputBase-input": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                  }}
                >
                  {options && options.map((option, idx) => (
                    <MenuItem key={idx} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Tooltip>
            ))}
          </div>
          <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: "#FCFBF4", borderRadius: "10px", color:"#2d416c", padding: "10px 0" }}>
            {loading ? (
              <LuLoaderCircle className="animate-spin text-[#2d416c]" size={24} />
            ) : (
              "Submit Risk Features"
            )}
          </Button>
        </Box>
        {showSuccessModal && (
          <ResultModal
            message={`CKD Risk: ${(result.ckd * 100).toFixed(0)}% | Diabetes Risk: ${(result.diabetes * 100).toFixed(0)}% | Hypertension Risk: ${(result.hypertension * 100).toFixed(0)}%`}
            result={"success"}
            onClose={() => setShowSuccessModal(false)}
          />
        )}
        {showFailedModal && (
          <FailedModal
            message={errorMessage}
            result="error"
            onClose={() => setShowFailedModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default RiskInput;
