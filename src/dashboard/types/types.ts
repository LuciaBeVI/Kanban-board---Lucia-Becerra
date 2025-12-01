export type Status = "backlog" | "in-progress" | "qa" | "done";
export type Role = "Developer" | "QA";

export interface Task {
  id: string;
  readableId: string;
  title: string;
  description?: string;
  assignee: Role;
  status: Status;
  storyPoints?: number;
  createdAt: string;
  isArchived?: boolean;
}
