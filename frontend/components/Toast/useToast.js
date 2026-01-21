import { useContext } from "react";
import { toastContext } from "./ToastProvider";

function useToast() {
    return useContext(toastContext);
}

export default useToast;

