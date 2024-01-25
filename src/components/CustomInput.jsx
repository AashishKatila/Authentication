import React from "react";

const CustomInput = ({ label, type, id, name, value, onChange, error,required }) => {
  return (
    <div className="grid grid-cols-2 mb-4">
        <label htmlFor={id} className="text-xl pl-4 mb-1">
          {label}: 
        </label>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          name={name}
          required={required}
          className="text-black px-2 rounded-md"
        />
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default CustomInput;
