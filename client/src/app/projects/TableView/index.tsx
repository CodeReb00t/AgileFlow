import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppSelector } from "@/src/app/redux";
import { useGetTasksQuery } from "@/src/state/api";
import Header from "@/src/components/Header";
import { dataGridClassNames, dataGridSxStyles } from "@/src/lib/utils";
import { Plus } from "lucide-react";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 200, flex: 1 },
  { field: "description", headerName: "Description", width: 250 },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => {
      const statusColors: Record<string, string> = {
        "To Do": "bg-slate-100 text-slate-700",
        "Work In Progress": "bg-blue-100 text-blue-700",
        "Under Review": "bg-amber-100 text-amber-700",
        Completed: "bg-green-100 text-green-700",
      };
      return (
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[params.value] || "bg-gray-100 text-gray-700"}`}
        >
          {params.value}
        </span>
      );
    },
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 120,
    renderCell: (params) => {
      const priorityColors: Record<string, string> = {
        Urgent: "bg-red-100 text-red-700",
        High: "bg-orange-100 text-orange-700",
        Medium: "bg-yellow-100 text-yellow-700",
        Low: "bg-blue-100 text-blue-700",
        Backlog: "bg-gray-100 text-gray-600",
      };
      return (
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityColors[params.value] || "bg-gray-100 text-gray-700"}`}
        >
          {params.value}
        </span>
      );
    },
  },
  { field: "tags", headerName: "Tags", width: 130 },
  { field: "startDate", headerName: "Start Date", width: 130 },
  { field: "dueDate", headerName: "Due Date", width: 130 },
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

function TableView({ id, setIsModalNewTaskOpen }: Props) {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

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
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table View"
          buttonComponent={
            <button
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add Task
            </button>
          }
          isSmallText
        />
      </div>
      <DataGrid
        rows={tasks || []}
        columns={columns}
        className={dataGridClassNames}
        sx={dataGridSxStyles(isDarkMode)}
      />
    </div>
  );
}

export default TableView;
