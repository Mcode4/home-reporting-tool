"use client";
import styles from './Toast.module.css';

function Toast({ message, type, onClose}) {

    return (
        <div className={`${styles.toast} ${styles[`toast-${type}`]}`}>
            <p className={styles["toast-message"]}>{message}</p>
            <button onClick={onClose} className={styles["toast-close-btn"]}>x</button>
        </div>
    )
}

export default Toast;