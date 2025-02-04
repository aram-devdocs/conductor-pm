import React from "react";
import { Card, Typography, Button, Stack, Grid } from "../ui";
import { useWelcome } from "../hooks";

export const WelcomeScreen: React.FC = () => {
  const { handleGetStarted } = useWelcome();

  return (
    <Grid container spacing={2} justifyContent="center" padding={3}>
      <Grid item xs={12}>
        <Card>
          <Stack spacing={2} padding={2}>
            <Typography variant="h2">Welcome to Conductor PM</Typography>
            <Typography>
              We are excited to have you here! Conductor PM is designed to help
              you manage your projects efficiently.
            </Typography>
            <Stack spacing={2}>
              <Button variant="contained" fullWidth onClick={handleGetStarted}>
                Get Started
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};
