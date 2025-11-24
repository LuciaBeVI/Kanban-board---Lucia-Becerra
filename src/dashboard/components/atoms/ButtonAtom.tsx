import React from "react";
import { Button } from "@mui/material";

interface Props {
  text: string;
  onClick?: () => void;
}

export const ButtonAtom = ({ text, onClick }: Props) => (
  <Button variant="contained" onClick={onClick}>
    {text}
  </Button>
);
