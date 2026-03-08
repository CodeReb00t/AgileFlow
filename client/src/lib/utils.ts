import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dataGridClassNames =
  "border border-gray-200 bg-white shadow-sm rounded-xl dark:border-stroke-dark dark:bg-dark-secondary dark:text-gray-200";
export const dataGridSxStyles = (isDarkMode: boolean) => {
  return {
    border: "none",
    "& .MuiDataGrid-columnHeaders": {
      color: `${isDarkMode ? "#e5e7eb" : "#374151"}`,
      fontSize: "0.8rem",
      fontWeight: 600,
      '& [role="row"] > *': {
        backgroundColor: `${isDarkMode ? "#1a1d21" : "#f9fafb"}`,
        borderColor: `${isDarkMode ? "#2d3135" : "#e5e7eb"}`,
      },
    },
    "& .MuiIconbutton-root": {
      color: `${isDarkMode ? "#a3a3a3" : "#6b7280"}`,
    },
    "& .MuiTablePagination-root": {
      color: `${isDarkMode ? "#a3a3a3" : "#6b7280"}`,
    },
    "& .MuiTablePagination-selectIcon": {
      color: `${isDarkMode ? "#a3a3a3" : "#6b7280"}`,
    },
    "& .MuiDataGrid-cell": {
      border: "none",
      display: "flex",
      alignItems: "center",
    },
    "& .MuiDataGrid-row": {
      borderBottom: `1px solid ${isDarkMode ? "#2d3135" : "#f3f4f6"}`,
      "&:hover": {
        backgroundColor: isDarkMode ? "#23272e" : "#f9fafb",
      },
    },
    "& .MuiDataGrid-withBorderColor": {
      borderColor: `${isDarkMode ? "#2d3135" : "#e5e7eb"}`,
    },
    "& .MuiCheckbox-root": {
      color: `${isDarkMode ? "#4b5563" : "#d1d5db"}`,
    },
  };
};
