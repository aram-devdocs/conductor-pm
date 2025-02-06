import React from "react";
import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github.css";

interface MessageBubbleProps {
  content: string;
  isUser: boolean;
  timestamp?: string;
}

const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "isUser",
})<{ isUser: boolean }>(({ theme, isUser }) => ({
  padding: theme.spacing(2),
  maxWidth: "70%",
  marginLeft: isUser ? "auto" : theme.spacing(1),
  marginRight: isUser ? theme.spacing(1) : "auto",
  marginBottom: theme.spacing(1),
  backgroundColor: isUser
    ? theme.palette.primary.main
    : theme.palette.background.paper,
  color: isUser
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,
  borderRadius: theme.spacing(2),
  "& pre": {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    overflowX: "auto",
    fontFamily: "monospace",
  },
  "& code": {
    fontFamily: "monospace",
    fontSize: "0.9em",
  },
}));

const MarkdownStyles = styled("div")(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.body1.fontSize,
  lineHeight: theme.typography.body1.lineHeight,
  "& h1": {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    marginBottom: theme.spacing(2),
  },
  "& h2": {
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.h5.fontWeight,
    marginBottom: theme.spacing(2),
  },
  "& h3": {
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
    marginBottom: theme.spacing(2),
  },
  "& h4": {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  "& h5": {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  "& h6": {
    fontSize: theme.typography.body2.fontSize,
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  "& p": {
    marginBottom: theme.spacing(1),
  },
  "& ul, & ol": {
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
  },
}));

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  content,
  isUser,
  timestamp,
}) => {
  return (
    <StyledPaper isUser={isUser} elevation={1}>
      <MarkdownStyles>
        <ReactMarkdown
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
          components={{
            code: ({ className, children, ...props }) => {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            pre: ({ children }) => <pre>{children}</pre>,
          }}
        >
          {content}
        </ReactMarkdown>
      </MarkdownStyles>
      {timestamp && (
        <Typography
          variant="caption"
          sx={{ display: "block", mt: 0.5, opacity: 0.7 }}
        >
          {timestamp}
        </Typography>
      )}
    </StyledPaper>
  );
};
