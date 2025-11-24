import React, { useState } from "react";
import { Modal, Box, TextField, MenuItem, Button } from "@mui/material";
import type { Task } from "../../types/types";

export const TaskModal = ({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: (task: Task) => void; }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [assignee, setAssignee] = useState<"Developer" | "QA">("Developer");

  const submit = () => {
    if (!title.trim()) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: desc.trim(),
      assignee,
      status: "backlog",
      createdAt: new Date().toISOString(),
    };
    onCreate(newTask);
    setTitle(""); setDesc(""); setAssignee("Developer");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 3, width: 360, bgcolor: "background.paper", borderRadius: 2, margin: "100px auto" }}>
        <TextField label="Título" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 2 }} />
        <TextField label="Descripción" fullWidth value={desc} onChange={(e) => setDesc(e.target.value)} sx={{ mb: 2 }} />
        <TextField select label="Asignado a" fullWidth value={assignee} onChange={(e) => setAssignee(e.target.value as any)} sx={{ mb: 2 }}>
          <MenuItem value="Developer">Developer</MenuItem>
          <MenuItem value="QA">QA</MenuItem>
        </TextField>
        <Button variant="contained" onClick={submit} fullWidth>Crear</Button>
      </Box>
    </Modal>
  );
};
