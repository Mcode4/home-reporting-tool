"use client";
import { createContext, useState } from "react"
import Toast from "./Toast";
import styles from './Toast.module.css';

export const toastContext = createContext();

function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    function addToast(message, type = "info") {
        const id = Date.now();
        setToasts(prev => [
            { id, message, type },
            ...prev
        ])
        setTimeout(()=> removeToast(id), 5000);
    }

    function removeToast(id) {
        setToasts(prev => prev.filter(toast => toast.id !== id))
    }

    return (
        <toastContext.Provider value={{addToast}}>
            { children }
            <div className={styles['toast-container']}>
                {toasts.map(toast=> (
                    <Toast key={toast.id} {...toast} onClose={()=> removeToast(toast.id)} />
                ))}
            </div>
        </toastContext.Provider>
    )
}

export default ToastProvider;