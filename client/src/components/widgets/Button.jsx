import React from "react";

const Button = ({ text, tailwindClasses = "bg-blue-500", clickButton }) => {
  return (
    <button className={`${tailwindClasses} p-2`} onClick={clickButton}>
      {text}
    </button>
  );
};

export default Button;
