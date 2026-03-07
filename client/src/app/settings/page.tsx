import Header from "@/src/components/Header";
import React from "react";
import { text } from "stream/consumers";

const SettingPage = () => {
  const userSettings = {
    username: "JohnDoe",
    email: "john.doe@example.com",
    teamName: "Development Team",
    roleName: "Developer",
  };

  const labelStyles = "block text-sm font-medium";
  const textStyles =
    "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2";
  return (
    <div className="p-8">
      <Header name="Settings" />
      <div className="space-y-4">
        <div>
          <label className={labelStyles}>Username</label>
          <div className={textStyles}>{userSettings.username}</div>
        </div>
        <div>
          <label className={labelStyles}>Email</label>
          <div className={textStyles}>{userSettings.email}</div>
        </div>
        <div>
          <label className={labelStyles}>Team</label>
          <div className={textStyles}>{userSettings.teamName}</div>
        </div>
        <div>
          <label className={labelStyles}>Role</label>
          <div className={textStyles}>{userSettings.roleName}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
