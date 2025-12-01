import { useState, useEffect, useCallback } from "react";
import type { Task } from "../types/types";
import { loadTasks, saveTasks } from "../services/taskService";
import { arrayMove } from "@dnd-kit/sortable";

export const useTasks = () => {
  const [allTasks, setAllTasks] = useState<Task[]>(() => loadTasks());

  useEffect(() => {
    saveTasks(allTasks);
  }, [allTasks]);

  const addTask = useCallback((task: Task) => {
    setAllTasks((prev) => [...prev, task]);
  }, []);

  const updateTask = useCallback((id: string, partial: Partial<Task>) => {
    setAllTasks((prev) => prev.map(t => t.id === id ? { ...t, ...partial } : t));
  }, []);

  const moveTask = useCallback((activeId: string, overId: string) => {
    setAllTasks((prev) => {
      const oldIndex = prev.findIndex((t) => t.id === activeId);
      const newIndex = prev.findIndex((t) => t.id === overId);
      return arrayMove(prev, oldIndex, newIndex);
    });
  }, []);

  const archiveCompleted = useCallback(() => {
    setAllTasks((prev) => prev.map((t) => 
      t.status === "done" ? { ...t, isArchived: true } : t
    ));
  }, []);

  const restoreTask = useCallback((id: string) => {
    setAllTasks((prev) => prev.map(t => t.id === id ? { ...t, isArchived: false, status: 'qa' } : t));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setAllTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { 
    tasks: allTasks.filter(t => !t.isArchived),
    archivedTasks: allTasks.filter(t => t.isArchived),
    addTask, 
    updateTask, 
    moveTask, 
    archiveCompleted,
    restoreTask,
    deleteTask
  };
};