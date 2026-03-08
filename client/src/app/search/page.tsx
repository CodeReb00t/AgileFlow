"use client";

import Header from "@/src/components/Header";
import ProjectCard from "@/src/components/ProjectCard";
import TaskCard from "@/src/components/TaskCard";
import UserCard from "@/src/components/UserCard";
import { useSearchQuery } from "@/src/state/api";
import { debounce } from "lodash";
import { Search as SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500,
  );

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  return (
    <div className="p-8">
      <Header name="Search" />
      <div className="relative max-w-xl">
        <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search tasks, projects, or users..."
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-stroke-dark dark:bg-dark-secondary dark:text-white dark:placeholder:text-gray-500 transition-colors"
          onChange={handleSearch}
        />
      </div>
      <div className="mt-6">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          </div>
        )}
        {isError && (
          <p className="text-red-500">
            Error occurred while fetching search results.
          </p>
        )}
        {!isLoading && !isError && searchResults && (
          <div className="space-y-6">
            {searchResults.tasks && searchResults.tasks?.length > 0 && (
              <div>
                <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                  Tasks
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {searchResults.tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            )}

            {searchResults.projects && searchResults.projects?.length > 0 && (
              <div>
                <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                  Projects
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {searchResults.projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            )}

            {searchResults.users && searchResults.users?.length > 0 && (
              <div>
                <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                  Users
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {searchResults.users.map((user) => (
                    <UserCard key={user.userId} user={user} />
                  ))}
                </div>
              </div>
            )}

            {searchTerm.length >= 3 &&
              !searchResults.tasks?.length &&
              !searchResults.projects?.length &&
              !searchResults.users?.length && (
                <p className="py-12 text-center text-gray-500 dark:text-gray-400">
                  No results found for &ldquo;{searchTerm}&rdquo;
                </p>
              )}
          </div>
        )}
        {searchTerm.length < 3 && !isLoading && (
          <p className="py-12 text-center text-gray-400 dark:text-gray-500">
            Type at least 3 characters to search
          </p>
        )}
      </div>
    </div>
  );
};

export default Search;
