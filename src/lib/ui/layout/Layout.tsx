import React from "react";
import { AppBar, Box, Drawer, Toolbar, Typography } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Conductor PM
          </Typography>
        </Toolbar>
      </AppBar>
      {/* <Drawer
        variant="permanent"
        sx={{
          width: 200,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 200, boxSizing: "border-box" },
        }}
      >
        // Add side menu items here
      </Drawer> */}
      <Box component="main" sx={{ flexGrow: 1, p: 2, marginTop: "48px" }}>
        {children}
      </Box>
      {/* <Box component="footer" sx={{ p: 1, bgcolor: "background.paper" }}>
   // Add footer content here 
      </Box> */}
    </Box>
  );
};

export default Layout;
