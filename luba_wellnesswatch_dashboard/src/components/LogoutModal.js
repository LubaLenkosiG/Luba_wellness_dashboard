"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { GiButterflyWarning } from "react-icons/gi";

const LogoutModal = ({ isOpen, onClose }) => {
  const router = useRouter();

  // Prevent background scrolling when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, [isOpen]);

  if (!isOpen) return null; // Don't render if modal is closed

  const handleLogout = () => {
    router.push("/"); // Navigate to home page
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[50]">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose} // Clicking outside closes the modal
      ></div>

      {/* Modal content */}
      <div className="relative bg-white shadow-lg rounded-lg p-6 max-w-lg w-full z-[100]">
        

        <div className="text-center">
          <div className="flex justify-center">
            <GiButterflyWarning size={70} className="text-yellow-500" />
          </div>
          <h4 className="text-gray-800 text-lg font-semibold mt-4">
            Are you sure you want to Log Out?
          </h4>

          <div className="flex justify-center gap-4 mt-6">
            <button
              className="px-4 py-2 rounded-lg text-gray-800 bg-gray-200 hover:bg-gray-300"
              onClick={onClose}
            >
              No
            </button>
            <button
              className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
              onClick={handleLogout}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
