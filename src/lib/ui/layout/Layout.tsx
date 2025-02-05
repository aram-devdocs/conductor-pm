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
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import { Breadcrumbs, BreadcrumbLink } from "../core/navigation/Breadcrumbs";
import { useSPA } from "../../contexts/SPAContext";
import { useColorMode } from "../../contexts";
import { useMediaQuery } from "../core/utils/useMediaQuery";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface LayoutProps {
  children: React.ReactNode;
}

const DRAWER_WIDTH = 240;
const APPBAR_HEIGHT = 64; // Standard AppBar height
const BREADCRUMBS_HEIGHT = 48; // Height for breadcrumbs
const TOTAL_TOP_HEIGHT = APPBAR_HEIGHT + BREADCRUMBS_HEIGHT;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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

  const startingPointIcons: Record<string, React.ReactElement> = {
    welcome: <HomeIcon />,
    chat: <ChatIcon />,
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar */}
      <AppBar
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          height: APPBAR_HEIGHT,
          position: "fixed",
        }}
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

        <Breadcrumbs links={breadcrumbLinks} />
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar /> {/* This creates space for the AppBar */}
        <Box sx={{ overflow: "auto" }}>
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
        </Box>
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        {/* Content area */}
        <Box
          sx={{
            height: `calc(100vh - ${TOTAL_TOP_HEIGHT + 24}px)`,
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
