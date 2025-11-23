import { Card, CardContent, Typography } from "@mui/material";

interface TaskCardProps {
  title: string;
  assignee: string;
}

export const TaskCard = ({ title, assignee }: TaskCardProps) => (
  <Card sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="subtitle1">{assignee}</Typography>
      <Typography variant="body2">{title}</Typography>
    </CardContent>
  </Card>
);
