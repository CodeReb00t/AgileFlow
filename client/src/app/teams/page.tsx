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
import Image from "next/image";
import { dataGridClassNames, dataGridSxStyles } from "@/src/lib/utils";
import { Grid } from "lucide-react";
import { GridToolbar } from "@mui/x-data-grid/internals";
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
  if (isLoading) return <div>Loading...</div>;
  if (isError || !teams) return <div>Error loading teams</div>;
  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Teams" />
      <div style={{ height: 650, width: "100%" }}>
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
