import React, { useState } from "react";
import Aside from "./Aside";
import avatar from "../../assets/images/avatar.png";
import { SiTodoist } from "react-icons/si";
import { IoSettingsSharp } from "react-icons/io5";
import { GrSchedulePlay } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import Button from "../widgets/Task";
import Lists from "../widgets/List";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const handleCloseNav = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-[95%] mr-4 md:mr-0 relative sm:w-[93%] h-[90%] mt-10 lg:mr-10 rounded-2xl bg-white flex items-center mx-auto">
      {isOpen ? (
        <div className="block md:hidden duration-700 bg-opacity-100 w-[70%] sm:w-[50%] absolute left-0 top-0 h-screen z-50 bg-white">
          <div className="flex justify-end mx-3 mt-3">
            <RxCross2 className="text-2xl" onClick={handleCloseNav} />
          </div>
          <div className="flex gap-10 h-full w-full mt-10 flex-col">
            <div className="border-b-purple-500 border-b-[3px] w-[90%] xl:w-[80%] h-[20%] mx-auto flex justify-center gap-3 items-center">
              <img
                src={avatar}
                alt="Avatar"
                className="w-[60px] h-[60px] rounded-full"
              />
              <div>
                <p className="font-bold">Do-it</p>
                <p className="text-purple-600">Ammara Ilyas</p>
              </div>
            </div>
            <div>
              <ul className="w-[85%] mx-auto flex flex-col gap-3">
                <li>
                  <Lists text="Today Tasks" icon={<SiTodoist />} />
                </li>
                <li>
                  <Button />
                </li>
                <li>
                  <Lists text="Schedule Tasks" icon={<GrSchedulePlay />} />
                </li>
                <li>
                  <Lists text="Setting" icon={<IoSettingsSharp />} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : null}
      <div className="w-[32%] xl:w-[25%] h-full hidden md:block">
        <div className="flex gap-10 h-full w-full mt-10 flex-col">
          <div className="border-b-purple-500 border-b-[3px] w-[90%] xl:w-[80%] h-[20%] mx-auto flex justify-center gap-3 items-center">
            <img
              src={avatar}
              alt="Avatar"
              className="w-[60px] h-[60px] rounded-full"
            />
            <div>
              <p className="font-bold">Do-it</p>
              <p className="text-purple-600">Ammara Ilyas</p>
            </div>
          </div>
          <div>
            <ul className="w-[85%] mx-auto flex flex-col gap-3">
              <li>
                <Lists text="Today Tasks" icon={<SiTodoist />} />
              </li>
              <li>
                <Button />
              </li>
              <li>
                <Lists text="Schedule Tasks" icon={<GrSchedulePlay />} />
              </li>
              <li>
                <Lists text="Setting" icon={<IoSettingsSharp />} />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Aside />
    </div>
  );
};

export default Sidebar;
