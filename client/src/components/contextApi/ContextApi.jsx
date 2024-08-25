"use client";
import React, { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

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
      } catch (error) {
        console.error("Failed to add todo: ", error);
      }
    } else {
      console.log("Please fill in all fields.");
    }
  };

  const deleteTodo = async (id) => {
    try {
      console.log(id, "id");

      // Make the DELETE request
      const res = await axios.get(`/api/todos/${id}`);

      // Log the response data
      console.log("res", res.data);

      // Update the state to remove the deleted todo
      setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo: ", error);
    }
  };

  const editTodo = (id) => {
    const item = todoList.find((item) => item.id === id);
    if (item) {
      setTodo(item.todo);
      setIsEdit(true);
      setEditTodoId(id);
    }
  };

  const saveTodo = async () => {
    const index = todoList.findIndex((item) => item.id === editTodoId);
    if (index === -1) {
      console.log("not present");

      return;
    }

    const updatedTodo = {
      ...todoList[index],
      todo: todo,
    };

    const updatedTodoList = [...todoList];
    updatedTodoList[index] = updatedTodo;

    setTodoList(updatedTodoList);
    setTodoData(updatedTodoList);
    try {
      console.log("eidt", editTodoId);
      const response = await axios.put(
        `http://localhost:5000/api/todos/${editTodoId}`,
        updatedTodo
      );
      console.log(response.data);

      const updatedTodoFromResponse = response.data;

      let updatedTodos = [...todoList];
      updatedTodos[index] = updatedTodoFromResponse;

      setTodoList(updatedTodos);
      setTodoData(updatedTodos);
    } catch (error) {
      console.error("Failed to update todo: ", error);
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
    </TodoContext.Provider>
  );
};

export default TodoProvider;
