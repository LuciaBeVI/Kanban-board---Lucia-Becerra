import React, { useState, useMemo } from "react";
import { Snackbar, Alert, Box, Typography, Container, Chip, Switch, FormControlLabel, IconButton, Tooltip } from "@mui/material";
import { useSensor, useSensors, PointerSensor, DndContext, DragEndEvent, closestCorners, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { Task, Status, Role } from "../../types/types";
import { useTasks } from "../../hooks/useTasks";
import { Column } from "../organisms/Column";
import { TaskModal } from "../molecules/TaskModal";
import { Filters } from "../molecules/Filters";
import { SearchBar } from "../molecules/SearchBar";
import { ButtonAtom } from "../atoms/ButtonAtom";
import { canMoveTask } from "../../services/roleService";
import { TaskCard } from "../molecules/TaskCard";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const STATUSES: Status[] = ["backlog", "in-progress", "qa", "done"];

type TaskEditState = Task | undefined; 

interface KanbanPageProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const KanbanBoardPage: React.FC<KanbanPageProps> = ({ isDarkMode, toggleTheme }) => {
  const { tasks, addTask, updateTask, moveTask } = useTasks();

  const [editingTask, setEditingTask] = useState<TaskEditState>(undefined); 
  const [currentUserRole, setCurrentUserRole] = useState<Role>("Developer");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState(""); 
  const [statusFilter, setStatusFilter] = useState("");

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter ? t.assignee === roleFilter : true;
      const matchesStatus = statusFilter ? t.status === statusFilter : true;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [tasks, search, roleFilter, statusFilter]);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleCreateTask = (title: string, desc: string, assignee: Role) => {
    const newTask: Task = {
        id: crypto.randomUUID(),
        title,
        description: desc,
        assignee,
        status: "backlog",
        createdAt: new Date().toISOString(),
      };
      addTask(newTask);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTask(undefined);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id as string);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragId(null);
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const activeTask = tasks.find((t) => t.id === activeId);
    const overTask = tasks.find((t) => t.id === overId);

    if (!activeTask) return;

    let newStatus: Status = activeTask.status;

    if (STATUSES.includes(overId as Status)) {
      newStatus = overId as Status;
    } else if (overTask) {
      newStatus = overTask.status;
    }

    if (activeTask.status !== newStatus) {
        if (!canMoveTask(currentUserRole, activeTask.status, newStatus)) {
            setErrorMsg(`Acción bloqueada: ${currentUserRole} no puede mover de ${activeTask.status} a ${newStatus}.`);
            return;
        }
        updateTask(activeId, { status: newStatus });
    } else {
        moveTask(activeId, overId);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, minHeight: "100vh", bgcolor: "background.default", transition: "background-color 0.3s ease" }}>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Tablero Kanban
        </Typography>
        
        <Box display="flex" alignItems="center" gap={3} sx={{ bgcolor: "background.paper", p: 1, px: 2, borderRadius: 3, boxShadow: 1 }}>
            
            <Tooltip title="Cambiar Tema">
              <IconButton onClick={toggleTheme} color="inherit">
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>

            <Box sx={{ width: "1px", height: "24px", bgcolor: "divider" }} />

            <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2" color="text.secondary">Rol:</Typography>
                <FormControlLabel
                    control={<Switch checked={currentUserRole === "QA"} onChange={() => setCurrentUserRole(currentUserRole === "Developer" ? "QA" : "Developer")} />}
                    label={<Chip label={currentUserRole} size="small" color={currentUserRole === "Developer" ? "primary" : "secondary"} />}
                />
            </Box>

             <Box sx={{ width: "1px", height: "24px", bgcolor: "divider" }} />

            <ButtonAtom text="+ Nueva Tarea" onClick={() => setModalOpen(true)} />
        </Box>
      </Box>

      <Box sx={{ bgcolor: "background.paper", p: 2, borderRadius: 2, boxShadow: 1, mb: 3 }}>
        <Box display="flex" gap={2} flexWrap="wrap">
            <Box flex={1}>
                <SearchBar value={search} onChange={setSearch} />
            </Box>
            <Box flex={2}>
                <Filters 
                    roleFilter={roleFilter} 
                    statusFilter={statusFilter} 
                    onRoleChange={setRoleFilter} 
                    onStatusChange={setStatusFilter} 
                />
            </Box>
        </Box>
      </Box>
      
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "repeat(4, 1fr)" }} gap={2} alignItems="start">
          {STATUSES.map((status) => (
            <Column 
                key={status} 
                status={status} 
                tasks={filteredTasks.filter((t) => t.status === status)} 
                onClickTask={handleEditTask}
            />
          ))}
        </Box>
        <DragOverlay>
            {activeDragId ? (
                <Box sx={{ transform: "rotate(3deg)", opacity: 0.8 }}>
                    <TaskCard 
                        task={tasks.find(t => t.id === activeDragId)!} 
                        onClick={() => {}} 
                    />
                </Box>
            ) : null}
        </DragOverlay>
      </DndContext>

      <TaskModal 
        open={modalOpen} 
        onClose={handleCloseModal}
        onCreate={handleCreateTask}
        onUpdate={updateTask}
        taskToEdit={editingTask}
      />

      <Snackbar open={!!errorMsg} autoHideDuration={4000} onClose={() => setErrorMsg(null)}>
        <Alert severity="error" variant="filled" onClose={() => setErrorMsg(null)}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
};