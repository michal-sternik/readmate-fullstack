import { Chip } from "@mui/material";
import React from "react";

interface CustomChipProps {
  icon: React.ReactElement;
  label: string;
  className?: string;
}

export const CustomChip = ({ icon, label, className }: CustomChipProps) => {
  return (
    <Chip
      variant="outlined"
      icon={<span style={{ color: "#A449FF" }}>{icon}</span>}
      label={label}
      sx={{ borderColor: "#A449FF", color: "#A449FF" }}
      className={className}
    />
  );
};
