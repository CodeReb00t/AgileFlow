"use client";

import React, { useState } from "react";
import ProjectHeader from "@/src/app/projects/ProjectHeader";
import BoardView from "@/src/app/projects/BoardView";
import ListView from "@/src/app/projects/ListView";
import TimeLine from "@/src/app/projects/TimeLineView";
import TableView from "@/src/app/projects/TableView";
import ModalNewTask from "@/src/components/ModalNewTask";
type Props = {
  params: Promise<{ id: string }>;
};
const Project = ({ params }: Props) => {
  const { id } = React.use(params);
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  return (
    <div>
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <TimeLine id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Table" && (
        <TableView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};
export default Project;
