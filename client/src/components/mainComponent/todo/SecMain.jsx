"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { HiBars3 } from "react-icons/hi2";

const SecMain = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenNav = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-[95%] sm:w-[85%] md:w-[95%] lg:w-[85%] relative flex justify-center h-full mx-auto sm:mr-16 sm:ml-auto overflow-hidden bg-gradient-to-t from-indigo-400 to-blue-500">
      <div
        className="text-2xl absolute top-1 md:hidden block left-3 z-50 items-center"
        onClick={handleOpenNav}
      >
        <HiBars3 className="text-4xl text-white md:hidden block" />
      </div>
      <div className="w-[150px] h-[150px] rounded-full z-0 bg-yellow-400 absolute bottom-[40%] -right-16"></div>
      <div className="w-[200px] h-[200px] z-40 bg-red-300 rounded-full absolute -bottom-14 -left-32"></div>
      <div className="w-[100px] h-[100px] z-30 bg-cyan-400 rounded-full absolute top-0 left-56 lg:left-64 md:block hidden"></div>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default SecMain;
