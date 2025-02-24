import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "ghost";
  disabled?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}) => {
  const baseStyle = `py-4 px-6 transition-all rounded-lg`;

  const variants = {
    primary: `bg-brand text-white hover:bg-brand/50`,
    secondary: `bg-secondary text-brand hover:bg-secondary/50`,
    outline: `border border-brand text-brand hover:bg-brand/10 focus:ring-gray-400`,
    ghost: `border border-brand text-brand hover:bg-brand/10 focus:ring-gray-400`,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      <span className="px-[28px] py-[18px]"> {children} </span>
    </button>
  );
};

export default Button;
