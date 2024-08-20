import React from "react";

const Button = ({ children, className, type }) => {
  return (
    <div>
      <button
        type={type}
        className={`${className}align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-l py-3 px-6 rounded-lg bg-gradient-to-tr from-[#12263A] to-[#193552] text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
