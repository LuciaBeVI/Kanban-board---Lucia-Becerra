import React from "react";
import { Box, Typography, Paper, useTheme } from "@mui/material";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { Task, Status } from "../../types/types";
import { TaskCard } from "../molecules/TaskCard";


interface ColumnProps {
  status: Status;
  tasks: Task[];
}

export const Column: React.FC<ColumnProps> = ({ status, tasks }) => {
  const { setNodeRef } = useDroppable({ id: status });
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  {/* COLORS */}
  const getBackgroundColor = (status: Status) => {
    switch (status) {
      case "backlog": return isDark ? "#242433ff" : "#eae9f6ff"; 
      case "in-progress": return isDark ? "#242433ff" : "#eae9f6ff";
      case "qa": return isDark ? "#242433ff" : "#eae9f6ff";
      case "done": return isDark ? "#242433ff" : "#eae9f6ff";
      default: return isDark ? "#1d2125" : "#eae9f6ff";
    }
  };

  return (
    <Box sx={{ flex: 1, minWidth: 280, p: 1 }}>
      <Paper 
        ref={setNodeRef} 
        elevation={isDark ? 2 : 0}
        sx={{ 
          bgcolor: getBackgroundColor(status),
          p: 2, 
          borderRadius: 2, 
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          transition: "background-color 0.3s ease"
        }}
      >
        <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", color: "text.primary" }}>
          {status.toUpperCase().replace("-", " ")} ({tasks.length})
        </Typography>

        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
        
        {tasks.length === 0 && (
          <Typography variant="caption" sx={{ color: "text.disabled", textAlign: "center", mt: 2 }}>
            Arrastra tareas aquí
          </Typography>
        )}
      </Paper>
    </Box>
  );
};