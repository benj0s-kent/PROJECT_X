import Link from "next/link";
import { StatePanel } from "@/components/ui/StatePanel";
import styles from "@/components/ui/state-panel.module.css";

export default function NotFound() {
  return (
    <main className={styles.skeletonPage}>
      <StatePanel
        title="Ничего не найдено"
        description="Страница или активность могла быть удалена, а ссылка — устареть."
        action={
          <Link href="/feed" className={styles.stateLink}>
            Вернуться в ленту
          </Link>
        }
      />
    </main>
  );
}
