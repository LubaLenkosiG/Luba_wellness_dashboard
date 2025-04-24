import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { FaPrint } from "react-icons/fa";

const PatientDetails = ({ open, onClose, patient }) => {
  if (!patient) return null; // Prevent rendering if no patient data is passed

  const handlePrint = () => {
    window.print(); // Trigger the browser print dialog
  };

  // Function to determine the risk level and corresponding color
  const getRiskLevel = (riskType) => {
    switch (riskType) {
      case "Low":
        return { value: 30, color: "success" }; // Green for low risk
      case "Moderate":
        return { value: 60, color: "warning" }; // Yellow for moderate risk
      case "High":
        return { value: 90, color: "error" }; // Red for high risk
      default:
        return { value: 0, color: "grey" }; // Default color
    }
  };

  const { value, color } = getRiskLevel(patient.riskType);

  const handleDialogClose = (event, reason) => {
    if (reason === "backdropClick") {
      event.stopPropagation(); // Prevent backdrop click from closing the dialog
      return;
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} fullWidth maxWidth="xs" sx={{ height: '90%' }}>
      <DialogTitle className="flex items-center justify-between">
        Patient Details 
        <IconButton edge="end" color="inherit" onClick={handlePrint}>
          <FaPrint />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ maxHeight: '80%', overflow: 'auto' }}>
        <div className="flex flex-col gap-2 text-sm">
          {Object.keys(patient).map((key) => {
            if (key === 'riskType') {
              // If it's the riskType, display with a progress bar
              return (
                <div key={key}>
                  <p><strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {patient[key]}</p>
                  <LinearProgress
                    variant="determinate"
                    value={value}
                    color={color}
                    sx={{ marginTop: 0, height: "10px", borderRadius: "10px" }}
                  />
                </div>
              );
            } else {
              return (
                <p key={key}>
                  <strong>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</strong> {patient[key]}
                </p>
              );
            }
          })}
        </div>
      </DialogContent>

      <DialogActions sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={onClose}
          color="primary"
          fullWidth
          sx={{ borderRadius: "10px", backgroundColor: "#00008b", maxWidth: "200px" }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientDetails;
