import React from "react";
import { Card, Typography, Button, Stack, Grid } from "../../ui";

export const StartupScreen: React.FC = () => {
  return (
    <Grid container spacing={2} justifyContent="center" padding={3}>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Card>
          <Stack spacing={2}>
            <div>
              <Typography variant="h2">Welcome to Condutor-PM</Typography>
              <Typography>
                Start managing your projects efficiently with Condutor-PM. Our
                application offers a comprehensive suite of tools to streamline
                your project management workflow.
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
  );
};
