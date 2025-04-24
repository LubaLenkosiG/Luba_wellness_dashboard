"use client"

import React, { useState } from "react";
import ResultModal from "./ResultModal";

const UpdatePatient = ({ patientData, onClickClose }) => {
  // State to hold the form values, initialized with patientData
  const [updatedData, setUpdatedData] = useState(patientData);
  const [result, setResult] = useState(null); // For tracking success or error result
  const [message, setMessage] = useState(""); // For the result message
  const [isModalOpen, setIsModalOpen] = useState(false); // For opening/closing modal


  // Handle change in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Filter out keys that you don't want to display in the form
  const filteredPatientData = Object.keys(updatedData).filter(
    (key) =>
      !["createdAt", "updatedAt", "__v", "userId", "_id","lastUpdated","dateInput","lastUpdated","confidence"].includes(key)
  );

  const handleSubmit = async () => {
    try {
      const uuidKey = sessionStorage.getItem("uuidKey");
      console.log("UuidKey Data : ", uuidKey);
      const response = await fetch(
        "http://localhost:3000/api/savePatient/update-patient-record",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uuidKey: uuidKey, // Replace with actual UUID key
            patientId: updatedData.patientId,
            updatedData,
          }),
        }
      );

      if (response.ok) {
        // On success, update result and open modal
        setResult("success");
        setMessage("Patient details updated successfully!");
      } else {
        // On error, update result and open modal
        setResult("error");
        setMessage("Failed to update patient details.");
      }
    } catch (error) {
      console.error("Error updating patient:", error);
      setResult("error");
      setMessage("An error occurred while updating patient details.");
    }

    // Show the modal after form submission
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClickClose(); // Close the update form
  };

  if (isModalOpen) {
    return <ResultModal message={message} result={result} onClose={handleCloseModal} />;
  }

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
        <div className="flex items-center justify-center">
          <h3 className="text-blue-600 text-xl font-bold tracking-widest uppercase">Update Patient Details</h3>
        </div>

        <form className="space-y-4 mt-8">
          {filteredPatientData.map((key) => (
            <div key={key}>
              <label className="text-gray-800 text-sm mb-2 block">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                type="text"
                placeholder={`Enter ${key}`}
                value={updatedData[key]}
                onChange={handleChange}  // Update the state on input change
                name={key}  // Use the key name to match the field
                className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
              />
            </div>
          ))}

          <div className="flex justify-between gap-4 !mt-8">
            <button
              type="button"
              onClick={onClickClose}  // Close the modal
              className="px-6 py-3 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 w-full"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}  // Handle submit
              className="px-6 py-3 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700 w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePatient;
