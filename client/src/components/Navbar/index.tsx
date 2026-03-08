import React from "react";
import { Menu, Moon, Search, Settings, Sun, Bell } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/src/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/src/state";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  return (
    <div className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-md px-4 py-3 dark:border-stroke-dark dark:bg-dark-secondary/80">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {isSidebarCollapsed && (
          <button
            onClick={() => dispatch(setIsSidebarCollapsed(false))}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        )}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            className="w-[220px] lg:w-[320px] rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-stroke-dark dark:bg-dark-tertiary dark:text-gray-200 dark:placeholder-gray-500 dark:focus:border-blue-500 transition-all"
            type="search"
            placeholder="Search anything..."
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-amber-400" />
          ) : (
            <Moon className="h-5 w-5 text-gray-600" />
          )}
        </button>
        <button className="relative rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
          <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-500" />
        </button>
        <Link
          href="/settings"
          className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
        >
          <Settings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </Link>
        <div className="ml-2 hidden h-8 w-px bg-gray-200 dark:bg-stroke-dark md:block" />
        <div className="ml-3 hidden md:flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
            D
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
