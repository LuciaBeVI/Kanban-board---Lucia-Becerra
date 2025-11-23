import { useState, useEffect } from "react";
import type { Task } from "../components/types";
import { loadTasks, saveTasks } from "../services/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  const addTask = (task: Task) => {
    const updated = [...tasks, task];
    setTasks(updated);
    saveTasks(updated);
  };

  return { tasks, addTask };
};
