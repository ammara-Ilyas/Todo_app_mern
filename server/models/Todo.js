import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  todo: { type: String, required: true },
  description: { type: String },
  isImportant: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
