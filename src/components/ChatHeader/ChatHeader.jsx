import styles from './ChatHeader.module.css';
import { getCurrentConfig } from '../../config/chatbotConfig';

export default function ChatHeader({ username, onLoginClick, onNewChat }) {
  const config = getCurrentConfig();

  return (
    <header className={styles.header}>
      <div className={styles.header_title}>{config.name}</div>
      
      <div className={styles.header_spacer} />
    </header>
  );
}
