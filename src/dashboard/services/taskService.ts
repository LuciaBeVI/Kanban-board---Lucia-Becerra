import type { Task } from "../components/types";

export const loadTasks = (): Task[] => JSON.parse(localStorage.getItem("tasks") || "[]");

export const saveTasks = (tasks: Task[]) => localStorage.setItem("tasks", JSON.stringify(tasks));
