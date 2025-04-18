import { AxiosError } from "axios";
import { toast, TypeOptions } from "react-toastify";

export const makeToast = (type: TypeOptions, message?: unknown) => {
  let msg = "";
  if (typeof message === "string") {
    msg = message;
  } else if (message instanceof AxiosError) {
    msg = message.response?.data?.message;
  } else if (message instanceof Error) {
    msg = message.message;
  }

  let defaultMessage = "";
  switch (type) {
    case "success":
      defaultMessage = "Berhasil";
      break;
    case "error":
      defaultMessage = "Terjadi Kesalahan";
      break;
    case "warning":
      defaultMessage = "Info";
      break;
    case "info":
      defaultMessage = "Loading...";
      break;
    default:
      defaultMessage = "Default";
  }

  toast(msg || defaultMessage, {
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    type: type,
    position: "bottom-right",
  });
};
