import React from "react";
import { Box, Container, useTheme } from "@mui/material";

interface ScreenBackgroundProps {
  children: React.ReactNode;
}

export const ScreenBackground: React.FC<ScreenBackgroundProps> = ({
  children,
}) => {
  const theme = useTheme();

  return (
    <Box
      className="screen-background"
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container
        className="screen-background-container"
        maxWidth="xl"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          padding: {
            xs: theme.spacing(2),
            sm: theme.spacing(3),
            md: theme.spacing(4),
          },
        }}
      >
        <Box
          className="screen-background-box"
          sx={{
            flex: 1,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "background.default",
            borderRadius: theme.shape.borderRadius,
            overflow: "hidden",
            boxShadow: theme.shadows[1],
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};
