"use client";

import React, { useState, useEffect } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import PatientDetails from "@/components/PatientDetails";
import TableSearch from "@/components/TableSearch";
import TableFilter from "@/components/TableFilter";
import ConfirmDelete from "@/components/ConfirmDelete";
import { FaPencil } from "react-icons/fa6";
import { PredictionCols } from "@/app/constants/PredictionCols";
import { IconButton } from "@mui/material";
import UpdatePatient from "@/components/UpdatePatient";


const PatientTableCard = () => {
  const [selectedDisease, setSelectedDisease] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [isUpdateDialogVisible, setIsUpdateDialogVisible] = useState(false);
  const [patientToUpdate, setPatientToUpdate] = useState(null);

  useEffect(() => {
    const fetchPatientRecords = async () => {
      try {
        const uuidKey = sessionStorage.getItem("uuidKey");
        console.log("UuidKey Data : ", uuidKey);

        if (uuidKey) {
          const response = await fetch(
            `https://luba-backend.vercel.app/api/savePatient/get-patient-records?uuidKey=${uuidKey}`
          );
          const data = await response.json();

          if (data && data.patientRecords) {
            console.log("Patient Data : ", data.patientRecords);
            setPatients(data.patientRecords);
          }
        } else {
          console.error("uuidKey not found in sessionStorage.");
        }
      } catch (error) {
        console.error("Failed to fetch patient records:", error);
      } finally {
        setLoading(false); // Set loading to false after the data is fetched
      }
    };

    fetchPatientRecords();
  }, []);


  const handleOpenDialog = (patient) => {
    setSelectedPatient(patient);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPatient(null);
  };

  const handleDeleteClick = (patient) => {
    setPatientToDelete(patient);
    setIsDialogVisible(true);
  };

  const handleCancelDelete = () => {
    setIsDialogVisible(false);
    setPatientToDelete(null);
  };
  const handleCancelUpdate = () => {
    setIsUpdateDialogVisible(false);
    setPatientToUpdate(null);
  };

  const handleOpenUpdateDialog = (patient) => {
    setPatientToUpdate(patient);
    setIsUpdateDialogVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (patientToDelete) {
      try {
        const uuidKey = sessionStorage.getItem("uuidKey");

        if (uuidKey) {
          const response = await fetch(
            "https://luba-backend.vercel.app/api/savePatient/delete-patient-record",
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                uuidKey: uuidKey,
                patientId: patientToDelete.patientId, // assuming `patientId` is available
              }),
            }
          );
          const data = await response.json();

          if (response.ok) {
            // If the deletion is successful, update the state to remove the patient
            setPatients((prevPatients) =>
              prevPatients.filter(
                (patient) => patient.patientId !== patientToDelete.patientId
              )
            );
          } else {
            console.error("Failed to delete patient:", data.message);
          }
        } else {
          console.error("uuidKey not found in sessionStorage.");
        }
      } catch (error) {
        console.error("Error deleting patient:", error);
      } finally {
        setIsDialogVisible(false);
        setPatientToDelete(null);
      }
    }
  };

  const filteredByDisease = selectedDisease
    ? patients.filter((patient) => patient.disease === selectedDisease)
    : patients;

  const filteredData = filteredByDisease.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.disease.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const currentPageData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderRow = (patient) => {
    const formatDateTime = (isoString) => {
      const date = new Date(isoString);
      const options = {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      return date.toLocaleString("en-GB", options).replace(",", "");
    };

    return (
      <tr
        key={patient._id}
        className="border-b border-gray-200 even:bg-slate-50/5 text-sm hover:bg-bgSoftLight text-textLight"
      >
        <td>{patient.name}</td>
        <td>{patient.gender}</td>
        <td className="hidden md:table-cell">{patient.disease}</td>
        <td className="hidden md:table-cell">{patient.riskType}</td>
        <td className="hidden md:table-cell">
          {patient.riskDetails.replace(".", " ")}:&nbsp;{patient.confidence}%
        </td>
        <td>{formatDateTime(patient.dateInput)}</td>
        <td className="hidden sm:table-cell">
          {formatDateTime(patient.lastUpdated)}
        </td>
        <td className="flex items-center gap-4">
          <IconButton onClick={() => handleOpenDialog(patient)}>
            <FaEye
              className="text-blue-500 flex items-center justify-center"
              size={20}
            />
          </IconButton>
          <IconButton onClick={() => handleOpenUpdateDialog(patient)}>
            <FaPencil
              className="text-green-800 items-center justify-center flex"
              size={20}
            />
          </IconButton>

          <IconButton onClick={() => handleDeleteClick(patient)}>
            <FaTrash
              size={20}
              className="text-sm  text-red-500 flex items-center justify-center"
            />
          </IconButton>
        </td>
      </tr>
    );
  };


  return (
    <div className="p-4 bg-bgSoftLight rounded-2xl shadow-lg h-full">
      <div className="flex flex-col justify-center gap-8">
        <div className="flex justify-between items-center max-sm:flex-col">
          <h4 className="text-textLight text-xl max-md:w-full">
            Patient Risk Information
          </h4>
        </div>

        {/* Loading indicator or No Data */}
        {loading ? (
          <div className="text-textLight text-lg w-full flex items-center justify-center tracking-widest uppercase animate-pulse">
            Loading...
          </div>
        ) : patients.length === 0 ? (
          <h4 className="text-textLight text-lg w-full flex items-center justify-center tracking-widest uppercase animate-bounce">
            No Data Available!
          </h4>
        ) : (
          <div>
            <Table
              columns={PredictionCols}
              renderRow={renderRow}
              data={currentPageData}
            />
          </div>
        )}
      </div>
      <PatientDetails
        open={openDialog}
        onClose={handleCloseDialog}
        patient={selectedPatient}
      />

      {isDialogVisible && (
        <ConfirmDelete
          message="Are you sure you want to delete this patient record?"
          onClickDel={handleConfirmDelete} // Function to delete the record
          onClickCancel={handleCancelDelete} // Function to cancel the delete
        />
      )}
      {isUpdateDialogVisible && (
        <UpdatePatient
          onClickClose={handleCancelUpdate}
          patientData={patientToUpdate}
        />
      )}
    </div>
  );
};

export default PatientTableCard;
