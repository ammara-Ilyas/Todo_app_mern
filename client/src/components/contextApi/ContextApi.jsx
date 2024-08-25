"use client";
import React, { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [todoData, setTodoData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editTodoId, setEditTodoId] = useState(0);

  useEffect(() => {
    fetchAllTodos();
  }, []);

  const fetchAllTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/todos");
      setTodoList(response.data);
      setTodoData(response.data);
    } catch (error) {
      console.error("Failed to fetch todos: ", error);
    }
  };

  const addTodo = async () => {
    if (todo.trim() !== "") {
      try {
        const newTodo = {
          id: Math.random() * 100000,
          todo: todo,
          isImportant: false,
        };
        console.log(typeof newTodo.id);

        await fetch("http://localhost:5000/api/todos/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTodo),
        });
        setTodo("");
        setTodoList((preTodos) => [...preTodos, newTodo]);
        setTodoData((preTodos) => [...preTodos, newTodo]);
        setIsOpen(false);
        // toast.success("Todo added successfully");
      } catch (error) {
        console.error("Failed to add todo: ", error);
        // toast.error("Error adding todo: " + error);
      }
    } else {
      toast.warn("Please fill in all fields.");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo: ", error);
      // toast.error("Error deleting todo: " + error);
    }
  };

  const editTodo = (id) => {
    const item = todoList.find((item) => item.id === id);
    if (item) {
      setTodo(item.todo);
      setTodoDes(item.todoDes);
      setIsEdit(true);
      setEditTodoId(id);
    }
  };

  const saveTodo = async () => {
    const index = todoList.findIndex((item) => item.id === editTodoId);
    if (index === -1) {
      toast.error("Todo not found");
      return;
    }

    const updatedTodo = {
      ...todoList[index],
      todo: todo,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/todos/${editTodoId}`,
        updatedTodo
      );
      const updatedTodoFromResponse = response.data;

      let updatedTodos = [...todoList];
      updatedTodos[index] = updatedTodoFromResponse;

      setTodoList(updatedTodos);
      setTodoData(updatedTodos);

      toast.success("Todo updated successfully");
    } catch (error) {
      console.error("Failed to update todo: ", error);
      toast.error("Error updating todo: " + error);
    }
  };

  const handleCheckbox = (id) => {
    const index = todoList.findIndex((item) => item.id === id);
    const updatedTodoList = [...todoList];
    updatedTodoList[index] = {
      ...updatedTodoList[index],
      isImportant: !updatedTodoList[index].isImportant,
    };

    setTodoList(updatedTodoList);
    setTodoData(updatedTodoList);
  };

  return (
    <TodoContext.Provider
      value={{
        todoList,
        setTodoList,
        addTodo,
        isOpen,
        setIsOpen,
        deleteTodo,
        editTodo,
        todo,
        setTodo,
        isEdit,
        setIsEdit,
        saveTodo,
        handleCheckbox,
      }}
    >
      {children}
      <ToastContainer theme="light" position="top-center" />
    </TodoContext.Provider>
  );
};

export default TodoProvider;
