import React from "react";
import { Avatar } from "@mui/material";

export const AvatarAtom = ({ name }: { name: string }) => {
  return <Avatar sx={{ width: 28, height: 28, fontSize: 14 }}>{name[0]?.toUpperCase() || "?"}</Avatar>;
};
