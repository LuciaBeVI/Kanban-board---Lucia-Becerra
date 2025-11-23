import React, { useState } from "react";
import KanbanBoardTemplate from "../organisms/KanbanBoardTemplate";
import Column from "../organisms/Column";
import TaskCard from "../molecules/TaskCard";
import TaskFormModal from "../organisms/TaskFormModal";
import { useTasks } from "../../hooks/useTasks";

const KanbanBoardPage = () => {
  const { tasks } = useTasks();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <button
          onClick={openModal}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          + Nueva Tarea
        </button>
        <span>Rol: Developer</span>
      </div>

      <KanbanBoardTemplate>
        <Column title="Backlog">
          {tasks
            .filter((t) => t.status === "backlog")
            .map((t) => (
              <TaskCard key={t.id} title={t.title} assignee={t.assignee} />
            ))}
        </Column>

        <Column title="In Progress">
          {tasks
            .filter((t) => t.status === "in-progress")
            .map((t) => (
              <TaskCard key={t.id} title={t.title} assignee={t.assignee} />
            ))}
        </Column>

        <Column title="QA">
          {tasks
            .filter((t) => t.status === "qa")
            .map((t) => (
              <TaskCard key={t.id} title={t.title} assignee={t.assignee} />
            ))}
        </Column>

        <Column title="Done">
          {tasks
            .filter((t) => t.status === "done")
            .map((t) => (
              <TaskCard key={t.id} title={t.title} assignee={t.assignee} />
            ))}
        </Column>
      </KanbanBoardTemplate>

      <TaskFormModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default KanbanBoardPage;
