// src/components/FirmSelector.jsx
import React from "react";

export default function FirmSelector({ firmNames, onSelect }) {
  // firmNames: array of strings (the keys in the JSON)
  // onSelect: function to call when user picks a firm

  return (
    <div className="mb-4">
      <label htmlFor="firm-selector" className="block text-sm font-medium text-gray-700">
        Choisir une entreprise
      </label>
      <select
        id="firm-selector"
        className="mt-1 block w-60 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
        onChange={(e) => onSelect(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>
          -- Choose a firm --
        </option>
        {firmNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}