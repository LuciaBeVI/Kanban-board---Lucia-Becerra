import { Box, Typography } from "@mui/material";
import { TaskCard } from "../molecules/TaskCard";

interface ColumnProps {
  name: string;
  tasks: { title: string; assignee: string }[];
}

export const Column = ({ name, tasks }: ColumnProps) => (
  <Box
    sx={{
      width: 250,
      background: "white",
      borderRadius: 2,
      p: 2,
      boxShadow: 2,
    }}
  >
    <Typography variant="h6" sx={{ mb: 2 }}>
      {name}
    </Typography>
    {tasks.map((task, i) => (
      <TaskCard key={i} title={task.title} assignee={task.assignee} />
    ))}
  </Box>
);
