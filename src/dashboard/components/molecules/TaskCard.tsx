import React from "react";
import { Card, CardContent, Typography, useTheme, Box } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../../types/types";

export const TaskCard = ({ task, onClick }: { task: Task, onClick: (task: Task) => void }) => {
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition,
    setActivatorNodeRef 
  } = useSortable({ id: task.id });
  
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const getCardColor = () => {
    if (task.assignee === "Developer") {
        return isDark ? "#0d47a1" : "#e8f2ff"; 
    } else {
        return isDark ? "#4a148c" : "#f5e8ff";
    }
  };

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: 8,
    backgroundColor: getCardColor(),
    border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "none"
  };

  return (
    <Card 
        ref={setNodeRef} 
        style={style} 
        {...attributes} 
        sx={{ position: 'relative', cursor: 'default' }} 
    >
      
      <Box 
          ref={setActivatorNodeRef}
          {...listeners} 
          sx={{ 
              display: 'flex', 
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              p: 1.5,
              cursor: 'grab', 
              bgcolor: isDark ? '#364047' : '#bae2f1ff', 
              borderBottom: '1px solid',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          }}
      >
          <Typography 
              variant="subtitle1" 
              sx={{ color: isDark ? "#e3f2fd" : "text.primary", fontWeight: 500 }}
          >
              {task.title}
          </Typography>
      </Box>

      <CardContent 
          onClick={() => onClick(task)}
          sx={{ pb: "16px !important", pr: 2, cursor: 'pointer' }}
      >
        <Typography 
            variant="body2" 
            sx={{ mt: 0.5, color: isDark ? "#b0bec5" : "text.secondary" }}
        >
          {task.description || "Sin descripción"}
        </Typography>
        
        <Typography 
            variant="caption" 
            display="block" 
            sx={{ mt: 1, color: isDark ? "#90caf9" : "text.secondary", opacity: 0.8 }}
        >
          {task.assignee} • {new Date(task.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};