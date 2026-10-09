import Link from "next/link";
import { CreateActivityForm } from "@/components/activity/CreateActivityForm";
import styles from "@/components/activity/create-activity-form.module.css";

export default function CreateActivityPage() {
  return (
    <main className={styles.page}>
      <div className={styles.main}>
        <Link href="/feed" className={styles.backLink}>
          ← Назад к ленте
        </Link>

        <div className={styles.headingBlock}>
          <p className={styles.eyebrow}>Новая активность</p>
          <h2 className={styles.title}>Создай свою активность</h2>
          <p className={styles.subtitle}>
            Расскажи, чем хочешь заняться и какую компанию ищешь.
          </p>
        </div>

        <CreateActivityForm />
      </div>
    </main>
  );
}
