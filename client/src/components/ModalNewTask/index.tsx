import React, { useState } from "react";
import { Priority, Status, useCreateTaskMutation } from "@/src/state/api";
import Modal from "@/src/components/Modal";
import { formatISO } from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id?: string | null;
};

const ModalNewTask = ({ isOpen, onClose, id = null }: Props) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(Status.ToDo);
  const [priority, setPriority] = useState<Priority>(Priority.Backlog);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [authorUserId, setAuthorUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [projectId, setProjectId] = useState("");

  const handleSubmit = async () => {
    if (!title || !authorUserId || !(id !== null || projectId)) return;

    const formattedStartDate = startDate
      ? formatISO(new Date(startDate), { representation: "complete" })
      : undefined;
    const formattedDueDate = dueDate
      ? formatISO(new Date(dueDate), { representation: "complete" })
      : undefined;

    await createTask({
      title,
      description,
      status,
      priority,
      tags,
      startDate: formattedStartDate,
      dueDate: formattedDueDate,
      authorUserId: parseInt(authorUserId),
      assignedUserId: assignedUserId ? parseInt(assignedUserId) : undefined,
      projectId: id !== null ? Number(id) : Number(projectId),
    });

    // Reset form
    setTitle("");
    setDescription("");
    setStatus(Status.ToDo);
    setPriority(Priority.Backlog);
    setTags("");
    setStartDate("");
    setDueDate("");
    setAuthorUserId("");
    setAssignedUserId("");
    setProjectId("");
    onClose();
  };

  const isFormValid = () => {
    return title && authorUserId && (id !== null || projectId);
  };

  const inputStyles =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-stroke-dark dark:bg-dark-tertiary dark:text-white dark:placeholder-gray-500 transition-colors";

  const selectStyles =
    "block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-stroke-dark dark:bg-dark-tertiary dark:text-white transition-colors";

  const labelStyles =
    "block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
      <form
        className="mt-2 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <label className={labelStyles}>Title *</label>
          <input
            type="text"
            className={inputStyles}
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className={labelStyles}>Description</label>
          <textarea
            className={`${inputStyles} min-h-[80px] resize-none`}
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelStyles}>Status</label>
            <select
              className={selectStyles}
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
            >
              <option value={Status.ToDo}>To Do</option>
              <option value={Status.WorkInProgress}>Work In Progress</option>
              <option value={Status.UnderReview}>Under Review</option>
              <option value={Status.Completed}>Completed</option>
            </select>
          </div>
          <div>
            <label className={labelStyles}>Priority</label>
            <select
              className={selectStyles}
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              <option value={Priority.Urgent}>Urgent</option>
              <option value={Priority.High}>High</option>
              <option value={Priority.Medium}>Medium</option>
              <option value={Priority.Low}>Low</option>
              <option value={Priority.Backlog}>Backlog</option>
            </select>
          </div>
        </div>
        <div>
          <label className={labelStyles}>Tags</label>
          <input
            type="text"
            className={inputStyles}
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelStyles}>Start Date</label>
            <input
              type="date"
              className={inputStyles}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className={labelStyles}>Due Date</label>
            <input
              type="date"
              className={inputStyles}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelStyles}>Author User ID *</label>
            <input
              type="text"
              className={inputStyles}
              placeholder="e.g. 1"
              value={authorUserId}
              onChange={(e) => setAuthorUserId(e.target.value)}
            />
          </div>
          <div>
            <label className={labelStyles}>Assigned User ID</label>
            <input
              type="text"
              className={inputStyles}
              placeholder="e.g. 2"
              value={assignedUserId}
              onChange={(e) => setAssignedUserId(e.target.value)}
            />
          </div>
        </div>
        {id === null && (
          <div>
            <label className={labelStyles}>Project ID *</label>
            <input
              type="text"
              className={inputStyles}
              placeholder="e.g. 1"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            />
          </div>
        )}
        <button
          type="submit"
          className={`mt-2 flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;
