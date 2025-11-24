export type Status = "backlog" | "in-progress" | "qa" | "done";
export type Role = "Developer" | "QA";

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignee: Role;
  status: Status;
  createdAt: string;
}