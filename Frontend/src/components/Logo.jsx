import React from "react";

const Logo = ({ width, height }) => {
  return (
    <div className={`${width} ${height}`}>
      <img src="/Logo.png" alt="logo" />
    </div>
  );
};

export default Logo;
