import type { Metadata } from "next";
//@ts-ignore
import "./globals.css";
import DashboardWrapper from "@/src/app/dashboardWrapper";
import React from "react";

export const metadata: Metadata = {
  title: "AgileFlow – Project Management",
  description: "Manage And Track Your Projects And Tasks Very Efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}
