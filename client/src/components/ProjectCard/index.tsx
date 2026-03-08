import { Project } from "@/src/state/api";
import { Calendar, Folder } from "lucide-react";
import { format } from "date-fns";
import React from "react";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-200 dark:border-stroke-dark dark:bg-dark-secondary animate-fade-in">
      <div className="flex items-start gap-3 mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white flex-shrink-0">
          <Folder className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
            {project.name}
          </h3>
          {project.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-0.5">
              {project.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-stroke-dark">
        {project.startDate && (
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {format(new Date(project.startDate), "MMM d, yyyy")}
          </span>
        )}
        {project.endDate && (
          <span className="flex items-center gap-1">
            → {format(new Date(project.endDate), "MMM d, yyyy")}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
