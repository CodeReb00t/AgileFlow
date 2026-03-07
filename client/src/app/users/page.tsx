"use client";

import { useGetUsersQuery } from "@/src/state/api";
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
  { field: "userId", headerName: "ID", width: 100 },
  { field: "username", headerName: "UserName", width: 150 },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 100,
    renderCell: (params) => (
      <div className="flex h-full items-center justify-center">
        <div className="h-9 w-9">
          <Image
            src={`/images/${params.value}`}
            alt={params.row.username}
            width={100}
            height={50}
            className="h-full  rounded-full object-cover"
          />
        </div>
      </div>
    ),
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

const UsersPage = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  if (isLoading) return <div>Loading...</div>;
  if (isError || !users) return <div>Error loading users</div>;
  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Users" />
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={users || []}
          columns={columns}
          getRowId={(row) => row.userId}
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

export default UsersPage;
