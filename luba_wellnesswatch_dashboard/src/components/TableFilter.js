import React from "react";
import { FaFilter } from "react-icons/fa";

const TableFilter = ({ value, options=["test"], onChange, label }) => {
  return (
    <div className="flex items-center gap-4 w-full px-6 bg-white shadow-sm min-h-[40px]  rounded-md outline-none border-none">
      <FaFilter size={20} />
      <select
        value={value || ""}  
        onChange={onChange}
        className="bg-transparent text-sm p-2 rounded border-none outline-none w-full text-gray-500"
      >
        <option className="text-bgColor" value="">{label || "Filter"}</option>  
        {options.map((option, index) => (
          <option key={index} value={option} className="text-bgColor text-xs" >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TableFilter;
