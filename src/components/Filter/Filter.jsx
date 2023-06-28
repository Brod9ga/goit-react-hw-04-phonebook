import React from "react";

const Filter = ({ filter, onChange }) => {
  return (
    <input
      type="text"
      value={filter}
      onChange={onChange}
      placeholder="Search contacts"
    />
  );
};

export default Filter;
