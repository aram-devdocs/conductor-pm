import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Paper,
  Drawer,
} from "../core";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import { Breadcrumbs, BreadcrumbLink } from "../core/navigation/Breadcrumbs";
import { useSPA } from "../../contexts/SPAContext";
import { useColorMode } from "../../contexts";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface LayoutProps {
  children: React.ReactNode;
}

const DRAWER_WIDTH = 240;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const {
    history,
    goBack,
    canGoBack,
    navigateTo,
    startingPoints,
    screens,
    currentScreen,
  } = useSPA();
  const { mode, toggleColorMode } = useColorMode();

  const breadcrumbLinks: BreadcrumbLink[] = history.map((entry) => ({
    label: entry.title || entry.id,
    onClick: () => navigateTo(entry.id, entry.props, entry.title),
  }));

  // Map of starting point IDs to their icons
  const startingPointIcons: Record<string, React.ReactElement> = {
    welcome: <HomeIcon />,
    chat: <ChatIcon />,
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        // debug yellow border
        border: "1px solid yellow",
      }}
    >
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
          <IconButton
            color="inherit"
            aria-label="toggle dark mode"
            sx={{ mr: 2 }}
            onClick={toggleColorMode}
          >
            {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
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
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            top: "auto",
            marginTop: "112px",
          },
        }}
      >
        <List>
          {startingPoints.map((screenId) => (
            <ListItem key={screenId} disablePadding>
              <ListItemButton
                selected={currentScreen === screenId}
                onClick={() => navigateTo(screenId)}
              >
                {startingPointIcons[screenId] && (
                  <ListItemIcon>{startingPointIcons[screenId]}</ListItemIcon>
                )}
                <ListItemText primary={screens[screenId].title || screenId} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          marginTop: "112px",
          marginLeft: `${DRAWER_WIDTH}px`,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          //   debug blue border
          border: "1px solid blue",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
