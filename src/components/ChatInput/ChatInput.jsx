import { useRef, useCallback } from "react";
import sendIcon from "../../assets/send.svg";
import styles from "../ChatInput/ChatInput.module.css";

const MAX_HEIGHT = 150;

export default function ChatInput({ value, onChange, onSend }) {
    const fieldRef = useRef(null);

    const autoResize = useCallback(() => {
        const el = fieldRef.current;
        if (!el) return;
        el.style.height = "";
        if (el.scrollHeight > el.clientHeight) {
            el.style.height = Math.min(el.scrollHeight, MAX_HEIGHT) + "px";
        }
    }, []);

    const handleSend = () => {
        if (onSend) {
            onSend({ preventDefault: () => {} });
        }
        if (fieldRef.current) {
            fieldRef.current.style.height = "";
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleChange = (e) => {
        onChange(e);
        autoResize();
    };

    return (
        <div className={styles.inputbar}>
            <textarea
                ref={fieldRef}
                className={styles.inputbar_field}
                placeholder="메시지를 입력하세요"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                rows={1}
            />
            <img
                className={styles.inputbar_icon}
                src={sendIcon}
                alt="전송아이콘"
                onClick={handleSend}
            />
        </div>
    );
}
