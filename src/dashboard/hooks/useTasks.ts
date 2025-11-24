import { useState, useEffect, useCallback } from "react";
import type { Task } from "../types/types";
import { loadTasks, saveTasks } from "../services/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((task: Task) => {
    setTasks((prev) => [...prev, task]);
  }, []);

  const updateTask = useCallback((id: string, partial: Partial<Task>) => {
    setTasks((prev) => prev.map(t => t.id === id ? { ...t, ...partial } : t));
  }, []);

  return { tasks, addTask, updateTask };
};
