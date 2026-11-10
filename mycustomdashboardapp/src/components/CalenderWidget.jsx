
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarWidget() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="widget-card calendar-widget">
      <h3>Calendar</h3>

      <Calendar
        onChange={setDate}
        value={date}
      />

      <p>
        Selected Date: {date.toLocaleDateString()}
      </p>
    </div>
  );
}
