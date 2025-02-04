import type { Meta, StoryObj } from "@storybook/react";
import { List } from "./List";
import { 
  ListItem, 
  ListItemText, 
  ListItemIcon 
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import React from 'react';

const meta: Meta<typeof List> = {
  title: "Core/Data Display/List",
  component: List,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  args: {
    items: [
      { primary: 'Inbox', secondary: 'Recent emails' },
      { primary: 'Drafts', secondary: 'Unsent messages' },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { 
        primary: 'Inbox', 
        secondary: 'Recent emails', 
        icon: <InboxIcon /> 
      },
      { 
        primary: 'Drafts', 
        secondary: 'Unsent messages', 
        icon: <DraftsIcon /> 
      },
    ],
  },
};

export const CustomChildren: Story = {
  render: () => (
    <List>
      <ListItem>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" secondary="Recent emails" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" secondary="Unsent messages" />
      </ListItem>
    </List>
  ),
};

export const Dense: Story = {
  args: {
    dense: true,
    items: [
      { primary: 'Inbox', secondary: 'Recent emails' },
      { primary: 'Drafts', secondary: 'Unsent messages' },
    ],
  },
}; 