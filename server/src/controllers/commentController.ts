import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getComments = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { taskId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: { taskId: Number(taskId) },
      include: { user: true },
      orderBy: { id: "desc" },
    });
    res.json(comments);
  } catch (e: any) {
    res
      .status(500)
      .json({ message: `Error retrieving comments: ${e.message}` });
  }
};

export const createComment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { text, taskId, userId } = req.body;
  try {
    const newComment = await prisma.comment.create({
      data: { text, taskId, userId },
      include: { user: true },
    });
    res.status(201).json(newComment);
  } catch (e: any) {
    res.status(500).json({ message: `Error creating comment: ${e.message}` });
  }
};
