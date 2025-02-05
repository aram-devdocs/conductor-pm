import React from "react";
import { AppBar, Box, Toolbar, Typography, IconButton, Drawer } from "../core";
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
import MenuIcon from "@mui/icons-material/Menu";

interface LayoutProps {
  children: React.ReactNode;
}

const DRAWER_WIDTH = 240;
const APPBAR_HEIGHT = 64; // Standard AppBar height
const BREADCRUMBS_HEIGHT = 48; // Height for breadcrumbs
const TOTAL_TOP_HEIGHT = APPBAR_HEIGHT + BREADCRUMBS_HEIGHT;

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = React.useState(false);
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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const breadcrumbLinks: BreadcrumbLink[] = history.map((entry) => ({
    label: entry.title || entry.id,
    onClick: () => navigateTo(entry.id, entry.props, entry.title),
  }));

  const startingPointIcons: Record<string, React.ReactElement> = {
    welcome: <HomeIcon />,
    chat: <ChatIcon />,
  };

  const drawer = (
    <Box sx={{ overflow: "auto" }}>
      <Toolbar /> {/* This creates space for the AppBar */}
      <List>
        {startingPoints.map((screenId) => (
          <ListItem key={screenId} disablePadding>
            <ListItemButton
              selected={currentScreen === screenId}
              onClick={() => {
                navigateTo(screenId);
                if (isMobile) {
                  handleDrawerToggle();
                }
              }}
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
  );

  return (
    <Box
      className="layout-root-container"
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        width: "100vw",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <AppBar
        className="layout-app-bar"
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          height: APPBAR_HEIGHT,
          backgroundColor: "background.default",
        }}
      >
        <Toolbar className="layout-toolbar">
          {isMobile && (
            <IconButton
              className="layout-mobile-menu-toggle"
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {canGoBack && (
            <IconButton
              className="layout-back-button"
              edge="start"
              color="inherit"
              aria-label="back"
              sx={{ mr: 2 }}
              onClick={() => goBack()}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <IconButton
            className="layout-theme-toggle"
            color="inherit"
            aria-label="toggle dark mode"
            sx={{ mr: 2 }}
            onClick={toggleColorMode}
          >
            {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
          <Typography
            className="layout-title"
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Conductor PM
          </Typography>
        </Toolbar>
        <Breadcrumbs className="layout-breadcrumbs" links={breadcrumbLinks} />
      </AppBar>

      <Box
        className="layout-navigation-container"
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          className="layout-mobile-drawer"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          className="layout-desktop-drawer"
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        className="layout-main-content"
        component="main"
        sx={{
          flexGrow: 1,
          height: `calc(100vh - ${TOTAL_TOP_HEIGHT}px)`,
          width: { sm: `calc(100vh - ${DRAWER_WIDTH}px)` },
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          marginTop: `${TOTAL_TOP_HEIGHT / 2}px`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
