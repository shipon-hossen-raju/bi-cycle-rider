import React from "react";

interface InputProps {
  type?: string;
  name: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  errors: { [key: string]: string };
}

export default function Input({
  type = "text",
  name,
  value,
  handleChange,
  label,
  errors,
}: InputProps) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors[name] && (
        <p className="text-red-500 text-base mt-1">{errors[name]}</p>
      )}
    </div>
  );
}
