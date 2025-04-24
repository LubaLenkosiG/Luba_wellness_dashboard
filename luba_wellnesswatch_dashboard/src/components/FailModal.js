import React from "react";
import { BiError } from "react-icons/bi";

const FailedModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 p-4 flex justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
        <div className="my-8 text-center">
          <BiError className="text-red-500 text-4xl mx-auto" />

          <h4 className="text-xl text-gray-800 font-semibold mt-4">
            Error
          </h4>
          <p className="text-sm text-red-900 leading-relaxed mt-4 uppercase tracking-widest">
            {message}
          </p>
        </div>

        <button
          type="button"
          className="px-5 py-2.5 w-full rounded-lg text-white text-sm border-none outline-none bg-red-500 hover:bg-red-700"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default FailedModal;
