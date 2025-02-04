import type { Meta, StoryObj } from '@storybook/react';
import { ChatView } from './ChatView';
import React from 'react';

const meta: Meta<typeof ChatView> = {
  title: 'Views/Chat/ChatView',
  component: ChatView,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChatView>;

const sampleMessages = [
  {
    id: '1',
    content: 'Hello! How can I help you today?',
    isUser: false,
    timestamp: '10:00 AM',
  },
  {
    id: '2',
    content: 'I have a question about the project.',
    isUser: true,
    timestamp: '10:01 AM',
  },
  {
    id: '3',
    content: 'Sure, I\'d be happy to help. What would you like to know?',
    isUser: false,
    timestamp: '10:02 AM',
  },
];

export const Default: Story = {
  args: {
    messages: sampleMessages,
    onSendMessage: (message: string) => {
      console.log('Message sent:', message);
    },
  },
};

export const Empty: Story = {
  args: {
    messages: [],
    onSendMessage: (message: string) => {
      console.log('Message sent:', message);
    },
  },
};

export const Loading: Story = {
  args: {
    messages: sampleMessages,
    onSendMessage: (message: string) => {
      console.log('Message sent:', message);
    },
    isLoading: true,
  },
}; 