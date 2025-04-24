"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 

const WellnessWatchCalendar = () => {
  const [date, setDate] = useState(new Date()); // Default to the current date

  const handleDateChange = (newDate) => {
    setDate(newDate);
    // Add logic to track or display health-related events for the selected date
  };

  return (
    <div className="w-full h-full bg-textLight rounded-xl p-4">
      <h4 className="text-bgColor">Health Tracking Calendar</h4>
      <Calendar
        className="text-bgColor w-full border-none font-sans"
        onChange={handleDateChange}
        value={date}
      />
    </div>
  );
};

export default WellnessWatchCalendar;
