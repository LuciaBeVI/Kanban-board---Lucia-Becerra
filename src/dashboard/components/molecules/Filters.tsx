import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface Props {
  roleFilter: string;
  statusFilter: string;
  onRoleChange: (v: string) => void;
  onStatusChange: (v: string) => void;
}

export const Filters: React.FC<Props> = ({
  roleFilter,
  statusFilter,
  onRoleChange,
  onStatusChange,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel>Filtrar por Rol</InputLabel>
        <Select
          value={roleFilter}
          label="Filtrar por Rol"
          onChange={(e) => onRoleChange(e.target.value)}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="Developer">Developer</MenuItem>
          <MenuItem value="QA">QA</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel>Filtrar por Estado</InputLabel>
        <Select
          value={statusFilter}
          label="Filtrar por Estado"
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="backlog">Backlog</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="qa">QA</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};