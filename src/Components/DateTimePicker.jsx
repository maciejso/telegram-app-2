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
      <label htmlFor="expiryDate">Expiry Date</label>
      <input
        type="datetime-local"
        id="expirtyDate"
        name="expirtyDate"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DateTimePicker;
