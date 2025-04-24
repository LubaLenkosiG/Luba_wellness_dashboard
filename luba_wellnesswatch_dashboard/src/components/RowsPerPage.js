"use client";

import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const RowsPerPage = ({ itemsPerPage, setItemsPerPage }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value !== "") {
      const num = parseInt(value, 10);
      if (num >= 5 && num <= 30) {
        setItemsPerPage(num);
      }
    }
  };

  const increment = () => {
    setItemsPerPage((prev) => (prev < 30 ? prev + 1 : 30));
  };

  const decrement = () => {
    setItemsPerPage((prev) => (prev > 5 ? prev - 1 : 5));
  };

  return (
    <div className="flex items-center gap-4 w-full px-6 bg-white shadow-sm min-h-[40px] rounded-md outline-none border-none">
      <button
        onClick={decrement}
        className="text-gray-600 hover:bg-bgSoftLight  hover:text-white"
      >
        <FaMinus size={20} />
      </button>
      <input
        type="text"
        value={itemsPerPage}
        onChange={handleChange}
        placeholder="10"
        className="w-full text-sm bg-transparent rounded outline-none text-gray-500 text-center"
      />
      <button
        onClick={increment}
        className="text-gray-600 hover:bg-bgSoftLight  hover:text-white"
      >
        <FaPlus size={20} />
      </button>
    </div>
  );
};

export default RowsPerPage;
