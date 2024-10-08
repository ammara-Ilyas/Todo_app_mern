import Todo from "../models/Todo.js";
import mongoose from "mongoose";
export const createTodo = async (req, res) => {
  try {
    const { todo, isImportant, id } = req.body;
    // console.log("user created 1");
    const newTodo = new Todo({
      id: id,
      todo,
      isImportant,
    });
    console.log("new", newTodo);
    // console.log("user created 2");
    const addTodo = await newTodo.save();
    res.status(201).send(addTodo);
    console.log("user created 3");
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    console.log("Alll todos");

    res.status(200).send(todos);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateTodo = async (req, res) => {
  try {
    console.log("use", req.params.id, req.body);

    const updatedTodo = await Todo.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) return res.status(404).send("todo not found");

    console.log("update", updatedTodo);

    res.status(200).send(updatedTodo);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    if (!id) {
      return res.status(400).json({ message: "ID parameter is required" });
    }

    // console.log("delete 1");
    const findDelete = await Todo.findOne({ id });
    if (!findDelete) {
      return res.status(404).json({ message: "Todo not found" });
    }
    // console.log("delete 2");
    const deletedTodo = await Todo.findOneAndDelete({ id });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    console.log("delete 3");

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Failed to delete todo:", error);
    res.status(500).json({ message: "Server error" });
  }
};
