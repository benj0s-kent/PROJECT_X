"use client";

import { useCallback, useMemo, useState } from "react";
import { FeedPostCard } from "@/components/feed/FeedPostCard";
import type { Activity, ActivityCategory } from "@/types/activity";
import styles from "@/components/feed/feed.module.css";

const filters: Array<"Все" | ActivityCategory> = [
  "Все",
  "Спорт",
  "Учёба",
  "Проект",
  "Прогулка",
  "Игры",
];

type FeedClientProps = {
  activities: Activity[];
};

export function FeedClient({ activities }: FeedClientProps) {
  const [selectedFilter, setSelectedFilter] = useState<"Все" | ActivityCategory>("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);

  const visibleActivities = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return activities.filter((activity) => {
      const matchesCategory =
        selectedFilter === "Все" || activity.category === selectedFilter;
      const matchesSearch =
        !normalizedSearch ||
        activity.title.toLowerCase().includes(normalizedSearch) ||
        activity.summary.toLowerCase().includes(normalizedSearch) ||
        activity.shortPlace.toLowerCase().includes(normalizedSearch) ||
        activity.author.name.toLowerCase().includes(normalizedSearch);
      const isVisible = !hiddenIds.includes(activity.id);

      return matchesCategory && matchesSearch && isVisible;
    });
  }, [activities, hiddenIds, searchQuery, selectedFilter]);

  const handleHide = useCallback((id: string) => {
    setHiddenIds((current) => (current.includes(id) ? current : [...current, id]));
  }, []);

  function resetView() {
    setSearchQuery("");
    setSelectedFilter("Все");
    setHiddenIds([]);
  }

  return (
    <section aria-labelledby="feed-heading">
      <h2 id="feed-heading" className={styles.heading}>
        Найди компанию
      </h2>
      <p className={styles.subtitle}>
        Активности, проекты и люди из КГУ — всё в одной ленте.
      </p>

      <div className={styles.searchArea}>
        <label htmlFor="activity-search" className={styles.visuallyHidden}>
          Поиск публикаций
        </label>
        <input
          id="activity-search"
          type="search"
          placeholder="Поиск по публикациям и авторам"
          className={styles.searchInput}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>

      <div className={styles.filterList} aria-label="Фильтр по категориям">
        {filters.map((filter) => {
          const isActive = filter === selectedFilter;

          return (
            <button
              key={filter}
              type="button"
              className={`${styles.filterChip} ${isActive ? styles.activeFilter : ""}`}
              aria-pressed={isActive}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className={styles.feedList}>
        {visibleActivities.length > 0 ? (
          visibleActivities.map((activity) => (
            <FeedPostCard key={activity.id} activity={activity} onHide={handleHide} />
          ))
        ) : (
          <div className={styles.emptyState}>
            <h3 className={styles.emptyTitle}>Лента пуста</h3>
            <p className={styles.emptyText}>
              Здесь нет подходящих публикаций: измени фильтр, поиск или верни скрытые записи.
            </p>
            <button type="button" className={styles.emptyAction} onClick={resetView}>
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
