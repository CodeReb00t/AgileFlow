import React from "react";
import { Task } from "@/src/state/api";
import Image from "next/image";
import { format } from "date-fns";
import { Calendar, Flag, Tag, User } from "lucide-react";

type Props = {
  task: Task;
};

const priorityColors: Record<string, string> = {
  Urgent: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
  High: "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400",
  Medium:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400",
  Low: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
  Backlog: "bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400",
};

const statusColors: Record<string, string> = {
  "To Do":
    "bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400",
  "Work In Progress":
    "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
  "Under Review":
    "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
  Completed:
    "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
};

function TaskCard({ task }: Props) {
  return (
    <div className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200 dark:border-stroke-dark dark:bg-dark-secondary animate-fade-in">
      {task.attachments && task.attachments.length > 0 && (
        <div className="mb-3 -mx-4 -mt-4">
          <Image
            src={`/images/${task.attachments[0].fileURL}`}
            alt={task.attachments[0].fileName}
            width={400}
            height={200}
            className="w-full rounded-t-xl object-cover"
          />
        </div>
      )}

      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
          {task.title}
        </h3>
        <span className="text-xs text-gray-400 whitespace-nowrap">
          #{task.id}
        </span>
      </div>

      {task.description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex flex-wrap gap-1.5 mb-3">
        {task.status && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[task.status] || "bg-gray-100 text-gray-600"}`}
          >
            {task.status}
          </span>
        )}
        {task.priority && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${priorityColors[task.priority] || "bg-gray-100 text-gray-600"}`}
          >
            <Flag className="h-3 w-3" />
            {task.priority}
          </span>
        )}
        {task.tags &&
          task.tags.split(",").map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400"
            >
              <Tag className="h-3 w-3" />
              {tag.trim()}
            </span>
          ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-stroke-dark">
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          {task.startDate && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {format(new Date(task.startDate), "MMM d")}
            </span>
          )}
          {task.dueDate && (
            <span className="flex items-center gap-1">
              → {format(new Date(task.dueDate), "MMM d")}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {task.assignee && (
            <div className="flex items-center gap-1.5">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-[10px] font-bold">
                {task.assignee.username?.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
          {task.author && task.author.userId !== task.assignee?.userId && (
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold -ml-1.5 ring-2 ring-white dark:ring-dark-secondary">
              {task.author.username?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
