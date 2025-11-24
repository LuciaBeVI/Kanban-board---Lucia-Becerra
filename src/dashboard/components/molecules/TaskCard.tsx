import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../../types/types";


export const TaskCard = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const getCardColor = () => {
    if (task.assignee === "Developer") {
        return isDark ? "#0d304bff" : "#BCD4E6"; 
    } else {
        return isDark ? "#3f0b28ff" : "#D1B3C4";
    }
  };

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: 8,
    cursor: "grab",
    backgroundColor: getCardColor(),
    border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "none"
  };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CardContent sx={{ pb: "16px !important" }}>
        <Typography 
            variant="subtitle1" 
            sx={{ color: isDark ? "#e3f2fd" : "text.primary", fontWeight: 500 }}
        >
          {task.title}
        </Typography>
        
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