import React from "react";

const Input = ({ value, onChange, placeholder }: { value: string; onChange: (val: string) => void; placeholder?: string }) => {
  return <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />;
};

export default Input;
