"use client";

import { useState } from "react";
import Header from "@/src/components/Header";
import {
  Clock,
  Filter,
  Grid3x3,
  List,
  PlusSquare,
  Share2,
  Table,
  Search,
} from "lucide-react";
import ModalNewProject from "@/src/app/projects/ModalNewProject";

type Props = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);
  return (
    <div className="px-4 xl:px-6">
      <ModalNewProject
        isOpen={isModalNewProjectOpen}
        onClose={() => setIsModalNewProjectOpen(false)}
      />
      <div className="pb-4 pt-6 lg:pt-8">
        <Header
          name="Project Board"
          buttonComponent={
            <button
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
              onClick={() => setIsModalNewProjectOpen(true)}
            >
              <PlusSquare className="h-4 w-4" /> New Project
            </button>
          }
        />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 dark:border-stroke-dark">
        <div className="flex items-center gap-1">
          <TabButton
            name="Board"
            icon={<Grid3x3 className="h-4 w-4" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="List"
            icon={<List className="h-4 w-4" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Timeline"
            icon={<Clock className="h-4 w-4" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Table"
            icon={<Table className="h-4 w-4" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
        <div className="flex items-center gap-2 pb-2">
          <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-white/10 transition-colors">
            <Filter className="h-4 w-4" />
          </button>
          <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-white/10 transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-8 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-stroke-dark dark:bg-dark-tertiary dark:text-gray-200 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
};

const TabButton = ({ name, setActiveTab, activeTab, icon }: TabButtonProps) => {
  const isActive = name === activeTab;
  return (
    <button
      className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
        isActive
          ? "text-blue-600 dark:text-blue-400"
          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      }`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
      )}
    </button>
  );
};

export default ProjectHeader;
