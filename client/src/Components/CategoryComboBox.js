import React from "react";

const CategoryComboBox = ({ value, onChange }) => {
  const categories = [
    "breakfast",
    "fruits",
    "dryfood",
    "detergent",
    "cosmetics",
  ];

  return (
    <select
      className="form-control mb-2"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select Category</option>
      {categories.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
};

export default CategoryComboBox;
