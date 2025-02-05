import React from "react";
import {
  Card,
  Typography,
  Button,
  Stack,
  Grid,
  ScreenBackground,
} from "../../ui";

export const StartupScreen: React.FC = () => {
  return (
    <ScreenBackground>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Card>
            <Stack spacing={2} padding={3}>
              <div>
                <Typography variant="h2">Welcome to Conductor PM</Typography>
                <Typography>
                  Start managing your projects efficiently with Conductor PM.
                  Our application offers a comprehensive suite of tools to
                  streamline your project management workflow.
                </Typography>
              </div>

              <Stack spacing={2}>
                <Button variant="contained" fullWidth>
                  Create New Project
                </Button>
                <Button variant="outlined" fullWidth>
                  View Existing Projects
                </Button>
                <Button variant="outlined" fullWidth>
                  Explore Features
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </ScreenBackground>
  );
};
