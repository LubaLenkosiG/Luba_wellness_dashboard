"use client";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CirclerUserCard = ({ title, percentage = 66 }) => {
  return (
    <div className="h-full w-full shadow-md rounded-2xl hover:scale-105 duration-200 bg-[#2d416c]/90 p-4 flex flex-col items-center justify-between">
      <label className="text-white text-sm mb-2">{title}</label>
      
      {/* Wrap CircularProgressbar in a div to control size */}
      <div className="w-[65%] h-full">  
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            rotation: 0.25,
            strokeLinecap: "butt",
            textSize: "8px",  // Reduce text size
            pathTransitionDuration: 0.5,
            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
            textColor: "#f88",
            trailColor: "#d6d6d6",
            backgroundColor: "#3e98c7",
          })}
        />
      </div>
    </div>
  );
};

export default CirclerUserCard;
