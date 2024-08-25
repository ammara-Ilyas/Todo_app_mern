"use client";
import React, { useContext, useState } from "react";
import { TodoContext } from "../contextApi/ContextApi";

const Button = () => {
  const todoContext = useContext(TodoContext);
  const [activeItem, setActiveItem] = useState("all");

  if (!todoContext) {
    throw new Error("TodoLists must be used within a TodoContext.Provider");
  }

  const { setTodoList, todoList } = todoContext;

  // const handleAll = () => {
  //   setTodoList(todoList);
  //   setActiveItem("all");
  // };

  // const handleImportant = () => {
  //   const importantTodos = todoList.filter(
  //     (item) => item.isImportant !== false
  //   );
  //   console.log(importantTodos);
  //   setTodoList(importantTodos);
  //   setActiveItem("important");
  // };

  // const handleOther = () => {
  //   const otherTodos = todoList.filter((item) => item.isImportant === false);
  //   console.log(otherTodos);
  //   setTodoList(otherTodos);
  //   setActiveItem("other");
  // };

  const getItemClasses = (item) =>
    `w-[12px] h-[12px] rounded-full ${
      activeItem === item ? "bg-blue-700" : "bg-blue-400"
    } hover:bg-blue-500 active:bg-blue-500`;

  return (
    <div>
      <ul className="w-[75%] ml-auto flex flex-col gap-2">
        <li
          className="flex items-center gap-2 cursor-pointer"
          // onClick={handleAll}
        >
          <span className={getItemClasses("all")}></span>
          All Tasks
        </li>
        <li
          className="flex items-center gap-2 cursor-pointer"
          // onClick={handleImportant}
        >
          <span className={getItemClasses("important")}></span>
          Important
        </li>
        <li
          className="flex items-center gap-2 cursor-pointer"
          // onClick={handleOther}
        >
          <span className={getItemClasses("other")}></span>
          Other
        </li>
      </ul>
    </div>
  );
};

export default Button;
