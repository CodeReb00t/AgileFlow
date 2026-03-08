import { Router } from "express";
import {
  createTask,
  getTasks,
  getUserTasks,
  updateTaskStatus,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:taskId/status", updateTaskStatus);
router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);
router.get("/user/:userId", getUserTasks);
export default router;
