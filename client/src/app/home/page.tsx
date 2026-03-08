"use client";

import {
  Priority,
  Project,
  Task,
  useGetProjectsQuery,
  useGetTasksQuery,
} from "@/src/state/api";
import React from "react";
import { useAppSelector } from "../redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "@/src/components/Header";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dataGridClassNames, dataGridSxStyles } from "@/src/lib/utils";
import { BarChart3, PieChart as PieChartIcon, ListChecks } from "lucide-react";

const taskColumns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 200 },
  {
    field: "status",
    headerName: "Status",
    width: 150,
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
    width: 150,
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
  { field: "dueDate", headerName: "Due Date", width: 150 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const HomePage = () => {
  const {
    data: tasks,
    isLoading: tasksLoading,
    isError: tasksError,
  } = useGetTasksQuery({ projectId: parseInt("1") });
  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsQuery();

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (tasksLoading || isProjectsLoading)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  if (tasksError || !tasks || !projects)
    return (
      <div className="flex items-center justify-center py-20 text-red-500">
        Error fetching data
      </div>
    );

  const priorityCount = tasks.reduce(
    (acc: Record<string, number>, task: Task) => {
      const { priority } = task;
      acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
      return acc;
    },
    {},
  );

  const taskDistribution = Object.keys(priorityCount).map((key) => ({
    name: key,
    count: priorityCount[key],
  }));

  const statusCount = projects.reduce(
    (acc: Record<string, number>, project: Project) => {
      const status = project.endDate ? "Completed" : "Active";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {},
  );

  const projectStatus = Object.keys(statusCount).map((key) => ({
    name: key,
    count: statusCount[key],
  }));

  const chartColors = isDarkMode
    ? {
        bar: "#818cf8",
        barGrid: "#374151",
        pieFill: "#4A90E2",
        text: "#d1d5db",
      }
    : {
        bar: "#6366f1",
        barGrid: "#e5e7eb",
        pieFill: "#82ca9d",
        text: "#374151",
      };

  return (
    <div className="h-full w-full p-8">
      <Header name="Project Management Dashboard" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Bar Chart Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-stroke-dark dark:bg-dark-secondary">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-indigo-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Task Priority Distribution
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskDistribution}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartColors.barGrid}
              />
              <XAxis dataKey="name" stroke={chartColors.text} fontSize={12} />
              <YAxis stroke={chartColors.text} fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? "#23272e" : "#fff",
                  border: isDarkMode
                    ? "1px solid #374151"
                    : "1px solid #e5e7eb",
                  borderRadius: "8px",
                  color: isDarkMode ? "#fff" : "#000",
                }}
              />
              <Legend />
              <Bar
                dataKey="count"
                fill={chartColors.bar}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-stroke-dark dark:bg-dark-secondary">
          <div className="mb-4 flex items-center gap-2">
            <PieChartIcon className="h-5 w-5 text-emerald-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Project Status
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="count"
                data={projectStatus}
                fill="#82ca9d"
                label
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
              >
                {projectStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? "#23272e" : "#fff",
                  border: isDarkMode
                    ? "1px solid #374151"
                    : "1px solid #e5e7eb",
                  borderRadius: "8px",
                  color: isDarkMode ? "#fff" : "#000",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Tasks Table */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-stroke-dark dark:bg-dark-secondary md:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Your Tasks
            </h3>
          </div>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={tasks}
              columns={taskColumns}
              checkboxSelection
              loading={tasksLoading}
              getRowClassName={() => "data-grid-row"}
              getCellClassName={() => "data-grid-cell"}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
