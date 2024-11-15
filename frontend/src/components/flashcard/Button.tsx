import React from "react";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ text, onClick, style, className }) => {
  return (
    <button
      type="button"
      className={`${className} text-white mt-4 bg-primary hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-1/5 p-3`}
      onClick={onClick}
      style={style}
    >
      {text}
    </button>
  );
};

export default Button;
