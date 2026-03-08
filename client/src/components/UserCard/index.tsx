import { User } from "@/src/state/api";
import Image from "next/image";
import { Mail } from "lucide-react";
import React from "react";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200 dark:border-stroke-dark dark:bg-dark-secondary animate-fade-in">
      {user.profilePictureUrl ? (
        <Image
          src={`/images/${user.profilePictureUrl}`}
          alt={user.username}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />
      ) : (
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
          {user.username?.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="min-w-0">
        <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
          {user.username}
        </p>
        {user.email && (
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 truncate">
            <Mail className="h-3 w-3" />
            {user.email}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserCard;
