import { StatePanel } from "@/components/ui/StatePanel";
import styles from "@/components/ui/state-panel.module.css";

export default function MessagesPage() {
  return (
    <main className={styles.skeletonPage}>
      <StatePanel
        title="Сообщений пока нет"
        description="Переписка появится после подключения API сообщений."
      />
    </main>
  );
}
