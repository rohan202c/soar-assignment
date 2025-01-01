import React from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";

const toastClasses = {
  SUCCESS: "bg-success text-white p-3 rounded", // Green background with white text for success, padding, and border radius
  ERROR: "bg-danger text-white p-3 rounded", // Red background with white text for error, padding, and border radius
  INFO: "bg-info text-white p-3 rounded", // Blue background with white text for info, padding, and border radius
  WARNING: "bg-warning text-dark p-3 rounded", // Yellow background with dark text for warning, padding, and border radius
};

const ToastContainerComponent = ({ toasts }) => {
  return (
    <div
      aria-live="polite"
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 9999,
        maxWidth: "300px",
      }}
    >
      {toasts.map((toast, index) => (
        <Toast key={index} className={`mb-2 ${toastClasses[toast.type] || ""}`}>
          <ToastHeader>{toast.type}</ToastHeader>
          <ToastBody>{toast.message}</ToastBody>
        </Toast>
      ))}
    </div>
  );
};

export default ToastContainerComponent;
