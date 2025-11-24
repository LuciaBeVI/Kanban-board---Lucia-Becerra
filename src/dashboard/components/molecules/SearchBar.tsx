import React from "react";
import TextField from "@mui/material/TextField";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <TextField
      fullWidth
      label="Buscar tarea..."
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="small"
      sx={{ mb: 2 }}
    />
  );
};
