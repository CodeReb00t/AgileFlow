import { useGetTasksQuery, useUpdateTaskStatusMutation, useDeleteTaskMutation } from "@/src/state/api";
import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Task as TaskType } from "@/src/state/api";
import { MessageSquareMore, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

type BoardProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

const BoardView = ({ id, setIsModalNewTaskOpen }: BoardProps) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  const handleDeleteTask = (taskId: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(taskId);
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center py-20 text-red-500">
        An error occurred while fetching tasks
      </div>
    );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks || []}
            moveTask={moveTask}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
    </DndProvider>
  );
};

type TaskColumnProps = {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
  onDeleteTask: (taskId: number) => void;
};

const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen,
  onDeleteTask,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const tasksCount = tasks.filter((task) => task.status === status).length;

  const statusColor: Record<string, string> = {
    "To Do": "#3b82f6",
    "Work In Progress": "#10b981",
    "Under Review": "#f59e0b",
    Completed: "#8b5cf6",
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`rounded-xl py-3 px-1 transition-colors duration-200 ${
        isOver ? "bg-blue-50 dark:bg-blue-500/5" : ""
      }`}
    >
      <div className="mb-3 flex w-full">
        <div
          className="w-1.5 rounded-l-lg"
          style={{ backgroundColor: statusColor[status] }}
        />
        <div className="flex w-full items-center justify-between rounded-r-lg border border-l-0 border-gray-200 bg-white px-4 py-3 dark:border-stroke-dark dark:bg-dark-secondary">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
            {status}
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-100 px-1.5 text-xs font-medium text-gray-600 dark:bg-dark-tertiary dark:text-gray-400">
              {tasksCount}
            </span>
          </h3>
          <button
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-dark-tertiary dark:text-gray-400 dark:hover:bg-stroke-dark transition-colors"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <Task key={task.id} task={task} onDelete={onDeleteTask} />
          ))}
      </div>
    </div>
  );
};

type TaskProps = {
  task: TaskType;
  onDelete: (taskId: number) => void;
};

const Task = ({ task, onDelete }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const taskTagsSplit = task.tags ? task.tags.split(",") : [];

  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "MMM d")
    : "";
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "MMM d")
    : "";

  const numberOfComments = (task.comments && task.comments.length) || 0;

  const PriorityTag = ({ priority }: { priority: TaskType["priority"] }) => (
    <div
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
        priority === "Urgent"
          ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
          : priority === "High"
            ? "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400"
            : priority === "Medium"
              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400"
              : priority === "Low"
                ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
                : "bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400"
      }`}
    >
      {priority}
    </div>
  );

  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 dark:border-stroke-dark dark:bg-dark-secondary cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-50 rotate-2 scale-105" : "opacity-100"
      }`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`/images/${task.attachments[0].fileURL}`}
          alt={task.attachments[0].fileName}
          width={400}
          height={200}
          className="h-auto w-full rounded-t-xl object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-1.5">
            {task.priority && <PriorityTag priority={task.priority} />}
            {taskTagsSplit.map((tag) => (
              <div
                key={tag}
                className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400"
              >
                {tag.trim()}
              </div>
            ))}
          </div>
          <button
            className="flex h-6 w-6 items-center justify-center rounded text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
            onClick={() => onDelete(task.id)}
            title="Delete task"
          >
            <Trash2 size={14} />
          </button>
        </div>

        <div className="my-2.5 flex justify-between items-start">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
            {task.title}
          </h4>
          {typeof task.points === "number" && (
            <div className="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-dark-tertiary px-1.5 py-0.5 rounded ml-2 whitespace-nowrap">
              {task.points} pts
            </div>
          )}
        </div>

        {task.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
            {task.description}
          </p>
        )}

        <div className="text-xs text-gray-400 dark:text-gray-500">
          {formattedStartDate && <span>{formattedStartDate}</span>}
          {formattedStartDate && formattedDueDate && <span> &rarr; </span>}
          {formattedDueDate && <span>{formattedDueDate}</span>}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-stroke-dark" />

        <div className="flex items-center justify-between">
          <div className="flex -space-x-1.5 overflow-hidden">
            {task.assignee && (
              <Image
                key={task.assignee.userId}
                src={`/images/${task.assignee.profilePictureUrl!}`}
                alt={task.assignee.username}
                width={30}
                height={30}
                className="h-7 w-7 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
              />
            )}
            {task.author && (
              <Image
                key={task.author.userId}
                src={`/images/${task.author.profilePictureUrl!}`}
                alt={task.author.username}
                width={30}
                height={30}
                className="h-7 w-7 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
              />
            )}
          </div>
          <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
            <MessageSquareMore size={16} />
            <span className="text-xs">{numberOfComments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
