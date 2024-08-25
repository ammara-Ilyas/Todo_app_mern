import React from "react";
import Image from "next/image";
import logo from "@/public/images/logo.png";

const Header = () => {
  return (
    <nav className="bg-blue-600 text-white flex justify-between items-center py-2 mb-2 px-28 pr-56">
      <Image src={logo} alt="logo" className="w-[60px] h-[40px]" />
      <div className="text-xl">
        <p className="cursor-pointer hover:text-red-100">Home</p>
      </div>
    </nav>
  );
};

export default Header;
