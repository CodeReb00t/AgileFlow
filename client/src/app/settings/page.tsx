import Header from "@/src/components/Header";
import React from "react";
import { User, Mail, Users, Shield } from "lucide-react";

const SettingPage = () => {
  const userSettings = {
    username: "JohnDoe",
    email: "john.doe@example.com",
    teamName: "Development Team",
    roleName: "Developer",
  };

  const fields = [
    { label: "Username", value: userSettings.username, icon: User },
    { label: "Email", value: userSettings.email, icon: Mail },
    { label: "Team", value: userSettings.teamName, icon: Users },
    { label: "Role", value: userSettings.roleName, icon: Shield },
  ];

  return (
    <div className="p-8">
      <Header name="Settings" />
      <div className="max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-stroke-dark dark:bg-dark-secondary">
        <div className="space-y-5">
          {fields.map((field) => (
            <div key={field.label}>
              <label className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                <field.icon className="h-4 w-4" />
                {field.label}
              </label>
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 dark:border-stroke-dark dark:bg-dark-bg dark:text-white">
                {field.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
