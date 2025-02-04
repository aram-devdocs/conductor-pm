import { ButtonProps, Button as MuiButton } from "@mui/material";
import React from "react";
export const Button = ({ children, ...props }: ButtonProps) => {
  return <MuiButton {...props}>{children}</MuiButton>;
};
