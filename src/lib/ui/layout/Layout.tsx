import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Breadcrumbs, BreadcrumbLink } from "../core/navigation/Breadcrumbs";
import { useSPA } from "../../contexts/SPAContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { history, goBack, canGoBack, navigateTo } = useSPA();

  const breadcrumbLinks: BreadcrumbLink[] = history.map((entry) => ({
    label: entry.title || entry.id,
    onClick: () => navigateTo(entry.id, entry.props, entry.title),
  }));

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            sx={{ mr: 2, visibility: canGoBack ? "visible" : "hidden" }}
            onClick={() => goBack()}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Conductor PM
          </Typography>
        </Toolbar>
        <Paper
          elevation={0}
          square
          sx={{
            bgcolor: "background.default",
            borderBottom: 1,
            borderColor: "divider",
            px: 2,
            py: 1,
          }}
        >
          <Breadcrumbs links={breadcrumbLinks} />
        </Paper>
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          marginTop: "112px", // Adjusted to account for both toolbars
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {children}
      </Box>
      {/* <Box component="footer" sx={{ p: 1, bgcolor: "background.paper" }}>
   // Add footer content here 
      </Box> */}
    </Box>
  );
};

export default Layout;
