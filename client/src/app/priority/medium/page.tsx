import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/src/state/api";

const Urgent = () => {
  return <ReusablePriorityPage priority={Priority.Medium} />;
};

export default Urgent;
