import type { ActivityCategory } from "@/types/activity";
import styles from "./category-badge.module.css";

type CategoryBadgeProps = {
  category: ActivityCategory;
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span className={styles.badge} data-category={category}>
      {category}
    </span>
  );
}
