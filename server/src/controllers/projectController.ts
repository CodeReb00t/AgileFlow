import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProjects = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving projects: ${error.message}` });
  }
};

export const createProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name, description, startDate, endDate } = req.body;
  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate,
      },
    });
    res.status(201).json(newProject);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating a project: ${error.message}` });
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { projectId } = req.params;
  const { name, description, startDate, endDate } = req.body;
  try {
    const updatedProject = await prisma.project.update({
      where: { id: Number(projectId) },
      data: { name, description, startDate, endDate },
    });
    res.json(updatedProject);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating project: ${error.message}` });
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { projectId } = req.params;
  try {
    // Delete related records first
    const tasks = await prisma.task.findMany({
      where: { projectId: Number(projectId) },
    });
    for (const task of tasks) {
      await prisma.taskAssignment.deleteMany({ where: { taskId: task.id } });
      await prisma.attachment.deleteMany({ where: { taskId: task.id } });
      await prisma.comment.deleteMany({ where: { taskId: task.id } });
    }
    await prisma.task.deleteMany({ where: { projectId: Number(projectId) } });
    await prisma.projectTeam.deleteMany({
      where: { projectId: Number(projectId) },
    });
    await prisma.project.delete({ where: { id: Number(projectId) } });
    res.json({ message: "Project deleted successfully" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error deleting project: ${error.message}` });
  }
};
