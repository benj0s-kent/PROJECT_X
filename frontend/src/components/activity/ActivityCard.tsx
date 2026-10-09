import Link from "next/link";
import { CategoryBadge } from "@/components/activity/CategoryBadge";
import type { ReactNode } from "react";
import type { Activity } from "@/types/activity";
import styles from "./activity-card.module.css";

type ActivityCardVariant = "profile" | "showcase";
type ShowcasePosition = "primary" | "secondary";

type ActivityCardProps = {
  activity: Activity;
  variant?: ActivityCardVariant;
  showcasePosition?: ShowcasePosition;
  children?: ReactNode;
};

export function ActivityCard({
  activity,
  variant = "profile",
  showcasePosition,
  children,
}: ActivityCardProps) {
  const className = [
    styles.card,
    styles[variant],
    showcasePosition === "primary" ? styles.showcasePrimary : "",
    showcasePosition === "secondary" ? styles.showcaseSecondary : "",
  ]
    .filter(Boolean)
    .join(" ");

  const meta = `${activity.shortDate} · ${activity.shortPlace}`;

  return (
    <article className={className}>
      <CategoryBadge category={activity.category} />

      {variant === "profile" ? (
        <Link href={`/activities/${activity.id}`} className={styles.titleLink}>
          <h2 className={styles.title}>{activity.title}</h2>
        </Link>
      ) : (
        <h2 className={styles.title}>{activity.title}</h2>
      )}

      <p className={styles.meta}>{meta}</p>


      {variant === "profile" && activity.status && (
        <span className={styles.status}>{activity.status}</span>
      )}

      {children && <div className={styles.actions}>{children}</div>}
    </article>
  );
}
