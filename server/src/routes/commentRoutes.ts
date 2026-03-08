import { Router } from "express";
import { getComments, createComment } from "../controllers/commentController";

const router = Router();

router.get("/:taskId", getComments);
router.post("/", createComment);

export default router;
