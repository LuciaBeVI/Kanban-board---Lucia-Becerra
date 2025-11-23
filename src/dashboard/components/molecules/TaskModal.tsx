import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";

interface TaskModalProps {
  onAddTask: (task: { title: string; assignee: string }) => void;
}

export const TaskModal = ({ onAddTask }: TaskModalProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("Developer");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddTask = () => {
    if (title.trim() === "") return;
    onAddTask({ title, assignee });
    setTitle("");
    setAssignee("Developer");
    handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        + Nueva Tarea
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Crear Tarea
          </Typography>
          <TextField
            label="Título"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            label="Asignado a"
            fullWidth
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Developer">Developer</MenuItem>
            <MenuItem value="QA">QA</MenuItem>
          </TextField>
          <Button variant="contained" onClick={handleAddTask}>
            Agregar
          </Button>
        </Box>
      </Modal>
    </>
  );
};
