import React from "react";

interface InputProps {
  type?: string;
  name: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errors: { [key: string]: string };
}

export default function Input({
  type = "text",
  name,
  value,
  handleChange,
  errors,
}: InputProps) {
  return (
    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
        Email
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.email && (
        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
      )}
    </div>
  );
}
