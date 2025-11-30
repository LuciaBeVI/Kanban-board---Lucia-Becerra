import { useState, useEffect, useCallback } from "react";
import type { Task } from "../types/types";
import { loadTasks, saveTasks } from "../services/taskService";
import { arrayMove } from "@dnd-kit/sortable";


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

  const moveTask = useCallback((activeId: string, overId: string) => {
    setTasks((prev) => {
      const oldIndex = prev.findIndex((t) => t.id === activeId);
      const newIndex = prev.findIndex((t) => t.id === overId);
      
      return arrayMove(prev, oldIndex, newIndex);
    });
  }, []);

  return { tasks, addTask, updateTask, moveTask };
};
