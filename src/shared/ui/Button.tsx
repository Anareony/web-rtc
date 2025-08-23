import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  children: ReactNode;
}

export const Button = ({ children, isActive, ...props }: ButtonProps) => {
  return (
    <button
      className={`p-3 rounded-full hover:cursor-pointer ${
        isActive
          ? "bg-red-200 hover:bg-red-100"
          : "bg-gray-600 hover:bg-gray-500"
      }`}
      {...props}
    >
      {children}
    </button>
  );
};
