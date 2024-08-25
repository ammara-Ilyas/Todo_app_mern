import { Router } from "express";
import {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todoControllers.js";

const router = Router();

router.post("/", createTodo);
router.get("/", getAllTodos);
router.delete("/:id", deleteTodo);
router.put("/:id", updateTodo);

export default router;
