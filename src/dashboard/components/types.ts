export type TaskStatus = "backlog" | "in-progress" | "qa" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: TaskStatus;
  createdAt: string;
}
