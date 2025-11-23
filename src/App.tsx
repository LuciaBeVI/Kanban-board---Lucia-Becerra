import { useState } from "react";
import { Box } from "@mui/material";
import { Column } from "./dashboard/components/organisms/Column";
import { TaskModal } from "./dashboard/components/molecules/TaskModal";


interface Task {
  title: string;
  assignee: string;
  status: "Backlog" | "In Progress" | "QA" | "Done";
}

function App() {
  const columns = ["Backlog", "In Progress", "QA", "Done"];
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (task: { title: string; assignee: string }) => {
    setTasks([...tasks, { ...task, status: "Backlog" }]);
  };

  return (
    <Box sx={{ p: 4, background: "#f5f5f5", minHeight: "100vh" }}>
      <TaskModal onAddTask={handleAddTask} />

      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        {columns.map((col) => (
          <Column
            key={col}
            name={col}
            tasks={tasks.filter((t) => t.status === col)}
          />
        ))}
      </Box>
    </Box>
  );
}

export default App;
