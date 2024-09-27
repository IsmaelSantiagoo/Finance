import { Bounce, toast, ToastPosition } from "react-toastify";

export const notify = (text: string, severity: string | 'info' | 'warning' | 'success' | 'error' = 'info') => {

  const toastOptions = {
    position: "top-right" as ToastPosition,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  }

  switch(severity) {

    case 'info':
      toast.info(text, toastOptions);
    break;

    case 'warning':
      toast.warn(text, toastOptions);
    break;

    case 'success':
      toast.success(text, toastOptions);
    break;

    case 'error':
      toast.error(text, toastOptions);
    break;
  }
}