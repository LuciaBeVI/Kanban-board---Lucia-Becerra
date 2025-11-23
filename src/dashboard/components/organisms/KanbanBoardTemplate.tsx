import React from "react";

const KanbanBoardTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 min-h-screen bg-gray-100">
      {children}
    </div>
  );
};

export default KanbanBoardTemplate;
