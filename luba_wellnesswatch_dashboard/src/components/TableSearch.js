import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const TableSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value); // Pass the query to the parent component
  };

  return (
    <div className="flex items-center gap-4 w-full px-6 bg-white shadow-sm min-h-[40px]  rounded-md outline-none border-none">
      <FaSearch size={20} />
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="w-full text-sm bg-transparent rounded outline-none text-gray-500"
      />
    </div>
  );
};

export default TableSearch;
