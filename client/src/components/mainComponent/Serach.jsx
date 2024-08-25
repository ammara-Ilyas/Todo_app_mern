import React, { useContext, useState } from "react";
import Button from "../widgets/Button";
import { TodoContext } from "../contextApi/ContextApi";

const Search = () => {
  const {
    addTodo,
    isOpen,
    setIsOpen,
    todo,
    todoDes,
    setTodo,
    setTodoDes,
    isEdit,
    setIsEdit,
    saveTodo,
  } = useContext(TodoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("todo", todo);
    console.log("destodo", todoDes);
    addTodo();
    setTodo("");
    setTodoDes("");
  };

  const handleSave = () => {
    saveTodo();
    setTodo("");
    setTodoDes("");
    setIsOpen(false);
    setIsEdit(false);
  };

  return (
    <div
      className={`h-full w-full bg-black absolute top-0 right-0 border-2 bg-opacity-40 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center h-full">
        <form
          className="h-[60%] w-[75%] lg:w-[60%] xl:w-1/2 mx-auto rounded-md gap-10 p-4 bg-white flex flex-col justify-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="border-2 outline-none p-2 placeholder:text-sm capitalize"
            placeholder={`${isEdit ? "Update Todo..." : "Write Todo..."}`}
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <textarea
            className="border-2 outline-none p-2 placeholder:text-sm"
            rows={5}
            placeholder={`${
              isEdit ? "Update description..." : "Write description...."
            }`}
            value={todoDes}
            onChange={(e) => setTodoDes(e.target.value)}
          ></textarea>
          {isEdit ? (
            <Button
              text="Save todo"
              tailwindClasses="bg-blue-500"
              clickButton={handleSave}
            />
          ) : (
            <Button
              text="Add new"
              tailwindClasses="bg-blue-500"
              clickButton={handleSubmit}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default Search;
