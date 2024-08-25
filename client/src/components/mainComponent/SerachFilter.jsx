"use client";
import React, { useContext } from "react";
import Button from "../widgets/Button";
import { TodoContext } from "../contextApi/ContextApi";

const SearchFilter = () => {
  const { isOpen, setIsOpen } = useContext(TodoContext);

  const handleFormOpen = () => {
    console.log("isopen", isOpen);
    setIsOpen(true);
  };

  return (
    <div className="h-[15%] md:h-1/4 flex items-center justify-between mx-2 sm:mx-10">
      <h2 className="text-3xl md:text-4xl border-b-2 lg:ml-20 border-b-white pb-1 text-white font-bold">
        Todo List
      </h2>
      <Button
        text="Add new Item"
        tailwindClasses="bg-white rounded-md"
        clickButton={handleFormOpen}
      />
    </div>
  );
};

export default SearchFilter;
