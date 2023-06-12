import { toast } from "react-toastify";
export const toastError = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 1000,
    delay: 0,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
export const toastSuccess = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 1000,
    delay: 0,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
