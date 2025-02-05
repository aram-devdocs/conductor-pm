import React, { createContext, useContext, useState, useCallback } from "react";
import { Alert } from "../ui/core/feedback/Alert";
import { AlertProps } from "@mui/material";

// Define the toast message type
type ToastMessage = {
  id: number;
  message: string;
  severity: AlertProps["severity"];
};

// Define the context type
type ToastContextType = {
  toasts: ToastMessage[];
  showToast: (message: string, severity: AlertProps["severity"]) => void;
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
  showInfoToast: (message: string) => void;
  showWarningToast: (message: string) => void;
  removeToast: (id: number) => void;
};

// Create the context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Provider component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (message: string, severity: AlertProps["severity"]) => {
      const id = Date.now(); // Use timestamp as unique id
      setToasts((prev) => [...prev, { id, message, severity }]);

      // Automatically remove toast after 5 seconds
      setTimeout(() => {
        removeToast(id);
      }, 5000);
    },
    []
  );

  const showSuccessToast = useCallback(
    (message: string) => {
      showToast(message, "success");
    },
    [showToast]
  );

  const showErrorToast = useCallback(
    (message: string) => {
      showToast(message, "error");
    },
    [showToast]
  );

  const showInfoToast = useCallback(
    (message: string) => {
      showToast(message, "info");
    },
    [showToast]
  );

  const showWarningToast = useCallback(
    (message: string) => {
      showToast(message, "warning");
    },
    [showToast]
  );

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        showSuccessToast,
        showErrorToast,
        showInfoToast,
        showWarningToast,
        removeToast,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

// Toast Container Component
const ToastContainer: React.FC<{
  toasts: ToastMessage[];
  onRemove: (id: number) => void;
}> = ({ toasts, onRemove }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: 10000,
      }}
    >
      {toasts.map((toast) => (
        <Alert
          key={toast.id}
          severity={toast.severity}
          onClose={() => onRemove(toast.id)}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 2,
          }}
        >
          {toast.message}
        </Alert>
      ))}
    </div>
  );
};

// Custom hook for using toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
