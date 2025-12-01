import { Status, Role } from "../types/types";

export const canMoveTask = (role: Role, from: Status, to: Status): boolean => {
  if (from === to) return true;
  
  if (role === "Developer") {
    if (from === "backlog" && to === "in-progress") return true;
    if (from === "in-progress" && to === "qa") return true;
  }
  
  if (role === "QA") {
    if (from === "qa" && to === "done") return true;
  }

  return false;
};