"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Home,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  User,
  Users,
  X,
  Briefcase,
  ChevronUp,
  ChevronDown,
  AlertCircle,
  ShieldAlert,
  AlertTriangle,
  AlertOctagon,
  Layers3,
  LayoutDashboard,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/app/redux";
import Link from "next/link";
import { setIsSidebarCollapsed } from "@/src/state";
import { useGetProjectsQuery } from "@/src/state/api";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname === "/" && href === "/");
  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 rounded-lg mx-3 px-3 py-2.5 transition-all duration-200 ${
          isActive
            ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
            : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
        }`}
      >
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-blue-500" />
        )}
        <Icon className="h-5 w-5 flex-shrink-0" />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const { data: projects } = useGetProjectsQuery();
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  return (
    <div
      className={`fixed flex flex-col h-full justify-between shadow-xl border-r border-gray-200 dark:border-stroke-dark
        transition-all duration-300 z-40 bg-white dark:bg-dark-secondary overflow-y-auto ${
          isSidebarCollapsed ? "w-0 hidden" : "w-64"
        }`}
    >
      <div className="flex h-full w-full flex-col justify-start">
        {/* Logo */}
        <div className="flex min-h-[64px] items-center justify-between px-5 border-b border-gray-100 dark:border-stroke-dark">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-sm">
              DG
            </div>
            <span className="text-lg font-bold bg-black dark:bg-white  bg-clip-text text-transparent">
              Devansh
            </span>
          </div>
          <button
            className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            onClick={() => dispatch(setIsSidebarCollapsed(true))}
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Team */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-stroke-dark">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              My Workspace
            </h3>
            <div className="flex items-center gap-1.5">
              <LockIcon className="h-3 w-3 text-gray-400" />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Private
              </p>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="mt-2 space-y-0.5 px-1">
          <SidebarLink href="/" icon={Home} label="Home" />
          <SidebarLink href="/timeline" icon={Briefcase} label="Timeline" />
          <SidebarLink href="/search" icon={Search} label="Search" />
          <SidebarLink href="/settings" icon={Settings} label="Settings" />
          <SidebarLink href="/users" icon={User} label="Users" />
          <SidebarLink href="/teams" icon={Users} label="Teams" />
        </nav>

        {/* Projects Section */}
        <div className="mt-4 px-1">
          <button
            onClick={() => setShowProjects((prev) => !prev)}
            className="flex w-full items-center justify-between px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <span>Projects</span>
            {showProjects ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          <div
            className={`space-y-0.5 overflow-hidden transition-all duration-200 ${showProjects ? "max-h-96" : "max-h-0"}`}
          >
            {projects?.map((project) => (
              <SidebarLink
                href={`/projects/${project.id}`}
                icon={Briefcase}
                label={project.name}
                key={project.id}
              />
            ))}
          </div>
        </div>

        {/* Priority Section */}
        <div className="mt-2 px-1">
          <button
            onClick={() => setShowPriority((prev) => !prev)}
            className="flex w-full items-center justify-between px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <span>Priority</span>
            {showPriority ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          <div
            className={`space-y-0.5 overflow-hidden transition-all duration-200 ${showPriority ? "max-h-96" : "max-h-0"}`}
          >
            <SidebarLink
              href="/priority/urgent"
              icon={AlertCircle}
              label="Urgent"
            />
            <SidebarLink
              href="/priority/high"
              icon={ShieldAlert}
              label="High"
            />
            <SidebarLink
              href="/priority/medium"
              icon={AlertTriangle}
              label="Medium"
            />
            <SidebarLink href="/priority/low" icon={AlertOctagon} label="Low" />
            <SidebarLink
              href="/priority/backlog"
              icon={Layers3}
              label="Backlog"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
