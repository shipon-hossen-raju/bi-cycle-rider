import React from "react";

type ButtonProps = {
  children: React.ReactNode; // Text or elements inside the button
  onClick?: () => void; // Optional click handler
  type?: "button" | "submit" | "reset"; // Button type
  variant?: "primary" | "secondary" | "outline"; // Button styles
  disabled?: boolean; // Disabled state
  className?: string; // Additional custom classes
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}) => {
  const baseStyle = `py-4 px-6 transition-all rounded`;

  const variants = {
    primary: `bg-brand text-white hover:bg-brand/50`,
    secondary: `bg-secondary text-brand hover:bg-secondary/50`,
    outline: `border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400`,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={` ${baseStyle} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <span className="px-[28px] py-[18px]"> {children} </span>
    </button>
  );
};

export default Button;
