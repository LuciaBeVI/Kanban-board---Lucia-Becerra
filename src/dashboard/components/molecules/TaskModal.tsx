import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, MenuItem, Button, Typography, ToggleButtonGroup, ToggleButton } from "@mui/material";
import type { Task, Role } from "../../types/types";
import DeleteIcon from '@mui/icons-material/Delete';

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string, desc: string, assignee: Role, storyPoints: number) => void;
  onUpdate: (id: string, partial: Partial<Task>) => void;
  onDelete: (id: string) => void; 
  taskToEdit?: Task;
}

export const TaskModal: React.FC<TaskModalProps> = ({ open, onClose, onCreate, onUpdate, onDelete, taskToEdit }) => {
  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [desc, setDesc] = useState(taskToEdit?.description || "");
  const [assignee, setAssignee] = useState<Role>(taskToEdit?.assignee || "Developer");
  const [points, setPoints] = useState<number>(taskToEdit?.storyPoints || 1);
  
  const isEditing = !!taskToEdit;

  useEffect(() => {
    if (taskToEdit) {
      setPoints(taskToEdit.storyPoints || 1);
      setTitle(taskToEdit.title);
      setDesc(taskToEdit.description || "");
      setAssignee(taskToEdit.assignee);
    } else {
      setTitle("");
      setDesc("");
      setAssignee("Developer");
      setPoints(1);
    }
  }, [taskToEdit, open]);

  const submit = () => {
    if (!title.trim()) return;

    if (isEditing && taskToEdit) {
      onUpdate(taskToEdit.id, {
        title: title.trim(),
        description: desc.trim(),
        assignee,
        storyPoints: points,
      });
    } else {
      onCreate(title.trim(), desc.trim(), assignee, points);
    }

    onClose();
  };

  const handleDelete = () => {
    if (taskToEdit && confirm("¿Estás seguro de borrar esta tarea permanentemente?")) {
        onDelete(taskToEdit.id);
        onClose();
    }
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
        
        <Typography variant="caption" display="block" sx={{ mb: 1 }}>Puntos de Historia (Complejidad)</Typography>
        <ToggleButtonGroup
          value={points}
          exclusive
          onChange={(e, newPoints) => newPoints && setPoints(newPoints)}
          aria-label="story points"
          size="small"
          sx={{ mb: 3, display: 'flex', flexWrap: 'wrap' }}
        >
          {[1, 2, 3, 5, 8, 13].map((p) => (
            <ToggleButton key={p} value={p} sx={{ flex: 1 }}>{p}</ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Box display="flex" gap={2} justifyContent="space-between">
            {isEditing && (
                <Button 
                    variant="outlined" 
                    color="error" 
                    onClick={handleDelete}
                    sx={{ minWidth: '40px', px: 1 }} 
                >
                    <DeleteIcon />
                </Button>
            )}

        <Button variant="contained" onClick={submit} fullWidth disabled={!title.trim()}>
          {isEditing ? "Guardar Cambios" : "Crear Tarea"}
        </Button>
        </Box>
      </Box>
    </Modal>
  );
};