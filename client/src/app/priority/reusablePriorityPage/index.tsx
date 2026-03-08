"use client";

import { useAppSelector } from "@/src/app/redux";
import Header from "@/src/components/Header";
import ModalNewTask from "@/src/components/ModalNewTask";
import TaskCard from "@/src/components/TaskCard";
import { dataGridClassNames, dataGridSxStyles } from "@/src/lib/utils";
import { Priority, Task, useGetTasksByUserQuery } from "@/src/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Plus } from "lucide-react";
import React, { useState } from "react";

type Props = {
  priority: Priority;
};

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "description",
    headerName: "Description",
    width: 250,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => {
      const colorMap: Record<string, string> = {
        "To Do": "bg-gray-100 text-gray-700",
        "Work In Progress": "bg-blue-100 text-blue-700",
        "Under Review": "bg-amber-100 text-amber-700",
        Completed: "bg-green-100 text-green-700",
      };
      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorMap[params.value] || "bg-gray-100 text-gray-700"}`}
        >
          {params.value}
        </span>
      );
    },
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 100,
    renderCell: (params) => {
      const colorMap: Record<string, string> = {
        Urgent: "bg-red-100 text-red-700",
        High: "bg-orange-100 text-orange-700",
        Medium: "bg-yellow-100 text-yellow-700",
        Low: "bg-green-100 text-green-700",
        Backlog: "bg-gray-100 text-gray-600",
      };
      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorMap[params.value] || "bg-gray-100 text-gray-700"}`}
        >
          {params.value}
        </span>
      );
    },
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 130,
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value?.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value?.username || "Unassigned",
  },
];

const ReusablePriorityPage = ({ priority }: Props) => {
  const [view, setView] = useState("list");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  const userId = 1;
  const {
    data: tasks,
    isLoading,
    isError: isTasksError,
  } = useGetTasksByUserQuery(userId || 0, {
    skip: userId === null,
  });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const filteredTasks = tasks?.filter(
    (task: Task) => task.priority === priority,
  );

  if (isTasksError || !tasks)
    return (
      <div className="flex items-center justify-center py-20 text-red-500">
        Error fetching tasks
      </div>
    );

  return (
    <div className="p-8">
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />
      <Header
        name={`${priority} Priority`}
        buttonComponent={
          <button
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Add Task
          </button>
        }
      />
      <div className="mb-6 flex gap-1 rounded-lg bg-gray-100 p-1 dark:bg-dark-tertiary w-fit">
        <button
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            view === "list"
              ? "bg-white text-gray-900 shadow-sm dark:bg-dark-secondary dark:text-white"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
          }`}
          onClick={() => setView("list")}
        >
          List
        </button>
        <button
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            view === "table"
              ? "bg-white text-gray-900 shadow-sm dark:bg-dark-secondary dark:text-white"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
          }`}
          onClick={() => setView("table")}
        >
          Table
        </button>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks && filteredTasks.length > 0 ? (
            filteredTasks.map((task: Task) => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <p className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400">
              No {priority.toLowerCase()} priority tasks found
            </p>
          )}
        </div>
      ) : (
        view === "table" &&
        filteredTasks && (
          <div className="z-0 w-full rounded-xl border border-gray-200 bg-white shadow-sm dark:border-stroke-dark dark:bg-dark-secondary">
            <DataGrid
              rows={filteredTasks}
              columns={columns}
              checkboxSelection
              getRowId={(row) => row.id}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        )
      )}
    </div>
  );
};

export default ReusablePriorityPage;
