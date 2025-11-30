import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, MenuItem, Button, Typography } from "@mui/material";
import type { Task, Role } from "../../types/types";


interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string, desc: string, assignee: Role) => void;
  onUpdate: (id: string, partial: Partial<Task>) => void;
  taskToEdit?: Task;
}

export const TaskModal: React.FC<TaskModalProps> = ({ open, onClose, onCreate, onUpdate, taskToEdit }) => {
  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [desc, setDesc] = useState(taskToEdit?.description || "");
  const [assignee, setAssignee] = useState<Role>(taskToEdit?.assignee || "Developer");
  
  const isEditing = !!taskToEdit;

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDesc(taskToEdit.description || "");
      setAssignee(taskToEdit.assignee);
    } else {
      setTitle("");
      setDesc("");
      setAssignee("Developer");
    }
  }, [taskToEdit, open]);

  const submit = () => {
    if (!title.trim()) return;

    if (isEditing && taskToEdit) {
      onUpdate(taskToEdit.id, {
        title: title.trim(),
        description: desc.trim(),
        assignee,
      });
    } else {
      onCreate(title.trim(), desc.trim(), assignee);
    }

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 3, width: 360, bgcolor: "background.paper", borderRadius: 2, margin: "100px auto", boxShadow: 24 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
            {isEditing ? `Editar Tarea: ${taskToEdit?.title}` : "Crear Nueva Tarea"}
        </Typography>

        <TextField label="Título" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 2 }} />
        <TextField label="Descripción" multiline rows={3} fullWidth value={desc} onChange={(e) => setDesc(e.target.value)} sx={{ mb: 2 }} />
        
        <TextField select label="Asignado a" fullWidth value={assignee} onChange={(e) => setAssignee(e.target.value as Role)} sx={{ mb: 2 }}>
          <MenuItem value="Developer">Developer</MenuItem>
          <MenuItem value="QA">QA</MenuItem>
        </TextField>
        
        {isEditing && taskToEdit && (
            <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: 2 }}>
                Estado actual: {taskToEdit.status.toUpperCase()}
            </Typography>
        )}

        <Button variant="contained" onClick={submit} fullWidth disabled={!title.trim()}>
          {isEditing ? "Guardar Cambios" : "Crear Tarea"}
        </Button>
      </Box>
    </Modal>
  );
};