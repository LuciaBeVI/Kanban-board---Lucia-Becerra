import React from "react";

const TaskFormField = ({ label, value, onChange }: { label: string; value: string; onChange: (val: string) => void }) => {
  return (
    <div>
      <label>{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
};

export default TaskFormField;
