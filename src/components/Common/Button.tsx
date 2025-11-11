import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  ...rest
}) => {
  const base =
    "px-4 py-2 rounded-md font-semibold transition outline-none focus:ring";
  const styles =
    variant === "primary"
      ? " bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300"
      : " bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-300";

  return (
    <button className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
