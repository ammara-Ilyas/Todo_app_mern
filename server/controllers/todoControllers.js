import Todo from "../models/Todo.js";

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

    const updatedTodo = await Todo.updateOne(
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
    console.log(req.body);

    console.log("id", req.params.id);
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).json("deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};
