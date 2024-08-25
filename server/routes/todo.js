import { Router } from "express";
import {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todoControllers.js";

const router = Router();
console.log("route");

router.post("/", createTodo);
router.get("/", getAllTodos);
router.get("/:id", deleteTodo);
router.put("/:id", updateTodo);

export default router;
