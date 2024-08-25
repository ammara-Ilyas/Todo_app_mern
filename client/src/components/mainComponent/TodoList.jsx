"use client";
import React, { useContext, useState } from "react";
import Checkbox from "../widgets/Checkbox";
import Button from "../widgets/Button";
import { TodoContext } from "../contextApi/ContextApi";
import { MdEditNote } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";

const TodoLists = () => {
  const [openTodoId, setOpenTodoId] = useState(null);
  const todoContext = useContext(TodoContext);

  if (!todoContext) {
    throw new Error("TodoLists must be used within a TodoContext.Provider");
  }

  const { todoList, deleteTodo, editTodo, setIsOpen, handleCheckbox } =
    todoContext;

  const handleDeleteTodo = (id) => {
    console.log("id in del", id);
    deleteTodo(id);
  };

  const handleEditTodo = (id) => {
    console.log(id);
    editTodo(id);
    setIsOpen(true);
  };

  const handleCheckboxChange = (id) => {
    console.log(id);
    handleCheckbox(id);
  };

  return (
    <div className="w-[100%] sm:w-[95%] md:w-[85%] lg:w-[70%] xl:w-[60%] mx-auto overflow-y-auto h-[70%] p-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-white scrollbar-corner-rounded-full scrollbar-corner-blue-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
      {todoList.map((item, i) => (
        <div key={i} className="flex flex-col w-full my-3">
          <div className="bg-white w-[100%] sm:w-[95%] flex items-center justify-between text-xl p-3 h-[45px] rounded-md">
            <div className="flex items-center justify-center gap-2">
              <Checkbox
                important={item.isImportant}
                onChangeHandler={() => handleCheckboxChange(item.id)}
              />
              <p className="text-xl">{item.todo}</p>
            </div>
            <div className="flex items-center justify-center gap-3 h-full text-white">
              <Button
                text={<MdEditNote className="hover:text-slate-200 text-sm" />}
                tailwindClasses="bg-blue-500 p-[4px] rounded-full"
                clickButton={() => handleEditTodo(item.id)}
              />
              <Button
                text={<MdDelete className="hover:text-slate-200 text-sm" />}
                tailwindClasses="bg-blue-500 p-[4px] rounded-full"
                clickButton={() => handleDeleteTodo(item.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoLists;
