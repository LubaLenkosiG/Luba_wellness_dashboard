import React from "react";

const UserCard = ({ type, icon, value, description, height, width="100%" }) => {
  return (
    <div
      className="bg-white shadow-md rounded-2xl flex items-center p-4 odd:bg-[#2d416c]/90 even:bg-textLight even:text-bgColor odd:text-textLight hover:scale-105 duration-200"
      style={{ height, width }}
    >
      <div className="text-3xl  mr-4">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm capitalize">{type}</p>
        <p className="text-lg font-bold">{value}</p>
        <p className="text-gray-400 text-xs">{description}</p>
      </div>
    </div>
  );
};

export default UserCard;
