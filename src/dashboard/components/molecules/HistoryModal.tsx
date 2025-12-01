import React from "react";
import { Modal, Box, Typography, List, ListItem, ListItemText, IconButton, Chip, Divider } from "@mui/material";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import CloseIcon from '@mui/icons-material/Close';
import { Task } from "../../types/types";

interface Props {
  open: boolean;
  onClose: () => void;
  archivedTasks: Task[];
  onRestore: (id: string) => void;
}

export const HistoryModal: React.FC<Props> = ({ open, onClose, archivedTasks, onRestore }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ 
          p: 3, 
          width: { xs: "90%", sm: 500 }, 
          maxHeight: "80vh",
          bgcolor: "background.paper", 
          borderRadius: 2, 
          margin: "50px auto", 
          boxShadow: 24,
          overflowY: "auto"
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Sprint History (Archived)</Typography>
            <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>
        
        <Divider sx={{ mb: 2 }} />

        {archivedTasks.length === 0 ? (
            <Typography variant="body2" color="text.secondary" align="center">
                No archived tasks.
            </Typography>
        ) : (
            <List>
                {archivedTasks.map((task) => (
                    <ListItem 
                        key={task.id} 
                        secondaryAction={
                            <IconButton edge="end" onClick={() => onRestore(task.id)} title="Restore to Board">
                                <RestoreFromTrashIcon />
                            </IconButton>
                        }
                        sx={{ bgcolor: "action.hover", mb: 1, borderRadius: 1 }}
                    >
                        <ListItemText 
                            primary={
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography variant="subtitle2">{task.title}</Typography>
                                    {task.storyPoints && (
                                        <Chip label={task.storyPoints} size="small" color="primary" variant="outlined" sx={{ height: 20 }}/>
                                    )}
                                </Box>
                            }
                            secondary={`Assignee: ${task.assignee} • ${new Date(task.createdAt).toLocaleDateString()}`}
                        />
                    </ListItem>
                ))}
            </List>
        )}
      </Box>
    </Modal>
  );
};