import { type InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = ({ label, ...props }: CheckboxProps) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer relative">
      <input
        type="checkbox"
        {...props}
        className="
          w-[18px] h-[18px] 
          appearance-none 
          border-2 border-gray-300 
          rounded 
          checked:bg-[#4ade80] 
          checked:border-[#4ade80]
          focus:outline-none 
          transition-colors 
          duration-200
          cursor-pointer
        "
      />
      {props.checked && (
        <div
          className="
            absolute 
            left-0 
            w-[18px] h-[18px] 
            flex items-center justify-center
            pointer-events-none
          "
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      )}
      {label && (
        <span
          className={`font-bold hover:text-cyan-500 ${
            props.checked && "line-through text-gray-400 hover:text-cyan-600"
          } `}
        >
          {label}
        </span>
      )}
    </label>
  );
};
