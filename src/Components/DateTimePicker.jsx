// DateTimePicker.js
import React, { useState } from 'react';
import './DateTimePicker.css';

const DateTimePicker = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="datetime-picker">
      <label htmlFor="dueDate"></label>
      <input
        type="datetime-local"
        id="dueDate"
        name="dueDate"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DateTimePicker;
