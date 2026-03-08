import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.query;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId),
      },
      include: {
        author: true,
        assignee: true,
        comments: true,
        attachments: true,
      },
    });
    res.json(tasks);
  } catch (e: any) {
    res.status(500).json({ message: `Error retrieving tasks: ${e.message}` });
  }
};

export const createTask = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    points,
    projectId,
    authorUserId,
    assignedUserId,
  } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId,
      },
    });
    res.status(201).json(newTask);
  } catch (e: any) {
    res.status(500).json({ message: `Error creating task: ${e.message}` });
  }
};

export const updateTaskStatus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { taskId } = req.params;
  const { status } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: Number(taskId),
      },
      data: {
        status: status,
      },
    });
    res.json(updatedTask);
  } catch (e: any) {
    res.status(500).json({ message: `Error updating task: ${e.message}` });
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { taskId } = req.params;
  const {
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    points,
    assignedUserId,
  } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(taskId) },
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        assignedUserId,
      },
    });
    res.json(updatedTask);
  } catch (e: any) {
    res.status(500).json({ message: `Error updating task: ${e.message}` });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { taskId } = req.params;
  try {
    await prisma.taskAssignment.deleteMany({
      where: { taskId: Number(taskId) },
    });
    await prisma.attachment.deleteMany({ where: { taskId: Number(taskId) } });
    await prisma.comment.deleteMany({ where: { taskId: Number(taskId) } });
    await prisma.task.delete({ where: { id: Number(taskId) } });
    res.json({ message: "Task deleted successfully" });
  } catch (e: any) {
    res.status(500).json({ message: `Error deleting task: ${e.message}` });
  }
};

export const getUserTasks = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { userId } = req.params;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { authorUserId: Number(userId) },
          { assignedUserId: Number(userId) },
        ],
      },
      include: {
        author: true,
        assignee: true,
      },
    });
    res.json(tasks);
  } catch (e: any) {
    res
      .status(500)
      .json({ message: `Error retrieving user's tasks: ${e.message}` });
  }
};
