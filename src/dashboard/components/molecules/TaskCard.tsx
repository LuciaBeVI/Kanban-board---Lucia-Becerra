import React from "react";
import { Card, CardContent, Typography, useTheme, Box, Avatar } from "@mui/material";
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
        return isDark ? "#180e27ff" : "#f0e4eaff"; 
    } else {
        return isDark ? "#13152a" : "#f3eff5";
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
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              p: 1.5,
              cursor: 'grab', 
              bgcolor: isDark ? '#2b1224' : '#d5c6e0', 
              borderBottom: '1px solid',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          }}
      >
          <Typography 
              variant="caption" 
              sx={{ 
                  color: isDark ? "#90caf9" : "primary.main", 
                  fontWeight: "bold", 
                  fontSize: "0.7rem",
                  mb: 0.5 
              }}
          >
              {task.readableId || "TASK"}
          </Typography>

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
          {task.description || "No description provided"}
        </Typography>
        
        <Box display="flex" justifyContent="space-between" alignItems="end" mt={1}>
            
            <Box>
                <Typography 
                    variant="caption" 
                    display="block" 
                    sx={{ color: isDark ? "#f3f9feff" : "text.secondary", opacity: 0.8, mb: 0.5 }}
                >
                  {task.assignee} • {new Date(task.createdAt).toLocaleDateString()}
                </Typography>

                {task.storyPoints && (
                    <Box sx={{ 
                        bgcolor: isDark ? "rgba(255, 255, 255, 0.15)" : "#b8bedd", 
                        borderRadius: "20%", 
                        width: 24, 
                        height: 24, 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        color: isDark ? "#fff" : "#333"
                    }}>
                        {task.storyPoints}
                    </Box>
                )}
            </Box>

            <Avatar sx={{ 
                width: 24, 
                height: 24, 
                fontSize: 12, 
                bgcolor: task.assignee === "Developer" ? "secondary.main" : "primary.main" 
            }}>
                {task.assignee === "Developer" ? "J" : "P"}
            </Avatar>

        </Box>
      </CardContent>
    </Card>
  );
};