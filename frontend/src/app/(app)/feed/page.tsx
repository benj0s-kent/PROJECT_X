import { FeedClient } from "@/components/feed/FeedClient";
import { getActivities } from "@/services/activity/activity.service";
import styles from "@/components/feed/feed.module.css";

export default async function FeedPage() {
  const activities = await getActivities();

  return (
    <main className={styles.page}>
      <div className={styles.main}>
        <FeedClient activities={activities} />
      </div>
    </main>
  );
}
