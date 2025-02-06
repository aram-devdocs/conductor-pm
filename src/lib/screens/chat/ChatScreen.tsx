import React from "react";
import { ChatView, ScreenBackground } from "../../ui";
import { useChat } from "../../hooks";
import { Box, List, ListItem, ListItemText, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Select, MenuItem, FormControl, InputLabel, ListItemButton, Paper } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

const MODEL_OPTIONS = [
  { value: "gpt-4", label: "GPT-4" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  { value: "claude-3", label: "Claude 3" },
  { value: "llama2", label: "Llama 2" },
];

export const ChatScreen: React.FC = () => {
  const { 
    messages, 
    sendMessage, 
    isLoading,
    threads,
    activeThread,
    setActiveThread,
    createThread,
    deleteThread 
  } = useChat();

  const [isNewThreadDialogOpen, setIsNewThreadDialogOpen] = React.useState(false);
  const [selectedModel, setSelectedModel] = React.useState(MODEL_OPTIONS[0].value);

  const handleCreateThread = () => {
    createThread(selectedModel);
    setIsNewThreadDialogOpen(false);
  };

  const handleDeleteThread = (threadId: string) => {
    if (activeThread?.id === threadId) {
      setActiveThread(null);
    }
    deleteThread(threadId);
  };

  return (
    <ScreenBackground>
      <Box sx={{ 
        display: "flex",
        height: "100%",
        gap: 2,
        p: 2,
      }}>
        {/* Thread List */}
        <Paper
          elevation={1}
          sx={{
            width: 300,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: 2 }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setIsNewThreadDialogOpen(true)}
            >
              New Chat
            </Button>
          </Box>
          <List sx={{ overflow: "auto", flex: 1 }}>
            {threads.length === 0 ? (
              <ListItem>
                <ListItemText 
                  primary="No chats yet"
                  secondary="Create a new chat to get started"
                  sx={{ textAlign: "center", color: "text.secondary" }}
                />
              </ListItem>
            ) : (
              threads.map((thread) => (
                <ListItem
                  key={thread.id}
                  disablePadding
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteThread(thread.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemButton
                    selected={activeThread?.id === thread.id}
                    onClick={() => setActiveThread(thread)}
                    sx={{ 
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    <ListItemText 
                      primary={`Chat ${thread.model}`}
                      secondary={new Date(thread.createdAt).toLocaleDateString()}
                    />
                  </ListItemButton>
                </ListItem>
              ))
            )}
          </List>
        </Paper>

        {/* Chat Area */}
        <Paper
          elevation={1}
          sx={{ 
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {activeThread ? (
            <ChatView
              messages={messages}
              onSendMessage={sendMessage}
              isLoading={isLoading}
              placeholder="Type your message..."
              model={activeThread.model}
            />
          ) : (
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              height: "100%",
              flexDirection: "column",
              gap: 2,
            }}>
              <Typography variant="h6" color="text.secondary">
                Select a chat thread or create a new one
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setIsNewThreadDialogOpen(true)}
              >
                New Chat
              </Button>
            </Box>
          )}
        </Paper>

        {/* New Thread Dialog */}
        <Dialog open={isNewThreadDialogOpen} onClose={() => setIsNewThreadDialogOpen(false)}>
          <DialogTitle>Create New Chat</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Model</InputLabel>
              <Select
                value={selectedModel}
                label="Model"
                onChange={(e) => setSelectedModel(e.target.value)}
              >
                {MODEL_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsNewThreadDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateThread} variant="contained">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ScreenBackground>
  );
};
