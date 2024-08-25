import Todo from "../models/Todo.js";

export const createTodo = async (req, res) => {
  try {
    const { todo, todoDes, isImportant, id } = req.body;
    // if (!todo || isImportant === undefined || !id) {
    //   return res.status(400).json({ message: "Missing required fields" });
    // }
    // const existingTodo = await Todo.findOne({ id: id });
    // if (existingTodo) {
    //   return res.status(409).send("A todo with the given ID already exists.");
    // }
    console.log("user created 1");
    const newTodo = new Todo({
      id,
      todo,
      description: todoDes,
      isImportant,
    });
    console.log("new", newTodo);

    console.log("user created 2");
    const addTodo = await newTodo.save();
    res.status(201).send(newTodo);
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

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTodo) return res.status(404).send();
    console.log("update", updateTodo);

    res.status(200).send(updatedTodo);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    console.log(req.params.id);

    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).json("deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};
