import React from "react";
import { Task } from "@/src/state/api";
import Image from "next/image";
import { format } from "date-fns";
type Props = {
  task: Task;
};
function TaskCard({ task }: Props) {
  return (
    <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
      {task.attachments && task.attachments.length > 0 && (
        <div>
          <strong>Attachments:</strong>
          <div className="flex flex-wrap">
            {task.attachments && task.attachments.length > 0 && (
              <Image
                src={`/images/${task.attachments[0].fileURL}`}
                alt={task.attachments[0].fileName}
                width={400}
                height={200}
                className="rounded-md"
              />
            )}
          </div>
        </div>
      )}
      <p>
        <strong>Id:</strong>
        {task.id}
      </p>
      <p>
        <strong>Title:</strong>
        {task.title}
      </p>
      <p>
        <strong>Description</strong>
        {""}
        {task.description || "No description provided"}
      </p>
      <p>
        <strong>Status:</strong>
        {task.status}
      </p>
      <p>
        <strong>Priority:</strong>
        {task.priority}
      </p>
      <p>
        <strong>Tags:</strong>
        {task.tags || "No tags"}
      </p>
      <p>
        <strong>Start Date:</strong>{" "}
        {task.startDate ? format(new Date(task.startDate), "P") : "Not Set"}
      </p>
      <p>
        <strong>Due Date:</strong>{" "}
        {task.dueDate ? format(new Date(task.dueDate), "P") : "Not Set"}
      </p>
      <p>
        <strong>Author:</strong>
        {task.author ? task.author.username : "Unknown"}
      </p>
      <p>
        <strong>Assignee:</strong>
        {task.assignee ? task.assignee.username : "Unassigned"}
      </p>
    </div>
  );
}

export default TaskCard;
