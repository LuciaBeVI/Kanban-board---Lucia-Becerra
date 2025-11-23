import React from "react";

const TaskFormModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return <div>Modal Form</div>;
};

export default TaskFormModal;
