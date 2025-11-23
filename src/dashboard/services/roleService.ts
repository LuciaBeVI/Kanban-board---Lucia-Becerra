import type { TaskStatus } from "../components/types";

export const canMove = (role: string, from: TaskStatus, to: TaskStatus) => {
  if (role === "Developer") return (from === "backlog" && to === "in-progress") || (from === "in-progress" && to === "qa");
  if (role === "QA") return from === "qa" && to === "done";
  return false;
};
