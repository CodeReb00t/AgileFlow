"use client";

import { useGetTeamsQuery } from "@/src/state/api";
import React from "react";
import { useAppSelector } from "../redux";
import Header from "@/src/components/Header";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/src/lib/utils";

const columns: GridColDef[] = [
  { field: "id", headerName: "Team ID", width: 100 },
  { field: "teamName", headerName: "Team Name", width: 200 },
  { field: "productOwnerUserName", headerName: "Product Owner", width: 200 },
  {
    field: "projectManagerUserName",
    headerName: "Project Manager",
    width: 200,
  },
];

const CustomToolbar = () => {
  return (
    <GridToolbarContainer className="toolbar flex gap-2">
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

const Teams = () => {
  const { data: teams, isLoading, isError } = useGetTeamsQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  if (isError || !teams)
    return (
      <div className="flex items-center justify-center py-20 text-red-500">
        Error loading teams
      </div>
    );

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Teams" />
      <div
        className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-stroke-dark dark:bg-dark-secondary"
        style={{ height: 650, width: "100%" }}
      >
        <DataGrid
          rows={teams || []}
          columns={columns}
          className={dataGridClassNames}
          pagination
          slots={{
            toolbar: CustomToolbar,
          }}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Teams;
