import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  todo: { type: String, required: true },
  isImportant: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
