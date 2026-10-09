import Image from "next/image";
import Link from "next/link";
import { CategoryBadge } from "@/components/activity/CategoryBadge";
import { notFound } from "next/navigation";
import { getActivityById } from "@/services/activity/activity.service";
import styles from "./page.module.css";

type ActivityPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { id } = await params;
  const activity = await getActivityById(id);

  if (!activity) {
    notFound();
  }

  const freePlaces =
    activity.participants.maximum - activity.participants.current;

  return (
    <main className={styles.page}>
      <div className={styles.main}>
        <Link href="/feed" className={styles.backLink}>
          ← Назад к ленте
        </Link>

        <article className={styles.card}>
          <div className={styles.hero}>
            <CategoryBadge category={activity.category} />

            <h2 className={styles.title}>{activity.title}</h2>
            <p className={styles.summary}>{activity.summary}</p>

            {activity.imageUrl && (
              <div className={styles.imageWrap}>
                <Image
                  src={activity.imageUrl}
                  alt=""
                  fill
                  sizes="(max-width: 720px) 100vw, 900px"
                  className={styles.image}
                  loading="lazy"
                />
              </div>
            )}

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Когда</span>
                <span className={styles.infoValue}>{activity.fullDate}</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Где</span>
                <span className={styles.infoValue}>{activity.fullPlace}</span>
              </div>

              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Формат</span>
                <span className={styles.infoValue}>{activity.format}</span>
              </div>
            </div>
          </div>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Описание</h3>
            <div className={styles.description}>
              {activity.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Организатор</h3>
            <Link href={`/users/${activity.author.id}`} className={styles.author}>
              <div className={styles.avatar}>{activity.author.initial}</div>
              <div>
                <p className={styles.authorName}>{activity.author.name}</p>
                <p className={styles.authorFaculty}>{activity.author.faculty}</p>
              </div>
            </Link>
          </section>

          <div className={styles.actions}>
            <div>
              <p className={styles.participants}>
                {activity.participants.current} из {activity.participants.maximum}{" "}
                участников
              </p>
              <p className={styles.freePlaces}>Свободных мест: {freePlaces}</p>
            </div>

            <button
              type="button"
              className={styles.joinButton}
              disabled={freePlaces <= 0}
              aria-disabled={freePlaces <= 0}
            >
              {freePlaces <= 0 ? "Мест нет" : "Присоединиться"}
            </button>
          </div>
        </article>
      </div>
    </main>
  );
}
