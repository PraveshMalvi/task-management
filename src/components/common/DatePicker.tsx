import React from "react";

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
}

const DatePickerValue: React.FC<DatePickerProps> = ({ label, value, onChange }) => {
  return (
    <div className="date-picker-container">
      <input
        type="date"
        className="date-picker-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
      />
    </div>
  );
};

export default DatePickerValue;
