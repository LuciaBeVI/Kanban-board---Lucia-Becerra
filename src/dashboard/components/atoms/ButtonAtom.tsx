import { Button } from "@mui/material";

interface ButtonAtomProps {
  text: string;
  onClick?: () => void;
}

export const ButtonAtom = ({ text, onClick }: ButtonAtomProps) => (
  <Button variant="contained" onClick={onClick}>
    {text}
  </Button>
);
