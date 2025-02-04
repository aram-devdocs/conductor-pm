import { Toolbar as MUIToolbar, ToolbarProps } from "@mui/material";

export const Toolbar: React.FC<ToolbarProps> = (props) => {
  return <MUIToolbar {...props} />;
};
