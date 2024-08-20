import React from "react";
import { forwardRef } from "react";

const Input = ({ label, name, id, type, className, ...props }, ref) => {
  return (
    <div className="w-full space-y-1 md:w-3/3">
      {label && (
        <label
          className={`${className} font-bold text-lg text-[#12263A] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        className={`${className} flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
        type={type}
        id={id}
        
        name={name}
        {...props}
        ref={ref}
      ></input>
    </div>
  );
};

export default forwardRef(Input);
