// src/services/toast.service.js
import { useState } from "react";
import { ToastType } from "constants/toastTypes"; // Import ToastType
import ToastContainerComponent from "components/shared/ToastContainerComponent";

const ToastService = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = ({ type, message = "" }) => {
    // Default message for each toast type
    const defaultMessages = {
      [ToastType.SUCCESS]: "Operation successful!",
      [ToastType.ERROR]: "An error occurred!",
      [ToastType.INFO]: "Information message.",
    };

    const toastMessage = message || defaultMessages[type];

    const newToast = { type, message: toastMessage };

    // Add the new toast to the list
    setToasts((prevToasts) => [...prevToasts, newToast]);

    // Remove toast after 3 seconds
    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => toast !== newToast)
      );
    }, 3000);
  };

  // Return showToast method and the ToastContainer component with the list of toasts
  return {
    showToast,
    ToastContainerComponent: () => <ToastContainerComponent toasts={toasts} />,
  };
};

export default ToastService;
