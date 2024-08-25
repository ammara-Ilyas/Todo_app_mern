import React from "react";

const Lists = ({ text, icon }) => {
  return (
    <div className="flex gap-4 items-center font-semibold">
      <span className="text-gray-400 text-xl hover:text-blue-500 z-50">
        {icon}
      </span>
      <span>{text}</span>
    </div>
  );
};

export default Lists;
